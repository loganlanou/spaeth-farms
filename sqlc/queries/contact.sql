-- name: GetContactSubmission :one
SELECT * FROM contact_submissions WHERE id = ? LIMIT 1;

-- name: ListContactSubmissions :many
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ? OFFSET ?;

-- name: ListUnreadContactSubmissions :many
SELECT * FROM contact_submissions WHERE read = 0 ORDER BY created_at DESC;

-- name: CreateContactSubmission :one
INSERT INTO contact_submissions (name, email, phone, subject, message)
VALUES (?, ?, ?, ?, ?)
RETURNING *;

-- name: MarkContactRead :exec
UPDATE contact_submissions SET read = 1 WHERE id = ?;

-- name: DeleteContactSubmission :exec
DELETE FROM contact_submissions WHERE id = ?;

-- name: CountUnreadContacts :one
SELECT COUNT(*) FROM contact_submissions WHERE read = 0;
