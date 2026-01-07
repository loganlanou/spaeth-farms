package handler

import (
	"database/sql"
	"log/slog"
	"net/http"
	"strconv"

	"spaeth-farms/internal/database/sqlc"
	"spaeth-farms/templates/admin"

	"github.com/labstack/echo/v4"
)

func (h *Handler) AdminDashboard(c echo.Context) error {
	ctx := c.Request().Context()

	// Get counts for dashboard
	productCount, _ := h.db.Queries.CountProducts(ctx)
	orderCount, _ := h.db.Queries.CountOrders(ctx)
	unreadContacts, _ := h.db.Queries.CountUnreadContacts(ctx)
	recentOrders, _ := h.db.Queries.GetRecentOrders(ctx, 5)

	return admin.Dashboard(productCount, orderCount, unreadContacts, recentOrders).Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminProducts(c echo.Context) error {
	ctx := c.Request().Context()

	products, err := h.db.Queries.ListProducts(ctx)
	if err != nil {
		slog.Error("failed to fetch products", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to load products")
	}

	categories, _ := h.db.Queries.ListCategories(ctx)

	return admin.Products(products, categories).Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminProductEdit(c echo.Context) error {
	ctx := c.Request().Context()
	slug := c.Param("slug")

	var product *sqlc.Product
	if slug != "new" {
		p, err := h.db.Queries.GetProductBySlug(ctx, slug)
		if err != nil {
			slog.Error("failed to fetch product", "slug", slug, "error", err)
			return c.String(http.StatusNotFound, "Product not found")
		}
		product = &p
	}

	categories, _ := h.db.Queries.ListCategories(ctx)

	return admin.ProductEdit(product, categories).Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminProductSave(c echo.Context) error {
	ctx := c.Request().Context()

	slug := c.FormValue("slug")
	name := c.FormValue("name")
	categoryID := c.FormValue("category_id")
	priceStr := c.FormValue("price")
	weight := c.FormValue("weight")
	description := c.FormValue("description")
	image := c.FormValue("image")
	featured := c.FormValue("featured") == "on"
	inStock := c.FormValue("in_stock") == "on"

	// Parse price (convert dollars to cents)
	price, err := strconv.ParseFloat(priceStr, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid price")
	}
	priceCents := int64(price * 100)

	// Check if product exists
	existingID := c.FormValue("id")
	if existingID != "" {
		// Update existing
		err = h.db.Queries.UpdateProductBySlug(ctx, sqlc.UpdateProductBySlugParams{
			Name:        name,
			CategoryID:  toNullString(categoryID),
			PriceCents:  priceCents,
			Weight:      toNullString(weight),
			Description: toNullString(description),
			Image:       toNullString(image),
			Featured:    toNullInt64(featured),
			InStock:     toNullInt64(inStock),
			Slug:        slug,
		})
	} else {
		// Create new
		_, err = h.db.Queries.CreateProduct(ctx, sqlc.CreateProductParams{
			Slug:        slug,
			Name:        name,
			CategoryID:  toNullString(categoryID),
			PriceCents:  priceCents,
			Weight:      toNullString(weight),
			Description: toNullString(description),
			Image:       toNullString(image),
			Featured:    toNullInt64(featured),
			InStock:     toNullInt64(inStock),
		})
	}

	if err != nil {
		slog.Error("failed to save product", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to save product")
	}

	return c.Redirect(http.StatusSeeOther, "/admin/products")
}

func toNullString(s string) sql.NullString {
	if s == "" {
		return sql.NullString{Valid: false}
	}
	return sql.NullString{String: s, Valid: true}
}

func toNullInt64(b bool) sql.NullInt64 {
	if b {
		return sql.NullInt64{Int64: 1, Valid: true}
	}
	return sql.NullInt64{Int64: 0, Valid: true}
}

func (h *Handler) AdminProductDelete(c echo.Context) error {
	ctx := c.Request().Context()
	idStr := c.Param("id")

	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	if err := h.db.Queries.DeleteProduct(ctx, id); err != nil {
		slog.Error("failed to delete product", "id", id, "error", err)
		return c.String(http.StatusInternalServerError, "Failed to delete product")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

func (h *Handler) AdminCategories(c echo.Context) error {
	ctx := c.Request().Context()

	categories, err := h.db.Queries.ListCategories(ctx)
	if err != nil {
		slog.Error("failed to fetch categories", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to load categories")
	}

	return admin.Categories(categories).Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminOrders(c echo.Context) error {
	ctx := c.Request().Context()

	orders, err := h.db.Queries.ListOrders(ctx, sqlc.ListOrdersParams{
		Limit:  50,
		Offset: 0,
	})
	if err != nil {
		slog.Error("failed to fetch orders", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to load orders")
	}

	return admin.Orders(orders).Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminSettings(c echo.Context) error {
	ctx := c.Request().Context()

	settings, err := h.db.Queries.ListSettings(ctx)
	if err != nil {
		slog.Error("failed to fetch settings", "error", err)
	}

	// Convert to map for easier template access
	settingsMap := make(map[string]string)
	for _, s := range settings {
		if s.Value.Valid {
			settingsMap[s.Key] = s.Value.String
		}
	}

	return admin.Settings(settingsMap).Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminSettingsSave(c echo.Context) error {
	ctx := c.Request().Context()

	// Get all form values and save them
	formParams, _ := c.FormParams()
	for key, values := range formParams {
		if len(values) > 0 {
			value := values[0]
			err := h.db.Queries.UpsertSetting(ctx, sqlc.UpsertSettingParams{
				Key:   key,
				Value: toNullString(value),
			})
			if err != nil {
				slog.Error("failed to save setting", "key", key, "error", err)
			}
		}
	}

	return c.Redirect(http.StatusSeeOther, "/admin/settings")
}

func (h *Handler) AdminTestimonials(c echo.Context) error {
	ctx := c.Request().Context()

	testimonials, err := h.db.Queries.ListTestimonials(ctx)
	if err != nil {
		slog.Error("failed to fetch testimonials", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to load testimonials")
	}

	return admin.Testimonials(testimonials).Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminImages(c echo.Context) error {
	ctx := c.Request().Context()
	return admin.Images().Render(ctx, c.Response().Writer)
}

func (h *Handler) AdminHomePage(c echo.Context) error {
	ctx := c.Request().Context()

	heroSlides, _ := h.db.Queries.ListHeroSlides(ctx)
	featuredProducts, _ := h.db.Queries.ListFeaturedProducts(ctx)

	return admin.HomePage(heroSlides, featuredProducts).Render(ctx, c.Response().Writer)
}
