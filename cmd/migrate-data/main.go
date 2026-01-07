package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log/slog"
	"os"
	"strings"

	"spaeth-farms/internal/database"
	"spaeth-farms/internal/database/sqlc"
)

type ProductJSON struct {
	ID              string   `json:"id"`
	Slug            string   `json:"slug"`
	Name            string   `json:"name"`
	Description     string   `json:"description"`
	LongDescription string   `json:"longDescription"`
	Price           float64  `json:"price"`
	Weight          string   `json:"weight"`
	Category        string   `json:"category"`
	Image           string   `json:"image"`
	InStock         bool     `json:"inStock"`
	Featured        bool     `json:"featured"`
	Details         []string `json:"details"`
}

type CategoryJSON struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

type ProductsFile struct {
	Products   []ProductJSON  `json:"products"`
	Categories []CategoryJSON `json:"categories"`
}

func main() {
	ctx := context.Background()

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "./data/spaeth-farms.db"
	}

	slog.Info("connecting to database", "url", dbURL)
	db, err := database.New(ctx, dbURL)
	if err != nil {
		slog.Error("failed to connect to database", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	// Load products.json
	data, err := os.ReadFile("src/data/products.json")
	if err != nil {
		slog.Error("failed to read products.json", "error", err)
		os.Exit(1)
	}

	var productsFile ProductsFile
	if err := json.Unmarshal(data, &productsFile); err != nil {
		slog.Error("failed to parse products.json", "error", err)
		os.Exit(1)
	}

	// Migrate categories
	slog.Info("migrating categories", "count", len(productsFile.Categories))
	for i, cat := range productsFile.Categories {
		_, err := db.Queries.CreateCategory(ctx, sqlc.CreateCategoryParams{
			ID:          cat.ID,
			Name:        cat.Name,
			Description: sql.NullString{String: cat.Description, Valid: cat.Description != ""},
			SortOrder:   sql.NullInt64{Int64: int64(i), Valid: true},
		})
		if err != nil {
			if strings.Contains(err.Error(), "UNIQUE constraint") {
				slog.Info("category already exists, skipping", "id", cat.ID)
				continue
			}
			slog.Error("failed to create category", "id", cat.ID, "error", err)
			continue
		}
		slog.Info("created category", "id", cat.ID, "name", cat.Name)
	}

	// Migrate products
	slog.Info("migrating products", "count", len(productsFile.Products))
	for _, prod := range productsFile.Products {
		// Convert price to cents
		priceCents := int64(prod.Price * 100)

		// Convert bool to int
		var featured int64
		if prod.Featured {
			featured = 1
		}
		var inStock int64
		if prod.InStock {
			inStock = 1
		}

		// Use long description if available
		description := prod.Description
		if prod.LongDescription != "" {
			description = prod.LongDescription
		}

		// Fix image path (remove /spaeth-farms prefix and add /static)
		image := strings.TrimPrefix(prod.Image, "/spaeth-farms")
		if !strings.HasPrefix(image, "/static") && strings.HasPrefix(image, "/images") {
			image = "/static" + image
		}

		_, err := db.Queries.CreateProduct(ctx, sqlc.CreateProductParams{
			Slug:        prod.Slug,
			Name:        prod.Name,
			CategoryID:  sql.NullString{String: prod.Category, Valid: prod.Category != ""},
			PriceCents:  priceCents,
			Weight:      sql.NullString{String: prod.Weight, Valid: prod.Weight != ""},
			Description: sql.NullString{String: description, Valid: description != ""},
			Image:       sql.NullString{String: image, Valid: image != ""},
			Featured:    sql.NullInt64{Int64: featured, Valid: true},
			InStock:     sql.NullInt64{Int64: inStock, Valid: true},
		})
		if err != nil {
			if strings.Contains(err.Error(), "UNIQUE constraint") {
				slog.Info("product already exists, skipping", "slug", prod.Slug)
				continue
			}
			slog.Error("failed to create product", "slug", prod.Slug, "error", err)
			continue
		}
		slog.Info("created product", "slug", prod.Slug, "name", prod.Name)
	}

	// Add default hero slides
	slog.Info("adding hero slides")
	heroImages := []struct {
		Image   string
		AltText string
	}{
		{"/static/images/hero-cattle.jpg", "Spaeth Farms cattle grazing"},
		{"/static/images/farm-scene.jpg", "Scenic farm view"},
		{"/static/images/hereford-herd.jpg", "Hereford cattle herd"},
	}

	for i, slide := range heroImages {
		_, err := db.Queries.CreateHeroSlide(ctx, sqlc.CreateHeroSlideParams{
			Image:     slide.Image,
			AltText:   sql.NullString{String: slide.AltText, Valid: true},
			SortOrder: sql.NullInt64{Int64: int64(i), Valid: true},
			Active:    sql.NullInt64{Int64: 1, Valid: true},
		})
		if err != nil {
			slog.Warn("failed to create hero slide", "image", slide.Image, "error", err)
			continue
		}
		slog.Info("created hero slide", "image", slide.Image)
	}

	// Add default site settings
	slog.Info("adding site settings")
	settings := map[string]string{
		"phone":                "715-313-0075",
		"email":                "info@spaethfarms.com",
		"address":              "Loyal, Wisconsin",
		"free_shipping_min":    "199",
		"tagline":              "Premium Farm-Raised Beef Delivered Nationwide",
		"about_short":          "Family-owned Spaeth Farms has been raising premium Hereford cattle in Wisconsin for generations.",
		"facebook_url":         "",
		"instagram_url":        "",
		"shipping_info":        "Orders ship Monday-Wednesday via FedEx. Free shipping on orders over $199.",
		"return_policy":        "We stand behind our products. If you're not satisfied, contact us within 7 days of delivery.",
	}

	for key, value := range settings {
		err := db.Queries.UpsertSetting(ctx, sqlc.UpsertSettingParams{
			Key:   key,
			Value: sql.NullString{String: value, Valid: true},
		})
		if err != nil {
			slog.Warn("failed to upsert setting", "key", key, "error", err)
			continue
		}
		slog.Info("set setting", "key", key)
	}

	// Add sample testimonials
	slog.Info("adding testimonials")
	testimonials := []struct {
		Author   string
		Location string
		Content  string
		Rating   int64
		Featured int64
	}{
		{
			Author:   "Michael R.",
			Location: "Chicago, IL",
			Content:  "The ribeyes from Spaeth Farms are hands-down the best steaks I've ever cooked at home. The marbling is incredible and the flavor is unmatched.",
			Rating:   5,
			Featured: 1,
		},
		{
			Author:   "Sarah & Tom K.",
			Location: "Minneapolis, MN",
			Content:  "We ordered the Family Essentials Bundle and it fed our family of five for over a month. Great variety and amazing quality at a fair price.",
			Rating:   5,
			Featured: 1,
		},
		{
			Author:   "David L.",
			Location: "Denver, CO",
			Content:  "Shipping was fast and everything arrived frozen solid. You can really taste the difference when beef is raised right. We're customers for life!",
			Rating:   5,
			Featured: 1,
		},
	}

	for _, t := range testimonials {
		_, err := db.Queries.CreateTestimonial(ctx, sqlc.CreateTestimonialParams{
			Author:   t.Author,
			Location: sql.NullString{String: t.Location, Valid: true},
			Content:  t.Content,
			Rating:   sql.NullInt64{Int64: t.Rating, Valid: true},
			Featured: sql.NullInt64{Int64: t.Featured, Valid: true},
		})
		if err != nil {
			slog.Warn("failed to create testimonial", "author", t.Author, "error", err)
			continue
		}
		slog.Info("created testimonial", "author", t.Author)
	}

	fmt.Println("\nData migration complete!")
	fmt.Println("Run 'make migrate' first if you haven't already.")
}
