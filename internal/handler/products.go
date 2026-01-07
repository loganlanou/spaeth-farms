package handler

import (
	"database/sql"
	"log/slog"
	"net/http"

	"spaeth-farms/templates/pages"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Products(c echo.Context) error {
	ctx := c.Request().Context()

	// Get optional category filter
	categoryID := c.QueryParam("category")

	var products interface{}
	var err error

	if categoryID != "" {
		products, err = h.db.Queries.ListProductsByCategory(ctx, sql.NullString{String: categoryID, Valid: true})
	} else {
		products, err = h.db.Queries.ListProducts(ctx)
	}

	if err != nil {
		slog.Error("failed to fetch products", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to load products")
	}

	categories, err := h.db.Queries.ListCategories(ctx)
	if err != nil {
		slog.Error("failed to fetch categories", "error", err)
	}

	return pages.Products(products, categories, categoryID).Render(ctx, c.Response().Writer)
}

func (h *Handler) ProductDetail(c echo.Context) error {
	ctx := c.Request().Context()
	slug := c.Param("slug")

	product, err := h.db.Queries.GetProductBySlug(ctx, slug)
	if err != nil {
		slog.Error("failed to fetch product", "slug", slug, "error", err)
		return c.String(http.StatusNotFound, "Product not found")
	}

	// Get related products from same category
	var relatedProducts interface{}
	if product.CategoryID.Valid {
		relatedProducts, err = h.db.Queries.ListProductsByCategory(ctx, product.CategoryID)
		if err != nil {
			slog.Warn("failed to fetch related products", "error", err)
		}
	}

	return pages.ProductDetail(product, relatedProducts).Render(ctx, c.Response().Writer)
}
