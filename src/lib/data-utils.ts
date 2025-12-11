import { Product } from '@/types';
import productsData from '@/data/products.json';
import siteContent from '@/data/site-content.json';
import settings from '@/data/settings.json';

// Types for site content
export interface HeroContent {
  tagline: string;
  headline: string;
  description: string;
  primaryButton: { text: string; link: string };
  secondaryButton: { text: string; link: string };
  backgroundImage: string;
}

export interface TrustBadge {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  rating: number;
  text: string;
  author: string;
  location: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface SiteContent {
  hero: HeroContent;
  trustBadges: TrustBadge[];
  featuredSection: { title: string; description: string };
  categoriesSection: { title: string; description: string };
  whyChooseUs: { title: string; image: string; benefits: Benefit[] };
  howItWorks: { title: string; description: string; steps: Step[] };
  testimonials: { title: string; items: Testimonial[] };
  ctaSection: { title: string; description: string; buttonText: string; buttonLink: string };
  contactBanner: { title: string; subtitle: string; phone: string };
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contact: {
    phone1: string;
    phone1Label: string;
    phone2: string;
    phone2Label: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  social: { facebook: string };
  shipping: {
    freeShippingThreshold: number;
    flatRate: number;
    deliveryDays: string;
  };
  topBanner: {
    enabled: boolean;
    text: string;
    link: string;
  };
}

// Get all products
export function getProducts(): Product[] {
  return productsData.products as Product[];
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find(p => p.slug === slug);
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter(p => p.category === category);
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return getProducts().filter(p => p.featured);
}

// Get all categories
export function getCategories(): Category[] {
  return productsData.categories;
}

// Get site content
export function getSiteContent(): SiteContent {
  return siteContent as SiteContent;
}

// Get site settings
export function getSiteSettings(): SiteSettings {
  return settings as SiteSettings;
}

// For admin - these functions will be used client-side to manage state
// The actual data is stored in JSON files and would be persisted via API in a real setup

export function generateProductId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
