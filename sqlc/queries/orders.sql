-- name: GetOrder :one
SELECT * FROM orders WHERE id = ? LIMIT 1;

-- name: GetOrderByStripeSession :one
SELECT * FROM orders WHERE stripe_session_id = ? LIMIT 1;

-- name: ListOrders :many
SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?;

-- name: ListOrdersByStatus :many
SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?;

-- name: ListOrdersByEmail :many
SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC;

-- name: CreateOrder :one
INSERT INTO orders (stripe_session_id, customer_email, customer_name, customer_phone, shipping_address, items, subtotal_cents, shipping_cents, total_cents, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: UpdateOrderStatus :exec
UPDATE orders
SET status = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: UpdateOrderStatusBySession :exec
UPDATE orders
SET status = ?, updated_at = CURRENT_TIMESTAMP
WHERE stripe_session_id = ?;

-- name: UpdateOrderPaymentIntent :exec
UPDATE orders
SET stripe_payment_intent = ?, updated_at = CURRENT_TIMESTAMP
WHERE stripe_session_id = ?;

-- name: CountOrders :one
SELECT COUNT(*) FROM orders;

-- name: CountOrdersByStatus :one
SELECT COUNT(*) FROM orders WHERE status = ?;

-- name: GetRecentOrders :many
SELECT * FROM orders ORDER BY created_at DESC LIMIT ?;
