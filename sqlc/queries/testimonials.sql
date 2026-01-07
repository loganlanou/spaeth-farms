-- name: GetTestimonial :one
SELECT * FROM testimonials WHERE id = ? LIMIT 1;

-- name: ListTestimonials :many
SELECT * FROM testimonials ORDER BY created_at DESC;

-- name: ListFeaturedTestimonials :many
SELECT * FROM testimonials WHERE featured = 1 ORDER BY created_at DESC;

-- name: CreateTestimonial :one
INSERT INTO testimonials (author, location, content, rating, featured)
VALUES (?, ?, ?, ?, ?)
RETURNING *;

-- name: UpdateTestimonial :exec
UPDATE testimonials
SET author = ?, location = ?, content = ?, rating = ?, featured = ?
WHERE id = ?;

-- name: DeleteTestimonial :exec
DELETE FROM testimonials WHERE id = ?;
