'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="section-padding bg-background">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container-custom py-4">
          <nav className="text-sm text-muted">
            <Link href="/" className="hover:text-secondary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-secondary">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.featured && (
                <span className="absolute top-4 left-4 bg-secondary text-white text-sm font-semibold px-3 py-1 rounded">
                  Featured
                </span>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-secondary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-muted">/ {product.weight}</span>
              </div>

              <p className="text-lg text-foreground mb-6 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Product Details */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-3">Product Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-secondary flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-border rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-primary flex-1 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="border-t border-border pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <div>
                      <p className="font-medium text-sm">Free Shipping</p>
                      <p className="text-xs text-muted">Orders over $199</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <div>
                      <p className="font-medium text-sm">USDA Inspected</p>
                      <p className="text-xs text-muted">Quality guaranteed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
                    </svg>
                    <div>
                      <p className="font-medium text-sm">Vacuum Sealed</p>
                      <p className="text-xs text-muted">Maximum freshness</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-sm">Ships Fast</p>
                      <p className="text-xs text-muted">2-3 day delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cooking Tips */}
      {(product.category === 'steaks' || product.category === 'roasts') && (
        <section className="py-12 bg-white border-t border-border">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-6">Cooking Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">Thawing</h3>
                <p className="text-muted text-sm">
                  For best results, thaw in the refrigerator for 24-48 hours. Never thaw at room temperature.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">Temperature</h3>
                <p className="text-muted text-sm">
                  Let meat come to room temperature (30 min) before cooking. Use a meat thermometer for perfect results.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">Resting</h3>
                <p className="text-muted text-sm">
                  Rest steaks 5-10 minutes after cooking, roasts 15-20 minutes. This allows juices to redistribute.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-background border-t border-border">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
