import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping Information | Spaeth Farms',
  description: 'Learn about our nationwide shipping process, delivery times, and how we ensure your beef arrives frozen and fresh.',
};

export default function ShippingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-foreground text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            We ship premium beef nationwide with careful attention to quality and freshness.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          {/* Shipping Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">How We Ship</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Vacuum Sealed</h3>
                <p className="text-sm text-muted">Every cut is individually vacuum-sealed to lock in freshness</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Insulated Coolers</h3>
                <p className="text-sm text-muted">Packed in thick styrofoam coolers with dry ice</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Expedited Shipping</h3>
                <p className="text-sm text-muted">2-3 day delivery via trusted carriers</p>
              </div>
            </div>
          </div>

          {/* Shipping Rates */}
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Shipping Rates</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-semibold text-green-800">Orders over $199</p>
                  <p className="text-sm text-green-700">Free shipping to the continental US</p>
                </div>
                <span className="text-2xl font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Orders under $199</p>
                  <p className="text-sm text-muted">Flat rate shipping</p>
                </div>
                <span className="text-2xl font-bold">$29.99</span>
              </div>
            </div>
          </div>

          {/* Delivery Times */}
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Delivery Times</h2>
            <div className="space-y-4">
              <p className="text-muted">
                Orders are processed Monday through Wednesday and typically ship within 1-2 business days. We intentionally avoid shipping late in the week to ensure your package doesn&apos;t sit in a warehouse over the weekend.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-1">Order Processing</p>
                  <p className="text-muted text-sm">1-2 business days</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-1">Transit Time</p>
                  <p className="text-muted text-sm">2-3 business days</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-1">Total Delivery</p>
                  <p className="text-muted text-sm">3-5 business days</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold mb-1">Tracking</p>
                  <p className="text-muted text-sm">Provided via email</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Area */}
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Delivery Area</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <p><strong>Contiguous United States:</strong> We ship to all 48 states in the continental US.</p>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p><strong>Alaska & Hawaii:</strong> Unfortunately, we cannot ship to these states due to extended transit times.</p>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p><strong>International:</strong> We do not currently offer international shipping.</p>
              </div>
            </div>
          </div>

          {/* Upon Arrival */}
          <div className="bg-white rounded-lg shadow-sm border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">What to Expect Upon Arrival</h2>
            <div className="space-y-4">
              <p className="text-muted">
                When your order arrives, you should:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                  <p><strong>Check the temperature:</strong> Beef should be frozen solid or cold to the touch (below 40°F).</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                  <p><strong>Store immediately:</strong> Place beef in your freezer right away for long-term storage, or refrigerate if cooking within 3-5 days.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                  <p><strong>Dispose of dry ice safely:</strong> Let any remaining dry ice sublimate in a well-ventilated area. Don&apos;t touch with bare hands.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</span>
                  <p><strong>Recycle packaging:</strong> Our cooler boxes can be recycled or reused.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Returns Policy */}
          <div id="returns" className="bg-white rounded-lg shadow-sm border border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Returns & Refund Policy</h2>
            <div className="space-y-4 text-muted">
              <p>
                Due to the perishable nature of our products, we cannot accept returns. However, your satisfaction is our top priority.
              </p>
              <p>
                <strong className="text-foreground">If there&apos;s an issue with your order:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact us within 7 days of delivery</li>
                <li>Provide your order number and photos of the issue</li>
                <li>We&apos;ll replace the affected items or issue a full refund</li>
              </ul>
              <p>
                <strong className="text-foreground">Common issues we cover:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Product arrived above safe temperature</li>
                <li>Damaged or torn packaging</li>
                <li>Missing items from your order</li>
                <li>Quality concerns with the beef</li>
              </ul>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-semibold">100% Satisfaction Guarantee</p>
                <p className="text-green-700 text-sm">If you&apos;re not completely satisfied, we&apos;ll make it right.</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-secondary text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About Shipping?</h2>
            <p className="text-white/90 mb-6">
              Our team is happy to help with any shipping questions or special delivery arrangements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:715-313-0075" className="inline-flex items-center justify-center gap-2 bg-white text-secondary px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                (715) 313-0075
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-secondary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
