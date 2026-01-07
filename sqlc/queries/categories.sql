-- name: GetCategory :one
SELECT * FROM categories WHERE id = ? LIMIT 1;

-- name: ListCategories :many
SELECT * FROM categories ORDER BY sort_order, name;

-- name: CreateCategory :one
INSERT INTO categories (id, name, description, sort_order)
VALUES (?, ?, ?, ?)
RETURNING *;

-- name: UpdateCategory :exec
UPDATE categories
SET name = ?, description = ?, sort_order = ?
WHERE id = ?;

-- name: DeleteCategory :exec
DELETE FROM categories WHERE id = ?;
