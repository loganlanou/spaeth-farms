package services

import (
	"context"
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log/slog"
	"math/big"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// ClerkService handles authentication via Clerk
type ClerkService struct {
	secretKey      string
	publishableKey string
	httpClient     *http.Client
	jwksCache      *jwksCache
}

// jwksCache caches the JWKS keys from Clerk
type jwksCache struct {
	mu        sync.RWMutex
	keys      map[string]*rsa.PublicKey
	expiresAt time.Time
}

// JWKS represents a JSON Web Key Set
type JWKS struct {
	Keys []JWK `json:"keys"`
}

// JWK represents a JSON Web Key
type JWK struct {
	Kid string `json:"kid"`
	Kty string `json:"kty"`
	Alg string `json:"alg"`
	Use string `json:"use"`
	N   string `json:"n"`
	E   string `json:"e"`
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
		jwksCache: &jwksCache{
			keys: make(map[string]*rsa.PublicKey),
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

	// Parse token header to get the key ID
	token, err := jwt.ParseWithClaims(tokenString, &ClerkClaims{}, func(token *jwt.Token) (interface{}, error) {
		// Verify signing method is RS256
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// Get the key ID from the token header
		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, fmt.Errorf("missing kid in token header")
		}

		// Get the public key from JWKS
		publicKey, err := s.getPublicKey(kid)
		if err != nil {
			return nil, fmt.Errorf("failed to get public key: %w", err)
		}

		return publicKey, nil
	})

	if err != nil {
		return nil, fmt.Errorf("failed to verify token: %w", err)
	}

	claims, ok := token.Claims.(*ClerkClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token claims")
	}

	return claims, nil
}

// getPublicKey retrieves the public key for the given key ID from Clerk's JWKS
func (s *ClerkService) getPublicKey(kid string) (*rsa.PublicKey, error) {
	// Check cache first
	s.jwksCache.mu.RLock()
	if key, ok := s.jwksCache.keys[kid]; ok && time.Now().Before(s.jwksCache.expiresAt) {
		s.jwksCache.mu.RUnlock()
		return key, nil
	}
	s.jwksCache.mu.RUnlock()

	// Fetch fresh JWKS from Clerk
	if err := s.refreshJWKS(); err != nil {
		return nil, err
	}

	// Try to get key from refreshed cache
	s.jwksCache.mu.RLock()
	defer s.jwksCache.mu.RUnlock()

	key, ok := s.jwksCache.keys[kid]
	if !ok {
		return nil, fmt.Errorf("key %s not found in JWKS", kid)
	}

	return key, nil
}

// refreshJWKS fetches and caches the JWKS from Clerk
func (s *ClerkService) refreshJWKS() error {
	// Extract the Clerk frontend API from the publishable key
	// Format: pk_test_xxx or pk_live_xxx -> clerk.xxx.lcl.dev or clerk.xxx.com
	jwksURL := s.getJWKSURL()

	req, err := http.NewRequest("GET", jwksURL, nil)
	if err != nil {
		return fmt.Errorf("failed to create JWKS request: %w", err)
	}

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to fetch JWKS: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("JWKS endpoint returned status %d", resp.StatusCode)
	}

	var jwks JWKS
	if err := json.NewDecoder(resp.Body).Decode(&jwks); err != nil {
		return fmt.Errorf("failed to decode JWKS: %w", err)
	}

	// Parse and cache the keys
	s.jwksCache.mu.Lock()
	defer s.jwksCache.mu.Unlock()

	for _, key := range jwks.Keys {
		if key.Kty != "RSA" {
			continue
		}

		publicKey, err := parseRSAPublicKey(key)
		if err != nil {
			slog.Warn("failed to parse JWK", "kid", key.Kid, "error", err)
			continue
		}

		s.jwksCache.keys[key.Kid] = publicKey
	}

	// Cache for 1 hour
	s.jwksCache.expiresAt = time.Now().Add(1 * time.Hour)

	return nil
}

// getJWKSURL returns the JWKS URL for the Clerk instance
func (s *ClerkService) getJWKSURL() string {
	// Use the Clerk API to get JWKS
	// The publishable key contains the instance identifier
	return "https://api.clerk.com/v1/jwks"
}

// parseRSAPublicKey converts a JWK to an RSA public key
func parseRSAPublicKey(jwk JWK) (*rsa.PublicKey, error) {
	// Decode the modulus (n)
	nBytes, err := base64.RawURLEncoding.DecodeString(jwk.N)
	if err != nil {
		return nil, fmt.Errorf("failed to decode modulus: %w", err)
	}

	// Decode the exponent (e)
	eBytes, err := base64.RawURLEncoding.DecodeString(jwk.E)
	if err != nil {
		return nil, fmt.Errorf("failed to decode exponent: %w", err)
	}

	// Convert exponent bytes to int
	var e int
	for _, b := range eBytes {
		e = e<<8 + int(b)
	}

	return &rsa.PublicKey{
		N: new(big.Int).SetBytes(nBytes),
		E: e,
	}, nil
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
