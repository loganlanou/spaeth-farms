package services

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/stripe/stripe-go/v81"
	"github.com/stripe/stripe-go/v81/checkout/session"
	"github.com/stripe/stripe-go/v81/webhook"
)

// StripeService handles payment processing via Stripe
type StripeService struct {
	secretKey      string
	publishableKey string
	webhookSecret  string
}

// CartItem represents an item in the shopping cart
type CartItem struct {
	Slug   string `json:"slug"`
	Name   string `json:"name"`
	Price  int64  `json:"price"` // Price in cents
	Image  string `json:"image"`
	Weight string `json:"weight"`
	Qty    int    `json:"qty"`
}

// CheckoutCustomer represents customer info from checkout form
type CheckoutCustomer struct {
	Email                string `json:"email"`
	FirstName            string `json:"firstName"`
	LastName             string `json:"lastName"`
	Phone                string `json:"phone"`
	Address              string `json:"address"`
	Apartment            string `json:"apartment"`
	City                 string `json:"city"`
	State                string `json:"state"`
	ZipCode              string `json:"zipCode"`
	DeliveryInstructions string `json:"deliveryInstructions"`
}

// CheckoutRequest represents the checkout request payload
type CheckoutRequest struct {
	Items    []CartItem       `json:"items"`
	Customer CheckoutCustomer `json:"customer"`
}

// NewStripeService creates a new Stripe service
func NewStripeService(secretKey, publishableKey, webhookSecret string) *StripeService {
	if secretKey != "" {
		stripe.Key = secretKey
	}
	return &StripeService{
		secretKey:      secretKey,
		publishableKey: publishableKey,
		webhookSecret:  webhookSecret,
	}
}

// IsConfigured returns true if Stripe is configured
func (s *StripeService) IsConfigured() bool {
	return s.secretKey != ""
}

// GetPublishableKey returns the publishable key for client-side use
func (s *StripeService) GetPublishableKey() string {
	return s.publishableKey
}

// CreateCheckoutSession creates a Stripe checkout session
func (s *StripeService) CreateCheckoutSession(ctx context.Context, req *CheckoutRequest, successURL, cancelURL string) (*stripe.CheckoutSession, error) {
	if !s.IsConfigured() {
		return nil, fmt.Errorf("stripe not configured")
	}

	// Build line items from cart
	lineItems := make([]*stripe.CheckoutSessionLineItemParams, len(req.Items))
	for i, item := range req.Items {
		lineItems[i] = &stripe.CheckoutSessionLineItemParams{
			PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
				Currency: stripe.String("usd"),
				ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
					Name:        stripe.String(item.Name),
					Description: stripe.String(item.Weight),
					Images:      []*string{stripe.String(item.Image)},
				},
				UnitAmount: stripe.Int64(item.Price),
			},
			Quantity: stripe.Int64(int64(item.Qty)),
		}
	}

	// Calculate subtotal for shipping
	var subtotal int64
	for _, item := range req.Items {
		subtotal += item.Price * int64(item.Qty)
	}

	// Add shipping if under threshold (in cents: $199 = 19900)
	shippingThreshold := int64(19900)
	shippingCost := int64(2999) // $29.99

	shippingOptions := []*stripe.CheckoutSessionShippingOptionParams{}
	if subtotal >= shippingThreshold {
		shippingOptions = append(shippingOptions, &stripe.CheckoutSessionShippingOptionParams{
			ShippingRateData: &stripe.CheckoutSessionShippingOptionShippingRateDataParams{
				Type:        stripe.String("fixed_amount"),
				DisplayName: stripe.String("Free Shipping"),
				FixedAmount: &stripe.CheckoutSessionShippingOptionShippingRateDataFixedAmountParams{
					Amount:   stripe.Int64(0),
					Currency: stripe.String("usd"),
				},
				DeliveryEstimate: &stripe.CheckoutSessionShippingOptionShippingRateDataDeliveryEstimateParams{
					Minimum: &stripe.CheckoutSessionShippingOptionShippingRateDataDeliveryEstimateMinimumParams{
						Unit:  stripe.String("business_day"),
						Value: stripe.Int64(3),
					},
					Maximum: &stripe.CheckoutSessionShippingOptionShippingRateDataDeliveryEstimateMaximumParams{
						Unit:  stripe.String("business_day"),
						Value: stripe.Int64(5),
					},
				},
			},
		})
	} else {
		shippingOptions = append(shippingOptions, &stripe.CheckoutSessionShippingOptionParams{
			ShippingRateData: &stripe.CheckoutSessionShippingOptionShippingRateDataParams{
				Type:        stripe.String("fixed_amount"),
				DisplayName: stripe.String("Standard Shipping"),
				FixedAmount: &stripe.CheckoutSessionShippingOptionShippingRateDataFixedAmountParams{
					Amount:   stripe.Int64(shippingCost),
					Currency: stripe.String("usd"),
				},
				DeliveryEstimate: &stripe.CheckoutSessionShippingOptionShippingRateDataDeliveryEstimateParams{
					Minimum: &stripe.CheckoutSessionShippingOptionShippingRateDataDeliveryEstimateMinimumParams{
						Unit:  stripe.String("business_day"),
						Value: stripe.Int64(3),
					},
					Maximum: &stripe.CheckoutSessionShippingOptionShippingRateDataDeliveryEstimateMaximumParams{
						Unit:  stripe.String("business_day"),
						Value: stripe.Int64(5),
					},
				},
			},
		})
	}

	// Build shipping address
	shippingAddress := &stripe.AddressParams{
		Line1:      stripe.String(req.Customer.Address),
		Line2:      stripe.String(req.Customer.Apartment),
		City:       stripe.String(req.Customer.City),
		State:      stripe.String(req.Customer.State),
		PostalCode: stripe.String(req.Customer.ZipCode),
		Country:    stripe.String("US"),
	}

	params := &stripe.CheckoutSessionParams{
		Mode:            stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL:      stripe.String(successURL + "?session_id={CHECKOUT_SESSION_ID}"),
		CancelURL:       stripe.String(cancelURL),
		LineItems:       lineItems,
		ShippingOptions: shippingOptions,
		CustomerEmail:   stripe.String(req.Customer.Email),
		ShippingAddressCollection: &stripe.CheckoutSessionShippingAddressCollectionParams{
			AllowedCountries: []*string{stripe.String("US")},
		},
		PhoneNumberCollection: &stripe.CheckoutSessionPhoneNumberCollectionParams{
			Enabled: stripe.Bool(true),
		},
		Metadata: map[string]string{
			"customer_name":         req.Customer.FirstName + " " + req.Customer.LastName,
			"customer_phone":        req.Customer.Phone,
			"delivery_instructions": req.Customer.DeliveryInstructions,
		},
		AutomaticTax: &stripe.CheckoutSessionAutomaticTaxParams{
			Enabled: stripe.Bool(true),
		},
	}

	// Pre-fill shipping address
	params.PaymentIntentData = &stripe.CheckoutSessionPaymentIntentDataParams{
		Shipping: &stripe.ShippingDetailsParams{
			Name:    stripe.String(req.Customer.FirstName + " " + req.Customer.LastName),
			Phone:   stripe.String(req.Customer.Phone),
			Address: shippingAddress,
		},
	}

	sess, err := session.New(params)
	if err != nil {
		slog.Error("failed to create checkout session", "error", err)
		return nil, fmt.Errorf("failed to create checkout session: %w", err)
	}

	slog.Info("checkout session created", "session_id", sess.ID, "customer_email", req.Customer.Email)
	return sess, nil
}

// GetCheckoutSession retrieves a checkout session by ID
func (s *StripeService) GetCheckoutSession(ctx context.Context, sessionID string) (*stripe.CheckoutSession, error) {
	if !s.IsConfigured() {
		return nil, fmt.Errorf("stripe not configured")
	}

	sess, err := session.Get(sessionID, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to get checkout session: %w", err)
	}

	return sess, nil
}

// VerifyWebhookSignature verifies the Stripe webhook signature
func (s *StripeService) VerifyWebhookSignature(payload []byte, signature string) (*stripe.Event, error) {
	if s.webhookSecret == "" {
		return nil, fmt.Errorf("webhook secret not configured")
	}

	event, err := webhook.ConstructEvent(payload, signature, s.webhookSecret)
	if err != nil {
		return nil, fmt.Errorf("webhook signature verification failed: %w", err)
	}

	return &event, nil
}

// HandleWebhookEvent processes Stripe webhook events
func (s *StripeService) HandleWebhookEvent(event *stripe.Event) error {
	switch event.Type {
	case "checkout.session.completed":
		slog.Info("checkout completed", "event_id", event.ID)
		// The checkout session data is in event.Data.Raw
		// In a real implementation, you'd parse this JSON to get session details

	case "payment_intent.succeeded":
		slog.Info("payment succeeded", "event_id", event.ID)

	case "payment_intent.payment_failed":
		slog.Warn("payment failed", "event_id", event.ID)

	default:
		slog.Debug("unhandled webhook event", "type", event.Type)
	}

	return nil
}
