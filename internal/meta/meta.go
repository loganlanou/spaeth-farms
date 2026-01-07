package meta

import "fmt"

type PageMeta struct {
	Title       string
	Description string
	OGType      string
	OGImage     string
	Canonical   string
	NoIndex     bool
}

func New(title, description string) PageMeta {
	return PageMeta{
		Title:       title,
		Description: description,
		OGType:      "website",
	}
}

func (m PageMeta) WithOGImage(url string) PageMeta {
	m.OGImage = url
	return m
}

func (m PageMeta) WithCanonical(url string) PageMeta {
	m.Canonical = url
	return m
}

func (m PageMeta) AsArticle() PageMeta {
	m.OGType = "article"
	return m
}

func (m PageMeta) AsProduct() PageMeta {
	m.OGType = "product"
	return m
}

func (m PageMeta) WithNoIndex() PageMeta {
	m.NoIndex = true
	return m
}

// ForProduct creates meta for a product page
func ForProduct(name, description string, priceCents int64, image string) PageMeta {
	priceStr := fmt.Sprintf("$%.2f", float64(priceCents)/100)
	desc := fmt.Sprintf("%s - %s | Shop premium Wisconsin beef at Spaeth Farms", name, priceStr)
	if description != "" {
		desc = description
	}
	return PageMeta{
		Title:       name,
		Description: desc,
		OGType:      "product",
		OGImage:     image,
	}
}
