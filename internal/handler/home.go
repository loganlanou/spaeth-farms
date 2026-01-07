package handler

import (
	"log/slog"

	"spaeth-farms/internal/database/sqlc"
	"spaeth-farms/templates/pages"

	"github.com/labstack/echo/v4"
)

type HomeData struct {
	FeaturedProducts []sqlc.Product
	Categories       []sqlc.Category
	HeroSlides       []sqlc.HeroSlide
	Testimonials     []sqlc.Testimonial
}

func (h *Handler) Home(c echo.Context) error {
	ctx := c.Request().Context()

	// Fetch featured products
	featured, err := h.db.Queries.ListFeaturedProducts(ctx)
	if err != nil {
		slog.Error("failed to fetch featured products", "error", err)
		featured = []sqlc.Product{}
	}

	// Fetch categories
	categories, err := h.db.Queries.ListCategories(ctx)
	if err != nil {
		slog.Error("failed to fetch categories", "error", err)
		categories = []sqlc.Category{}
	}

	// Fetch hero slides
	slides, err := h.db.Queries.ListActiveHeroSlides(ctx)
	if err != nil {
		slog.Error("failed to fetch hero slides", "error", err)
		slides = []sqlc.HeroSlide{}
	}

	// Fetch testimonials
	testimonials, err := h.db.Queries.ListFeaturedTestimonials(ctx)
	if err != nil {
		slog.Error("failed to fetch testimonials", "error", err)
		testimonials = []sqlc.Testimonial{}
	}

	data := HomeData{
		FeaturedProducts: featured,
		Categories:       categories,
		HeroSlides:       slides,
		Testimonials:     testimonials,
	}

	return pages.Home(data.FeaturedProducts, data.Categories, data.HeroSlides, data.Testimonials).Render(ctx, c.Response().Writer)
}
