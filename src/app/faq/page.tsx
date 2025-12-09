'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: 'Ordering',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'Simply browse our products, add items to your cart, and proceed to checkout. We accept all major credit cards. Once your order is placed, you\'ll receive a confirmation email with your order details.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Visa, Mastercard, American Express, Discover, and PayPal. All transactions are secured with industry-standard encryption.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'Orders can be modified or cancelled within 2 hours of placement. After that, we begin processing and packaging. Please contact us immediately at (715) 313-0075 if you need to make changes.'
      },
      {
        question: 'Do you offer bulk or wholesale pricing?',
        answer: 'Yes! We offer special pricing for bulk orders and wholesale customers. Contact us directly to discuss your needs and get a custom quote.'
      }
    ]
  },
  {
    category: 'Shipping',
    questions: [
      {
        question: 'Do you ship nationwide?',
        answer: 'Yes, we ship to all 48 contiguous United States. Unfortunately, we cannot currently ship to Alaska, Hawaii, or international destinations due to the perishable nature of our products.'
      },
      {
        question: 'How is the beef shipped?',
        answer: 'All orders are packed in insulated coolers with dry ice to ensure your beef stays frozen during transit. We ship via expedited carriers (2-3 day delivery) and orders typically ship Monday through Wednesday to avoid weekend delays.'
      },
      {
        question: 'How much does shipping cost?',
        answer: 'Shipping is FREE on all orders over $199. For orders under $199, shipping is a flat rate of $29.99 to cover the cost of insulated packaging and expedited delivery.'
      },
      {
        question: 'What if my order arrives thawed?',
        answer: 'Your beef should arrive frozen or cold to the touch. If your order arrives above refrigerator temperature, contact us immediately with photos and we\'ll send a replacement at no charge.'
      }
    ]
  },
  {
    category: 'Products',
    questions: [
      {
        question: 'Is your beef USDA inspected?',
        answer: 'Yes, all of our beef is processed at USDA-inspected facilities. This ensures the highest standards of food safety and quality.'
      },
      {
        question: 'Do you use hormones or antibiotics?',
        answer: 'No, we never use growth hormones or routine antibiotics. Our cattle are raised naturally on pasture with supplemental grain finishing for optimal marbling.'
      },
      {
        question: 'What does "dry-aged" mean?',
        answer: 'Dry-aging is a process where beef is stored in a controlled environment for 21+ days. This allows natural enzymes to tenderize the meat and concentrate flavors, resulting in a more tender and flavorful steak.'
      },
      {
        question: 'How long can I store frozen beef?',
        answer: 'When kept continuously frozen at 0°F or below, our vacuum-sealed beef maintains optimal quality for 6-12 months. For best results, use within 6 months of purchase.'
      }
    ]
  },
  {
    category: 'About the Farm',
    questions: [
      {
        question: 'Where is Spaeth Farms located?',
        answer: 'We\'re located in Wisconsin, where our family has been raising cattle for generations. The rolling hills and lush pastures of Wisconsin provide an ideal environment for raising healthy, happy cattle.'
      },
      {
        question: 'Can I visit the farm?',
        answer: 'We welcome visitors by appointment! Contact us to schedule a farm tour and see firsthand how we raise our cattle. It\'s a great way to connect with where your food comes from.'
      },
      {
        question: 'How are your cattle raised?',
        answer: 'Our cattle are pasture-raised on our family farm, with access to open grazing land, clean water, and high-quality feed. We practice rotational grazing for both animal welfare and land sustainability.'
      }
    ]
  },
  {
    category: 'Returns & Satisfaction',
    questions: [
      {
        question: 'What is your satisfaction guarantee?',
        answer: 'We stand behind every cut we sell. If you\'re not completely satisfied with the quality of your beef, contact us within 7 days of delivery and we\'ll make it right with a replacement or refund.'
      },
      {
        question: 'How do I report an issue with my order?',
        answer: 'Contact us at (715) 313-0075 or email info@spaethfarms.com. Please include your order number and photos if applicable. We respond to all inquiries within 24 hours.'
      },
      {
        question: 'Do you accept returns?',
        answer: 'Due to the perishable nature of our products, we cannot accept returns. However, if there\'s any issue with quality or your order arrives damaged, we\'ll replace it or issue a full refund.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Header */}
      <section className="bg-foreground text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Find answers to common questions about our products, ordering, shipping, and more.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-10">
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const id = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openItems.includes(id);

                  return (
                    <div key={id} className="bg-white rounded-lg border border-border overflow-hidden">
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold pr-4">{faq.question}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-muted leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
            We&apos;re here to help. Reach out and we&apos;ll get back to you as soon as possible.
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
      </section>
    </>
  );
}
