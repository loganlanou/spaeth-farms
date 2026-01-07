package main

import (
	"context"
	"database/sql"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"spaeth-farms/internal/config"
	"spaeth-farms/internal/database"
	"spaeth-farms/internal/handler"
	"spaeth-farms/internal/middleware"

	"github.com/labstack/echo/v4"
	"github.com/pressly/goose/v3"
	_ "modernc.org/sqlite"
)

func main() {
	cfg := config.Load()

	// Run migrations
	if err := runMigrations(cfg.DatabaseURL); err != nil {
		slog.Error("failed to run migrations", "error", err)
		os.Exit(1)
	}

	ctx := context.Background()
	db, err := database.New(ctx, cfg.DatabaseURL)
	if err != nil {
		slog.Error("failed to connect to database", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	e := echo.New()
	e.HideBanner = true
	e.HidePort = true

	middleware.Setup(e, cfg)

	h := handler.New(cfg, db)
	h.RegisterRoutes(e)

	go func() {
		addr := ":" + cfg.Port
		slog.Info("starting server", "url", "http://localhost:"+cfg.Port, "env", cfg.Env)
		if err := e.Start(addr); err != nil {
			slog.Info("shutting down server")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		slog.Error("server shutdown error", "error", err)
	}

	slog.Info("server stopped")
}

func runMigrations(dbURL string) error {
	db, err := sql.Open("sqlite", dbURL)
	if err != nil {
		return err
	}
	defer db.Close()

	if err := goose.SetDialect("sqlite3"); err != nil {
		return err
	}

	if err := goose.Up(db, "migrations"); err != nil {
		return err
	}

	return nil
}
