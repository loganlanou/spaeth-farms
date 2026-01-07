package config

import (
	"log/slog"
	"os"
)

type SiteConfig struct {
	Name           string
	URL            string
	DefaultOGImage string
}

type Config struct {
	DatabaseURL          string
	Port                 string
	Env                  string
	Site                 SiteConfig
	ClerkSecretKey       string
	ClerkPublishableKey  string
	BrevoAPIKey          string
	StripeSecretKey      string
	StripePublishableKey string
	StripeWebhookSecret  string
}

func Load() *Config {
	cfg := &Config{
		DatabaseURL: getEnvOrDefault("DATABASE_URL", "./data/spaeth-farms.db"),
		Port:        getEnvOrDefault("PORT", "8014"),
		Env:         getEnvOrDefault("ENV", "development"),
		Site: SiteConfig{
			Name:           getEnvOrDefault("SITE_NAME", "Spaeth Farms"),
			URL:            getEnvOrDefault("SITE_URL", "http://localhost:8014"),
			DefaultOGImage: getEnvOrDefault("DEFAULT_OG_IMAGE", "/static/images/logo.png"),
		},
		ClerkSecretKey:       os.Getenv("CLERK_SECRET_KEY"),
		ClerkPublishableKey:  os.Getenv("CLERK_PUBLISHABLE_KEY"),
		BrevoAPIKey:          os.Getenv("BREVO_API_KEY"),
		StripeSecretKey:      os.Getenv("STRIPE_SECRET_KEY"),
		StripePublishableKey: os.Getenv("STRIPE_PUBLISHABLE_KEY"),
		StripeWebhookSecret:  os.Getenv("STRIPE_WEBHOOK_SECRET"),
	}

	// Warn about missing optional services in development
	if cfg.IsDevelopment() {
		if cfg.ClerkSecretKey == "" {
			slog.Warn("CLERK_SECRET_KEY not set - admin auth will be disabled")
		}
		if cfg.StripeSecretKey == "" {
			slog.Warn("STRIPE_SECRET_KEY not set - payments will be disabled")
		}
		if cfg.BrevoAPIKey == "" {
			slog.Warn("BREVO_API_KEY not set - email sending will be disabled")
		}
	}

	return cfg
}

func (c *Config) IsDevelopment() bool {
	return c.Env == "development"
}

func (c *Config) IsProduction() bool {
	return c.Env == "production"
}

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
