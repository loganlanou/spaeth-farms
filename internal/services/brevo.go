package services

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"time"
)

// BrevoService handles email sending via Brevo (formerly Sendinblue)
type BrevoService struct {
	apiKey     string
	httpClient *http.Client
	fromEmail  string
	fromName   string
}

// EmailRecipient represents an email recipient
type EmailRecipient struct {
	Email string `json:"email"`
	Name  string `json:"name,omitempty"`
}

// EmailParams represents parameters for sending an email
type EmailParams struct {
	To          []EmailRecipient       `json:"to"`
	Subject     string                 `json:"subject"`
	HTMLContent string                 `json:"htmlContent,omitempty"`
	TextContent string                 `json:"textContent,omitempty"`
	ReplyTo     *EmailRecipient        `json:"replyTo,omitempty"`
	Params      map[string]interface{} `json:"params,omitempty"`
	TemplateID  int64                  `json:"templateId,omitempty"`
}

// brevoSendRequest is the request body for Brevo's send email API
type brevoSendRequest struct {
	Sender      EmailRecipient         `json:"sender"`
	To          []EmailRecipient       `json:"to"`
	Subject     string                 `json:"subject,omitempty"`
	HTMLContent string                 `json:"htmlContent,omitempty"`
	TextContent string                 `json:"textContent,omitempty"`
	ReplyTo     *EmailRecipient        `json:"replyTo,omitempty"`
	Params      map[string]interface{} `json:"params,omitempty"`
	TemplateID  int64                  `json:"templateId,omitempty"`
}

// brevoResponse is the response from Brevo API
type brevoResponse struct {
	MessageID string `json:"messageId"`
}

// NewBrevoService creates a new Brevo email service
func NewBrevoService(apiKey, fromEmail, fromName string) *BrevoService {
	return &BrevoService{
		apiKey: apiKey,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
		fromEmail: fromEmail,
		fromName:  fromName,
	}
}

// IsConfigured returns true if Brevo is configured
func (s *BrevoService) IsConfigured() bool {
	return s.apiKey != ""
}

// SendEmail sends an email using Brevo
func (s *BrevoService) SendEmail(ctx context.Context, params *EmailParams) (string, error) {
	if !s.IsConfigured() {
		slog.Warn("brevo not configured, email not sent", "subject", params.Subject)
		return "", nil // Return nil to not break the app when not configured
	}

	req := brevoSendRequest{
		Sender: EmailRecipient{
			Email: s.fromEmail,
			Name:  s.fromName,
		},
		To:          params.To,
		Subject:     params.Subject,
		HTMLContent: params.HTMLContent,
		TextContent: params.TextContent,
		ReplyTo:     params.ReplyTo,
		Params:      params.Params,
		TemplateID:  params.TemplateID,
	}

	body, err := json.Marshal(req)
	if err != nil {
		return "", fmt.Errorf("failed to marshal email request: %w", err)
	}

	httpReq, err := http.NewRequestWithContext(ctx, "POST", "https://api.brevo.com/v3/smtp/email", bytes.NewReader(body))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	httpReq.Header.Set("api-key", s.apiKey)
	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("Accept", "application/json")

	resp, err := s.httpClient.Do(httpReq)
	if err != nil {
		return "", fmt.Errorf("failed to send email: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		var errBody map[string]interface{}
		json.NewDecoder(resp.Body).Decode(&errBody)
		slog.Error("brevo API error", "status", resp.StatusCode, "error", errBody)
		return "", fmt.Errorf("brevo API error: status %d", resp.StatusCode)
	}

	var brevoResp brevoResponse
	if err := json.NewDecoder(resp.Body).Decode(&brevoResp); err != nil {
		return "", fmt.Errorf("failed to decode response: %w", err)
	}

	slog.Info("email sent", "message_id", brevoResp.MessageID, "to", params.To[0].Email)
	return brevoResp.MessageID, nil
}

// SendContactFormNotification sends a notification when someone submits the contact form
func (s *BrevoService) SendContactFormNotification(ctx context.Context, name, email, phone, subject, message, notifyEmail string) error {
	htmlContent := fmt.Sprintf(`
		<h2>New Contact Form Submission</h2>
		<p><strong>From:</strong> %s (%s)</p>
		<p><strong>Phone:</strong> %s</p>
		<p><strong>Subject:</strong> %s</p>
		<hr>
		<h3>Message:</h3>
		<p>%s</p>
	`, name, email, phone, subject, message)

	textContent := fmt.Sprintf(`
New Contact Form Submission

From: %s (%s)
Phone: %s
Subject: %s

Message:
%s
	`, name, email, phone, subject, message)

	params := &EmailParams{
		To: []EmailRecipient{
			{Email: notifyEmail, Name: "Spaeth Farms"},
		},
		Subject:     fmt.Sprintf("Contact Form: %s", subject),
		HTMLContent: htmlContent,
		TextContent: textContent,
		ReplyTo: &EmailRecipient{
			Email: email,
			Name:  name,
		},
	}

	_, err := s.SendEmail(ctx, params)
	return err
}

// SendContactFormConfirmation sends a confirmation to the person who submitted the form
func (s *BrevoService) SendContactFormConfirmation(ctx context.Context, name, email string) error {
	htmlContent := fmt.Sprintf(`
		<h2>Thank you for contacting Spaeth Farms!</h2>
		<p>Hi %s,</p>
		<p>We've received your message and will get back to you as soon as possible, usually within 24 hours.</p>
		<p>In the meantime, feel free to browse our <a href="https://spaethfarms.com/products">premium beef selection</a>.</p>
		<p>Best regards,<br>The Spaeth Farms Team</p>
		<hr>
		<p style="font-size: 12px; color: #666;">
			Spaeth Farms<br>
			2515 250th Street, Cadott, WI 54727<br>
			(715) 313-0075
		</p>
	`, name)

	textContent := fmt.Sprintf(`
Thank you for contacting Spaeth Farms!

Hi %s,

We've received your message and will get back to you as soon as possible, usually within 24 hours.

Best regards,
The Spaeth Farms Team

---
Spaeth Farms
2515 250th Street, Cadott, WI 54727
(715) 313-0075
	`, name)

	params := &EmailParams{
		To: []EmailRecipient{
			{Email: email, Name: name},
		},
		Subject:     "Thank you for contacting Spaeth Farms",
		HTMLContent: htmlContent,
		TextContent: textContent,
	}

	_, err := s.SendEmail(ctx, params)
	return err
}

// SendOrderConfirmation sends an order confirmation email
func (s *BrevoService) SendOrderConfirmation(ctx context.Context, customerName, customerEmail, orderID string, items []CartItem, total int64) error {
	// Build items table
	var itemsHTML string
	for _, item := range items {
		itemsHTML += fmt.Sprintf(`
			<tr>
				<td style="padding: 10px; border-bottom: 1px solid #eee;">%s</td>
				<td style="padding: 10px; border-bottom: 1px solid #eee;">%d</td>
				<td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$%.2f</td>
			</tr>
		`, item.Name, item.Qty, float64(item.Price*int64(item.Qty))/100)
	}

	htmlContent := fmt.Sprintf(`
		<h2>Order Confirmation</h2>
		<p>Hi %s,</p>
		<p>Thank you for your order! We're preparing your premium beef for shipment.</p>

		<h3>Order #%s</h3>
		<table style="width: 100%%; border-collapse: collapse;">
			<thead>
				<tr style="background: #f5f5f5;">
					<th style="padding: 10px; text-align: left;">Item</th>
					<th style="padding: 10px; text-align: left;">Qty</th>
					<th style="padding: 10px; text-align: right;">Price</th>
				</tr>
			</thead>
			<tbody>
				%s
			</tbody>
			<tfoot>
				<tr>
					<td colspan="2" style="padding: 10px; font-weight: bold;">Total</td>
					<td style="padding: 10px; text-align: right; font-weight: bold;">$%.2f</td>
				</tr>
			</tfoot>
		</table>

		<h3>What's Next?</h3>
		<ul>
			<li>You'll receive tracking information once your order ships</li>
			<li>Orders are packed with dry ice and shipped via expedited delivery</li>
			<li>Expected delivery: 3-5 business days</li>
		</ul>

		<p>Questions? Contact us at (715) 313-0075 or reply to this email.</p>

		<p>Thank you for choosing Spaeth Farms!</p>
	`, customerName, orderID, itemsHTML, float64(total)/100)

	params := &EmailParams{
		To: []EmailRecipient{
			{Email: customerEmail, Name: customerName},
		},
		Subject:     fmt.Sprintf("Order Confirmation - #%s", orderID),
		HTMLContent: htmlContent,
	}

	_, err := s.SendEmail(ctx, params)
	return err
}
