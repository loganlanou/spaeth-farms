package middleware

import (
	"net/http"

	"spaeth-farms/internal/services"

	"github.com/labstack/echo/v4"
)

// AuthContextKey is the key for storing auth info in context
type AuthContextKey string

const (
	// ClerkClaimsKey is the context key for Clerk claims
	ClerkClaimsKey AuthContextKey = "clerk_claims"
	// ClerkUserIDKey is the context key for the user ID
	ClerkUserIDKey AuthContextKey = "clerk_user_id"
)

// RequireAuth creates middleware that requires a valid Clerk session
func RequireAuth(clerk *services.ClerkService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if clerk == nil || !clerk.IsConfigured() {
				// Clerk not configured - allow access in development
				return next(c)
			}

			token := clerk.ExtractTokenFromRequest(c.Request())
			if token == "" {
				return c.Redirect(http.StatusFound, "/sign-in")
			}

			claims, err := clerk.VerifyToken(token)
			if err != nil {
				clerk.LogAuthAttempt("", false, err.Error())
				return c.Redirect(http.StatusFound, "/sign-in")
			}

			// Store claims in context
			c.Set(string(ClerkClaimsKey), claims)
			c.Set(string(ClerkUserIDKey), claims.Subject)

			clerk.LogAuthAttempt(claims.Subject, true, "")
			return next(c)
		}
	}
}

// RequireAdmin creates middleware that requires admin role
func RequireAdmin(clerk *services.ClerkService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if clerk == nil || !clerk.IsConfigured() {
				// Clerk not configured - allow access in development
				return next(c)
			}

			token := clerk.ExtractTokenFromRequest(c.Request())
			if token == "" {
				return c.Redirect(http.StatusFound, "/sign-in?redirect=/admin")
			}

			claims, err := clerk.VerifyToken(token)
			if err != nil {
				clerk.LogAuthAttempt("", false, err.Error())
				return c.Redirect(http.StatusFound, "/sign-in?redirect=/admin")
			}

			if !clerk.IsAdmin(claims) {
				clerk.LogAuthAttempt(claims.Subject, false, "not admin")
				return c.JSON(http.StatusForbidden, map[string]string{
					"error": "Admin access required",
				})
			}

			// Store claims in context
			c.Set(string(ClerkClaimsKey), claims)
			c.Set(string(ClerkUserIDKey), claims.Subject)

			clerk.LogAuthAttempt(claims.Subject, true, "admin")
			return next(c)
		}
	}
}

// OptionalAuth creates middleware that loads user info if available but doesn't require it
func OptionalAuth(clerk *services.ClerkService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if clerk == nil || !clerk.IsConfigured() {
				return next(c)
			}

			token := clerk.ExtractTokenFromRequest(c.Request())
			if token == "" {
				return next(c)
			}

			claims, err := clerk.VerifyToken(token)
			if err != nil {
				// Token invalid - continue without auth
				return next(c)
			}

			// Store claims in context
			c.Set(string(ClerkClaimsKey), claims)
			c.Set(string(ClerkUserIDKey), claims.Subject)

			return next(c)
		}
	}
}

// GetClerkClaims retrieves Clerk claims from the context
func GetClerkClaims(c echo.Context) *services.ClerkClaims {
	if claims, ok := c.Get(string(ClerkClaimsKey)).(*services.ClerkClaims); ok {
		return claims
	}
	return nil
}

// GetUserID retrieves the user ID from the context
func GetUserID(c echo.Context) string {
	if id, ok := c.Get(string(ClerkUserIDKey)).(string); ok {
		return id
	}
	return ""
}

// IsAuthenticated checks if the user is authenticated
func IsAuthenticated(c echo.Context) bool {
	return GetUserID(c) != ""
}
