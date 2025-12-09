'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
              Featured
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-foreground hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted mt-1 line-clamp-2">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-secondary">${product.price.toFixed(2)}</span>
            <span className="text-sm text-muted ml-1">/ {product.weight}</span>
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className="bg-secondary text-white px-4 py-2 rounded text-sm font-medium hover:bg-secondary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
