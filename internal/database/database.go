package database

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"

	"spaeth-farms/internal/database/sqlc"
)

type DB struct {
	Conn    *sql.DB
	Queries *sqlc.Queries
}

func New(ctx context.Context, databasePath string) (*DB, error) {
	// Ensure the directory exists
	dir := filepath.Dir(databasePath)
	if dir != "" && dir != "." {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return nil, fmt.Errorf("unable to create database directory: %w", err)
		}
	}

	// Open SQLite connection with foreign keys enabled
	conn, err := sql.Open("sqlite", databasePath+"?_foreign_keys=on&_journal_mode=WAL")
	if err != nil {
		return nil, fmt.Errorf("unable to open database: %w", err)
	}

	// Set connection pool settings for SQLite
	conn.SetMaxOpenConns(1) // SQLite only supports one writer at a time
	conn.SetMaxIdleConns(1)

	if err := conn.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("unable to ping database: %w", err)
	}

	return &DB{
		Conn:    conn,
		Queries: sqlc.New(conn),
	}, nil
}

func (db *DB) Close() error {
	return db.Conn.Close()
}

// WithTx executes a function within a transaction
func (db *DB) WithTx(ctx context.Context, fn func(*sqlc.Queries) error) error {
	tx, err := db.Conn.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin transaction: %w", err)
	}

	q := db.Queries.WithTx(tx)
	if err := fn(q); err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("rollback failed: %v (original error: %w)", rbErr, err)
		}
		return err
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("commit transaction: %w", err)
	}

	return nil
}
