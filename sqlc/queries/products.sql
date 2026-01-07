-- name: GetProduct :one
SELECT * FROM products WHERE id = ? LIMIT 1;

-- name: GetProductBySlug :one
SELECT * FROM products WHERE slug = ? LIMIT 1;

-- name: ListProducts :many
SELECT * FROM products ORDER BY name;

-- name: ListProductsByCategory :many
SELECT * FROM products WHERE category_id = ? ORDER BY name;

-- name: ListFeaturedProducts :many
SELECT * FROM products WHERE featured = 1 ORDER BY name;

-- name: ListInStockProducts :many
SELECT * FROM products WHERE in_stock = 1 ORDER BY name;

-- name: SearchProducts :many
SELECT * FROM products
WHERE name LIKE ? OR description LIKE ?
ORDER BY name;

-- name: CreateProduct :one
INSERT INTO products (slug, name, category_id, price_cents, weight, description, image, featured, in_stock)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: UpdateProduct :exec
UPDATE products
SET name = ?, category_id = ?, price_cents = ?, weight = ?, description = ?, image = ?, featured = ?, in_stock = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: UpdateProductBySlug :exec
UPDATE products
SET name = ?, category_id = ?, price_cents = ?, weight = ?, description = ?, image = ?, featured = ?, in_stock = ?, updated_at = CURRENT_TIMESTAMP
WHERE slug = ?;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = ?;

-- name: DeleteProductBySlug :exec
DELETE FROM products WHERE slug = ?;

-- name: CountProducts :one
SELECT COUNT(*) FROM products;

-- name: CountProductsByCategory :one
SELECT COUNT(*) FROM products WHERE category_id = ?;
