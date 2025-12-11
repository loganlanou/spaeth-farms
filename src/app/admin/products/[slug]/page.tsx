import { getProducts } from '@/lib/data-utils';
import EditProductClient from './EditProductClient';

// Generate static params for all product slugs + 'new'
export function generateStaticParams() {
  const products = getProducts();
  return [
    { slug: 'new' },
    ...products.map((product) => ({
      slug: product.slug,
    })),
  ];
}

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return <EditProductClient paramsPromise={params} />;
}
