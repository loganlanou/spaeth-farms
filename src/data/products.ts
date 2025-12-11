import { Product } from '@/types';
import productsData from './products.json';

// Export products from JSON
export const products: Product[] = productsData.products as Product[];

export const categories = productsData.categories;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}
