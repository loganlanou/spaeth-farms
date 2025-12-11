'use client';

import { useState } from 'react';
import AdminWrapper from '@/components/admin/AdminWrapper';

// List of images from the public/images folder
const imageFiles = [
  'hero-cattle.jpg',
  'farm-scene.jpg',
  'farm-aerial.jpg',
  'farm-family.jpg',
  'logo.png',
  'logo.webp',
  'ribeye.jpg',
  'nystrip.jpg',
  'filet.jpg',
  'sirloin.jpg',
  'tbone.jpg',
  'chuck-roast.jpg',
  'prime-rib.jpg',
  'brisket.jpg',
  'rump-roast.jpg',
  'ground-beef.jpg',
  'ground-lean.jpg',
  'ground-bulk.jpg',
  'grill-bundle.jpg',
  'family-bundle.jpg',
  'quarter-beef.jpg',
  'short-ribs.jpg',
  'stew-meat.jpg',
  'liver.jpg',
  'bones.jpg',
  'flank.jpg',
  'category-steaks.jpg',
  'category-roasts.jpg',
  'category-ground.jpg',
  'category-bundles.jpg',
  'category-specialty.jpg',
  'hereford-bull-1.jpg',
  'hereford-show-1.jpg',
  'hereford-show-2.jpg',
  'hereford-show-3.jpg',
  'sydney-show-heifer-1.jpg',
  'sydney-show-heifer-2.jpg',
];

export default function ImagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredImages = imageFiles.filter(img =>
    img.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyPath = (filename: string) => {
    const path = `/spaeth-farms/images/${filename}`;
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminWrapper
      title="Image Library"
      description="Browse and manage your site images"
      actions={
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm">{filteredImages.length} images</span>
        </div>
      }
    >
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search images..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredImages.map((filename) => (
          <div
            key={filename}
            className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md ${
              selectedImage === filename ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setSelectedImage(filename)}
          >
            <div className="aspect-square bg-gray-100">
              <img
                src={`/spaeth-farms/images/${filename}`}
                alt={filename}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-600 truncate" title={filename}>
                {filename}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{selectedImage}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={`/spaeth-farms/images/${selectedImage}`}
                  alt={selectedImage}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`/spaeth-farms/images/${selectedImage}`}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-600"
                    />
                    <button
                      onClick={() => copyPath(selectedImage)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy Path
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Use this path when setting images for products, categories, or page content.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>Adding New Images:</strong> To add new images, upload them to the <code className="bg-blue-100 px-1 rounded">public/images/</code> folder in your project. Images will automatically appear here after rebuilding the site.
        </p>
      </div>
    </AdminWrapper>
  );
}
