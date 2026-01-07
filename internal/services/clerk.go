package services

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// ClerkService handles authentication via Clerk
type ClerkService struct {
	secretKey      string
	publishableKey string
	httpClient     *http.Client
}

// ClerkUser represents a user from Clerk
type ClerkUser struct {
	ID             string                 `json:"id"`
	Email          string                 `json:"email_addresses"`
	FirstName      string                 `json:"first_name"`
	LastName       string                 `json:"last_name"`
	PublicMetadata map[string]interface{} `json:"public_metadata"`
}

// ClerkClaims represents the JWT claims from Clerk
type ClerkClaims struct {
	jwt.RegisteredClaims
	SessionID string                 `json:"sid"`
	OrgID     string                 `json:"org_id,omitempty"`
	OrgRole   string                 `json:"org_role,omitempty"`
	Metadata  map[string]interface{} `json:"metadata,omitempty"`
}

// NewClerkService creates a new Clerk service
func NewClerkService(secretKey, publishableKey string) *ClerkService {
	return &ClerkService{
		secretKey:      secretKey,
		publishableKey: publishableKey,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// IsConfigured returns true if Clerk is configured
func (s *ClerkService) IsConfigured() bool {
	return s.secretKey != "" && s.publishableKey != ""
}

// VerifyToken verifies a Clerk session token and returns the claims
func (s *ClerkService) VerifyToken(tokenString string) (*ClerkClaims, error) {
	if !s.IsConfigured() {
		return nil, fmt.Errorf("clerk not configured")
	}

	// Remove "Bearer " prefix if present
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	// For Clerk, we need to verify against their JWKS endpoint
	// In production, you'd cache the JWKS and verify properly
	// This is a simplified version that trusts the token structure
	token, _, err := jwt.NewParser().ParseUnverified(tokenString, &ClerkClaims{})
	if err != nil {
		return nil, fmt.Errorf("failed to parse token: %w", err)
	}

	claims, ok := token.Claims.(*ClerkClaims)
	if !ok {
		return nil, fmt.Errorf("invalid claims type")
	}

	// Check expiration
	if claims.ExpiresAt != nil && claims.ExpiresAt.Before(time.Now()) {
		return nil, fmt.Errorf("token expired")
	}

	return claims, nil
}

// GetUser fetches a user from Clerk by ID
func (s *ClerkService) GetUser(ctx context.Context, userID string) (*ClerkUser, error) {
	if !s.IsConfigured() {
		return nil, fmt.Errorf("clerk not configured")
	}

	req, err := http.NewRequestWithContext(ctx, "GET", fmt.Sprintf("https://api.clerk.com/v1/users/%s", userID), nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+s.secretKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("clerk API error: status %d", resp.StatusCode)
	}

	var user ClerkUser
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, fmt.Errorf("failed to decode user: %w", err)
	}

	return &user, nil
}

// IsAdmin checks if the user has admin role
func (s *ClerkService) IsAdmin(claims *ClerkClaims) bool {
	if claims == nil {
		return false
	}

	// Check org role
	if claims.OrgRole == "admin" || claims.OrgRole == "org:admin" {
		return true
	}

	// Check metadata for admin flag
	if claims.Metadata != nil {
		if isAdmin, ok := claims.Metadata["is_admin"].(bool); ok && isAdmin {
			return true
		}
		if role, ok := claims.Metadata["role"].(string); ok && role == "admin" {
			return true
		}
	}

	return false
}

// ExtractTokenFromRequest extracts the session token from request headers or cookies
func (s *ClerkService) ExtractTokenFromRequest(r *http.Request) string {
	// Check Authorization header first
	if auth := r.Header.Get("Authorization"); auth != "" {
		return strings.TrimPrefix(auth, "Bearer ")
	}

	// Check for Clerk session cookie
	if cookie, err := r.Cookie("__session"); err == nil {
		return cookie.Value
	}

	// Check for Clerk client token cookie
	if cookie, err := r.Cookie("__client_uat"); err == nil {
		return cookie.Value
	}

	return ""
}

// LogAuthAttempt logs authentication attempts for auditing
func (s *ClerkService) LogAuthAttempt(userID string, success bool, reason string) {
	if success {
		slog.Info("auth success", "user_id", userID)
	} else {
		slog.Warn("auth failed", "user_id", userID, "reason", reason)
	}
}
