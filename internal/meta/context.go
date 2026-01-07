package meta

import (
	"context"

	"spaeth-farms/internal/config"
	"spaeth-farms/internal/ctxkeys"
)

func SiteFromCtx(ctx context.Context) config.SiteConfig {
	if cfg, ok := ctx.Value(ctxkeys.SiteConfig).(config.SiteConfig); ok {
		return cfg
	}
	return config.SiteConfig{Name: "Spaeth Farms"}
}

func SiteNameFromCtx(ctx context.Context) string {
	return SiteFromCtx(ctx).Name
}

func SiteURLFromCtx(ctx context.Context) string {
	return SiteFromCtx(ctx).URL
}

func DefaultOGImageFromCtx(ctx context.Context) string {
	return SiteFromCtx(ctx).DefaultOGImage
}
