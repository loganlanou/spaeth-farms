package handler

import (
	"database/sql"
	"log/slog"
	"net/http"

	"spaeth-farms/internal/database/sqlc"
	"spaeth-farms/templates/pages"

	"github.com/labstack/echo/v4"
)

func (h *Handler) About(c echo.Context) error {
	ctx := c.Request().Context()
	return pages.About().Render(ctx, c.Response().Writer)
}

func (h *Handler) FAQ(c echo.Context) error {
	ctx := c.Request().Context()

	phone := "715-313-0075"
	if setting, err := h.db.Queries.GetSetting(ctx, "phone"); err == nil && setting.Value.Valid {
		phone = setting.Value.String
	}

	return pages.FAQ(phone).Render(ctx, c.Response().Writer)
}

func (h *Handler) Shipping(c echo.Context) error {
	ctx := c.Request().Context()

	phone := "715-313-0075"
	if setting, err := h.db.Queries.GetSetting(ctx, "phone"); err == nil && setting.Value.Valid {
		phone = setting.Value.String
	}

	return pages.Shipping(phone).Render(ctx, c.Response().Writer)
}

func (h *Handler) Genetics(c echo.Context) error {
	ctx := c.Request().Context()

	phone := "(715) 313-0075"
	if setting, err := h.db.Queries.GetSetting(ctx, "phone"); err == nil && setting.Value.Valid {
		phone = setting.Value.String
	}

	return pages.Genetics(phone).Render(ctx, c.Response().Writer)
}

func (h *Handler) Contact(c echo.Context) error {
	ctx := c.Request().Context()

	phone := "715-313-0075"
	email := "info@spaethfarms.com"
	address := "Loyal, Wisconsin"

	if setting, err := h.db.Queries.GetSetting(ctx, "phone"); err == nil && setting.Value.Valid {
		phone = setting.Value.String
	}
	if setting, err := h.db.Queries.GetSetting(ctx, "email"); err == nil && setting.Value.Valid {
		email = setting.Value.String
	}
	if setting, err := h.db.Queries.GetSetting(ctx, "address"); err == nil && setting.Value.Valid {
		address = setting.Value.String
	}

	return pages.Contact(phone, email, address, "", false).Render(ctx, c.Response().Writer)
}

func (h *Handler) ContactSubmit(c echo.Context) error {
	ctx := c.Request().Context()

	name := c.FormValue("name")
	email := c.FormValue("email")
	phone := c.FormValue("phone")
	subject := c.FormValue("subject")
	message := c.FormValue("message")

	// Get site contact info for the response page
	sitePhone := "715-313-0075"
	siteEmail := "info@spaethfarms.com"
	siteAddress := "Loyal, Wisconsin"

	if setting, err := h.db.Queries.GetSetting(ctx, "phone"); err == nil && setting.Value.Valid {
		sitePhone = setting.Value.String
	}
	if setting, err := h.db.Queries.GetSetting(ctx, "email"); err == nil && setting.Value.Valid {
		siteEmail = setting.Value.String
	}
	if setting, err := h.db.Queries.GetSetting(ctx, "address"); err == nil && setting.Value.Valid {
		siteAddress = setting.Value.String
	}

	// Save to database
	_, err := h.db.Queries.CreateContactSubmission(ctx, sqlc.CreateContactSubmissionParams{
		Name:    name,
		Email:   email,
		Phone:   pagesNullStr(phone),
		Subject: pagesNullStr(subject),
		Message: message,
	})

	if err != nil {
		slog.Error("failed to save contact submission", "error", err)
		return pages.Contact(sitePhone, siteEmail, siteAddress, "Failed to send message. Please try again.", false).Render(ctx, c.Response().Writer)
	}

	// Send notification email via Brevo
	if h.brevo.IsConfigured() {
		notifyEmail := siteEmail
		if setting, err := h.db.Queries.GetSetting(ctx, "contact_notify_email"); err == nil && setting.Value.Valid {
			notifyEmail = setting.Value.String
		}

		err = h.brevo.SendContactFormNotification(ctx, name, email, phone, subject, message, notifyEmail)
		if err != nil {
			slog.Error("failed to send contact notification email", "error", err)
		}

		// Send confirmation to the submitter
		err = h.brevo.SendContactFormConfirmation(ctx, name, email)
		if err != nil {
			slog.Error("failed to send contact confirmation email", "error", err)
		}
	}

	slog.Info("contact form submitted", "name", name, "email", email)

	return pages.Contact(sitePhone, siteEmail, siteAddress, "", true).Render(ctx, c.Response().Writer)
}

func (h *Handler) SignIn(c echo.Context) error {
	redirect := c.QueryParam("redirect")
	if redirect == "" {
		redirect = "/"
	}

	// If Clerk is not configured, redirect to home
	if !h.clerk.IsConfigured() {
		return c.Redirect(http.StatusFound, redirect)
	}

	ctx := c.Request().Context()
	return pages.SignIn(h.cfg.ClerkPublishableKey, redirect).Render(ctx, c.Response().Writer)
}

func pagesNullStr(s string) sql.NullString {
	if s == "" {
		return sql.NullString{Valid: false}
	}
	return sql.NullString{String: s, Valid: true}
}
