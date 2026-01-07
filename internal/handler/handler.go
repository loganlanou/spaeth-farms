package handler

import (
	"spaeth-farms/internal/config"
	"spaeth-farms/internal/database"
	"spaeth-farms/internal/middleware"
	"spaeth-farms/internal/services"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	cfg    *config.Config
	db     *database.DB
	clerk  *services.ClerkService
	stripe *services.StripeService
	brevo  *services.BrevoService
}

func New(cfg *config.Config, db *database.DB) *Handler {
	return &Handler{
		cfg:    cfg,
		db:     db,
		clerk:  services.NewClerkService(cfg.ClerkSecretKey, cfg.ClerkPublishableKey),
		stripe: services.NewStripeService(cfg.StripeSecretKey, cfg.StripePublishableKey, cfg.StripeWebhookSecret),
		brevo:  services.NewBrevoService(cfg.BrevoAPIKey, "noreply@spaethfarms.com", "Spaeth Farms"),
	}
}

func (h *Handler) RegisterRoutes(e *echo.Echo) {
	// Static files
	e.Static("/static", "static")

	// Health check
	e.GET("/health", h.Health)

	// Public pages
	e.GET("/", h.Home)
	e.GET("/about", h.About)
	e.GET("/products", h.Products)
	e.GET("/products/:slug", h.ProductDetail)
	e.GET("/checkout", h.Checkout)
	e.GET("/contact", h.Contact)
	e.POST("/contact", h.ContactSubmit)
	e.GET("/faq", h.FAQ)
	e.GET("/shipping", h.Shipping)
	e.GET("/genetics", h.Genetics)

	// Cart API (HTMX)
	e.GET("/api/cart", h.CartGet)
	e.POST("/api/cart/add", h.CartAdd)
	e.POST("/api/cart/remove", h.CartRemove)
	e.POST("/api/cart/update", h.CartUpdate)

	// Checkout API
	e.POST("/api/checkout/session", h.CheckoutCreateSession)
	e.GET("/checkout/success", h.CheckoutSuccess)
	e.GET("/checkout/cancel", h.CheckoutCancel)
	e.POST("/api/stripe/webhook", h.StripeWebhook)

	// Auth routes
	e.GET("/sign-in", h.SignIn)

	// Admin routes (protected by Clerk auth when configured)
	admin := e.Group("/admin")
	admin.Use(middleware.RequireAdmin(h.clerk))
	admin.GET("", h.AdminDashboard)
	admin.GET("/products", h.AdminProducts)
	admin.GET("/products/:slug", h.AdminProductEdit)
	admin.POST("/products", h.AdminProductSave)
	admin.DELETE("/products/:id", h.AdminProductDelete)
	admin.GET("/categories", h.AdminCategories)
	admin.GET("/orders", h.AdminOrders)
	admin.GET("/settings", h.AdminSettings)
	admin.POST("/settings", h.AdminSettingsSave)
	admin.GET("/testimonials", h.AdminTestimonials)
	admin.GET("/images", h.AdminImages)
	admin.GET("/home-page", h.AdminHomePage)
}
