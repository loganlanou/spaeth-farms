-- name: GetHeroSlide :one
SELECT * FROM hero_slides WHERE id = ? LIMIT 1;

-- name: ListHeroSlides :many
SELECT * FROM hero_slides ORDER BY sort_order;

-- name: ListActiveHeroSlides :many
SELECT * FROM hero_slides WHERE active = 1 ORDER BY sort_order;

-- name: CreateHeroSlide :one
INSERT INTO hero_slides (image, alt_text, sort_order, active)
VALUES (?, ?, ?, ?)
RETURNING *;

-- name: UpdateHeroSlide :exec
UPDATE hero_slides
SET image = ?, alt_text = ?, sort_order = ?, active = ?
WHERE id = ?;

-- name: DeleteHeroSlide :exec
DELETE FROM hero_slides WHERE id = ?;
