'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import AdminWrapper from '@/components/admin/AdminWrapper';
import { getProductBySlug, getCategories, generateSlug, Category } from '@/lib/data-utils';
import { Product } from '@/types';

export default function EditProductClient({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  const params = use(paramsPromise);
  const slug = params.slug;
  const isNew = slug === 'new';

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    slug: '',
    description: '',
    longDescription: '',
    price: 0,
    weight: '',
    category: 'steaks',
    image: '/spaeth-farms/images/',
    inStock: true,
    featured: false,
    details: [''],
  });

  useEffect(() => {
    setCategories(getCategories());

    if (!isNew) {
      const existingProduct = getProductBySlug(slug);
      if (existingProduct) {
        setProduct(existingProduct);
      }
    }
  }, [slug, isNew]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveMessage(isNew ? 'Product created successfully!' : 'Product updated successfully!');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const updateField = (field: keyof Product, value: Product[keyof Product]) => {
    setProduct({ ...product, [field]: value });

    // Auto-generate slug from name
    if (field === 'name' && isNew) {
      setProduct(prev => ({ ...prev, name: value as string, slug: generateSlug(value as string) }));
    }
  };

  const updateDetail = (index: number, value: string) => {
    const newDetails = [...(product.details || [])];
    newDetails[index] = value;
    setProduct({ ...product, details: newDetails });
  };

  const addDetail = () => {
    setProduct({ ...product, details: [...(product.details || []), ''] });
  };

  const removeDetail = (index: number) => {
    const newDetails = (product.details || []).filter((_, i) => i !== index);
    setProduct({ ...product, details: newDetails });
  };

  return (
    <AdminWrapper
      title={isNew ? 'Add New Product' : `Edit: ${product.name}`}
      description={isNew ? 'Create a new product for your catalog' : 'Update product details'}
      actions={
        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-green-600 text-sm font-medium">{saveMessage}</span>
          )}
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isNew ? 'Create Product' : 'Save Changes'}
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Ribeye Steak"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm mr-2">/products/</span>
                  <input
                    type="text"
                    value={product.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="ribeye-steak"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                <textarea
                  value={product.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Brief description for product cards..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                <textarea
                  value={product.longDescription}
                  onChange={(e) => updateField('longDescription', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Detailed product description for the product page..."
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight/Size</label>
                <input
                  type="text"
                  value={product.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 12 oz, per lb"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={product.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <button
                onClick={addDetail}
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Detail
              </button>
            </div>

            <div className="space-y-3">
              {(product.details || []).map((detail, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <input
                    type="text"
                    value={detail}
                    onChange={(e) => updateDetail(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., USDA inspected"
                  />
                  <button
                    onClick={() => removeDetail(index)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">In Stock</span>
                <button
                  onClick={() => updateField('inStock', !product.inStock)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    product.inStock ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      product.inStock ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Featured</span>
                <button
                  onClick={() => updateField('featured', !product.featured)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    product.featured ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      product.featured ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h3>

            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                {product.image && product.image !== '/spaeth-farms/images/' ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Path</label>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) => updateField('image', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="/spaeth-farms/images/product.jpg"
                />
              </div>

              <Link
                href="/admin/images"
                className="w-full block text-center px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Browse Images
              </Link>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="w-full block text-center px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors text-sm"
            >
              View Product Page
            </Link>
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
}
