package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"

	"spaeth-farms/internal/database/sqlc"
	"spaeth-farms/internal/services"
	"spaeth-farms/templates/pages"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Checkout(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.Checkout(h.cfg.StripePublishableKey).Render(ctx, c.Response().Writer)
}

func (h *Handler) CheckoutCreateSession(c echo.Context) error {
	ctx := c.Request().Context()

	if !h.stripe.IsConfigured() {
		return c.JSON(http.StatusServiceUnavailable, map[string]string{
			"error": "Payments are not configured",
		})
	}

	var req services.CheckoutRequest
	if err := c.Bind(&req); err != nil {
		slog.Error("failed to parse checkout request", "error", err)
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request",
		})
	}

	if len(req.Items) == 0 {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Cart is empty",
		})
	}

	baseURL := h.cfg.Site.URL
	successURL := baseURL + "/checkout/success"
	cancelURL := baseURL + "/checkout/cancel"

	sess, err := h.stripe.CreateCheckoutSession(ctx, &req, successURL, cancelURL)
	if err != nil {
		slog.Error("failed to create checkout session", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to create checkout session",
		})
	}

	// Store order in database
	itemsJSON, _ := json.Marshal(req.Items)
	var subtotal int64
	for _, item := range req.Items {
		subtotal += item.Price * int64(item.Qty)
	}

	// Calculate shipping (free over $199)
	var shippingCents int64
	if subtotal < 19900 {
		shippingCents = 2999
	}
	totalCents := subtotal + shippingCents

	address := fmt.Sprintf("%s %s, %s, %s %s",
		req.Customer.Address,
		req.Customer.Apartment,
		req.Customer.City,
		req.Customer.State,
		req.Customer.ZipCode)

	customerName := req.Customer.FirstName + " " + req.Customer.LastName

	_, err = h.db.Queries.CreateOrder(ctx, sqlc.CreateOrderParams{
		StripeSessionID: sql.NullString{String: sess.ID, Valid: true},
		CustomerEmail:   req.Customer.Email,
		CustomerName:    sql.NullString{String: customerName, Valid: true},
		CustomerPhone:   toNullStr(req.Customer.Phone),
		ShippingAddress: sql.NullString{String: address, Valid: true},
		Items:           string(itemsJSON),
		SubtotalCents:   subtotal,
		ShippingCents:   sql.NullInt64{Int64: shippingCents, Valid: true},
		TotalCents:      totalCents,
		Status:          sql.NullString{String: "pending", Valid: true},
	})
	if err != nil {
		slog.Error("failed to create order", "error", err)
	}

	return c.JSON(http.StatusOK, map[string]string{
		"sessionId": sess.ID,
		"url":       sess.URL,
	})
}

func (h *Handler) CheckoutSuccess(c echo.Context) error {
	ctx := c.Request().Context()
	sessionID := c.QueryParam("session_id")

	if sessionID != "" && h.stripe.IsConfigured() {
		sess, err := h.stripe.GetCheckoutSession(ctx, sessionID)
		if err != nil {
			slog.Error("failed to get checkout session", "error", err)
		} else {
			// Update order status
			err = h.db.Queries.UpdateOrderStatusBySession(ctx, sqlc.UpdateOrderStatusBySessionParams{
				Status:          sql.NullString{String: "completed", Valid: true},
				StripeSessionID: sql.NullString{String: sessionID, Valid: true},
			})
			if err != nil {
				slog.Error("failed to update order status", "error", err)
			}

			slog.Info("checkout success", "session_id", sessionID, "customer_email", sess.CustomerEmail)
		}
	}

	return pages.CheckoutSuccess().Render(ctx, c.Response().Writer)
}

func (h *Handler) CheckoutCancel(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.CheckoutCancel().Render(ctx, c.Response().Writer)
}

func (h *Handler) StripeWebhook(c echo.Context) error {
	if !h.stripe.IsConfigured() {
		return c.NoContent(http.StatusOK)
	}

	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		slog.Error("failed to read webhook body", "error", err)
		return c.NoContent(http.StatusBadRequest)
	}

	signature := c.Request().Header.Get("Stripe-Signature")
	event, err := h.stripe.VerifyWebhookSignature(body, signature)
	if err != nil {
		slog.Error("webhook signature verification failed", "error", err)
		return c.NoContent(http.StatusBadRequest)
	}

	if err := h.stripe.HandleWebhookEvent(event); err != nil {
		slog.Error("webhook handler error", "error", err)
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.NoContent(http.StatusOK)
}

func toNullStr(s string) sql.NullString {
	if s == "" {
		return sql.NullString{Valid: false}
	}
	return sql.NullString{String: s, Valid: true}
}

