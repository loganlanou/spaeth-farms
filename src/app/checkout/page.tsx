'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    saveInfo: false,
    deliveryInstructions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shippingThreshold = 199;
  const shippingCost = subtotal >= shippingThreshold ? 0 : 29.99;
  const tax = subtotal * 0.055; // 5.5% tax estimate
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setOrderComplete(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="section-padding bg-background">
        <div className="container-custom text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 mx-auto text-gray-300 mb-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted mb-6">Add some products before checking out.</p>
          <Link href="/products" className="btn-primary">
            Shop Our Beef
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="section-padding bg-background">
        <div className="container-custom max-w-2xl text-center">
          <div className="bg-white p-12 rounded-lg shadow-sm border border-border">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted mb-6">
              Thank you for your order! You&apos;ll receive a confirmation email shortly with tracking information once your order ships.
            </p>
            <div className="bg-background p-6 rounded-lg mb-8">
              <p className="text-sm text-muted mb-2">Your order will be packed with care and shipped with dry ice to ensure it arrives frozen and fresh.</p>
              <p className="font-semibold text-secondary">Expected delivery: 2-3 business days</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/" className="btn-outline">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-foreground text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                  <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="(555) 555-5555"
                      />
                      <p className="text-xs text-muted mt-1">In case we need to contact you about your order</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                  <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">Street Address *</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div>
                      <label htmlFor="apartment" className="block text-sm font-medium mb-1">Apartment, Suite, etc.</label>
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="city" className="block text-sm font-medium mb-1">City *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-1">State *</label>
                        <select
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
                        >
                          <option value="">Select</option>
                          {US_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code *</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="deliveryInstructions" className="block text-sm font-medium mb-1">Delivery Instructions</label>
                      <textarea
                        id="deliveryInstructions"
                        name="deliveryInstructions"
                        rows={3}
                        value={formData.deliveryInstructions}
                        onChange={handleInputChange}
                        className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Leave at door, ring doorbell, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Notice */}
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-yellow-800">Payment Information</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        This is a demo checkout. In production, you would integrate with a payment processor like Stripe, Square, or PayPal to securely collect payment information.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Complete Order - $${total.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Items */}
                <ul className="divide-y divide-border mb-6">
                  {items.map((item) => (
                    <li key={item.product.id} className="py-4 flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                        <p className="text-xs text-muted">Qty: {item.quantity}</p>
                        <p className="font-semibold text-sm mt-1">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <span className="font-semibold text-sm">Shipping Details</span>
                  </div>
                  <p className="text-xs text-muted">
                    Orders are packed with dry ice in insulated coolers and shipped via expedited delivery (2-3 business days). Your beef will arrive frozen and ready to store.
                  </p>
                </div>

                {/* Guarantee */}
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span className="font-semibold text-sm">100% Satisfaction Guarantee</span>
                  </div>
                  <p className="text-xs text-green-700">
                    If you&apos;re not completely satisfied with your order, contact us and we&apos;ll make it right.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
