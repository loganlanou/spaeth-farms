'use client';

import { useState, useEffect } from 'react';
import AdminWrapper from '@/components/admin/AdminWrapper';
import { getSiteContent, SiteContent } from '@/lib/data-utils';

type TabId = 'hero' | 'badges' | 'featured' | 'why-choose' | 'how-it-works' | 'testimonials' | 'cta';

const tabs: { id: TabId; label: string }[] = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'badges', label: 'Trust Badges' },
  { id: 'featured', label: 'Featured Products' },
  { id: 'why-choose', label: 'Why Choose Us' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'cta', label: 'CTA Section' },
];

export default function HomePageEditor() {
  const [activeTab, setActiveTab] = useState<TabId>('hero');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setContent(getSiteContent());
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // In a real app, this would save to an API
    // For now, we'll just simulate a save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveMessage('Changes saved successfully!');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!content) {
    return (
      <AdminWrapper title="Home Page Editor" description="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper
      title="Home Page Editor"
      description="Customize your home page content and layout"
      actions={
        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-green-600 text-sm font-medium">{saveMessage}</span>
          )}
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
                Save Changes
              </>
            )}
          </button>
        </div>
      }
    >
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'hero' && (
          <HeroEditor content={content} setContent={setContent} />
        )}
        {activeTab === 'badges' && (
          <BadgesEditor content={content} setContent={setContent} />
        )}
        {activeTab === 'featured' && (
          <FeaturedEditor content={content} setContent={setContent} />
        )}
        {activeTab === 'why-choose' && (
          <WhyChooseEditor content={content} setContent={setContent} />
        )}
        {activeTab === 'how-it-works' && (
          <HowItWorksEditor content={content} setContent={setContent} />
        )}
        {activeTab === 'testimonials' && (
          <TestimonialsEditor content={content} setContent={setContent} />
        )}
        {activeTab === 'cta' && (
          <CTAEditor content={content} setContent={setContent} />
        )}
      </div>
    </AdminWrapper>
  );
}

// Hero Editor Component
function HeroEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const updateHero = (field: string, value: string) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value,
      },
    });
  };

  const updateButton = (buttonType: 'primaryButton' | 'secondaryButton', field: string, value: string) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [buttonType]: {
          ...content.hero[buttonType],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
        <input
          type="text"
          value={content.hero.tagline}
          onChange={(e) => updateHero('tagline', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
        <input
          type="text"
          value={content.hero.headline}
          onChange={(e) => updateHero('headline', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={content.hero.description}
          onChange={(e) => updateHero('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
        <div className="flex gap-4 items-start">
          <input
            type="text"
            value={content.hero.backgroundImage}
            onChange={(e) => updateHero('backgroundImage', e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={content.hero.backgroundImage}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">Primary Button</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <input
                type="text"
                value={content.hero.primaryButton.text}
                onChange={(e) => updateButton('primaryButton', 'text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input
                type="text"
                value={content.hero.primaryButton.link}
                onChange={(e) => updateButton('primaryButton', 'link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">Secondary Button</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <input
                type="text"
                value={content.hero.secondaryButton.text}
                onChange={(e) => updateButton('secondaryButton', 'text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input
                type="text"
                value={content.hero.secondaryButton.link}
                onChange={(e) => updateButton('secondaryButton', 'link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Trust Badges Editor
function BadgesEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const updateBadge = (index: number, field: string, value: string) => {
    const newBadges = [...content.trustBadges];
    newBadges[index] = { ...newBadges[index], [field]: value };
    setContent({ ...content, trustBadges: newBadges });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Trust Badges</h3>
      <p className="text-gray-500">Edit the trust badges displayed below the hero section.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.trustBadges.map((badge, index) => (
          <div key={badge.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select
                  value={badge.icon}
                  onChange={(e) => updateBadge(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="truck">Truck</option>
                  <option value="heart">Heart</option>
                  <option value="shield">Shield</option>
                  <option value="home">Home</option>
                  <option value="star">Star</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={badge.title}
                  onChange={(e) => updateBadge(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={badge.subtitle}
                  onChange={(e) => updateBadge(index, 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Featured Products Editor
function FeaturedEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Featured Products Section</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={content.featuredSection.title}
          onChange={(e) => setContent({
            ...content,
            featuredSection: { ...content.featuredSection, title: e.target.value }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
        <textarea
          value={content.featuredSection.description}
          onChange={(e) => setContent({
            ...content,
            featuredSection: { ...content.featuredSection, description: e.target.value }
          })}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> To change which products appear in the featured section, go to the Products page and toggle the "Featured" status on individual products.
        </p>
      </div>
    </div>
  );
}

// Why Choose Us Editor
function WhyChooseEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const updateBenefit = (index: number, field: string, value: string) => {
    const newBenefits = [...content.whyChooseUs.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setContent({
      ...content,
      whyChooseUs: { ...content.whyChooseUs, benefits: newBenefits }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Why Choose Us Section</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={content.whyChooseUs.title}
          onChange={(e) => setContent({
            ...content,
            whyChooseUs: { ...content.whyChooseUs, title: e.target.value }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
        <div className="flex gap-4 items-start">
          <input
            type="text"
            value={content.whyChooseUs.image}
            onChange={(e) => setContent({
              ...content,
              whyChooseUs: { ...content.whyChooseUs, image: e.target.value }
            })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={content.whyChooseUs.image}
              alt="Section image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <h4 className="font-medium text-gray-900 mt-6">Benefits</h4>
      <div className="space-y-4">
        {content.whyChooseUs.benefits.map((benefit, index) => (
          <div key={benefit.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select
                  value={benefit.icon}
                  onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="sun">Sun (Pasture)</option>
                  <option value="beaker">Beaker (Science)</option>
                  <option value="gift">Gift (Package)</option>
                  <option value="location">Location (Map)</option>
                  <option value="heart">Heart</option>
                  <option value="star">Star</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={benefit.title}
                  onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={benefit.description}
                onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// How It Works Editor
function HowItWorksEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = [...content.howItWorks.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setContent({
      ...content,
      howItWorks: { ...content.howItWorks, steps: newSteps }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">How It Works Section</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={content.howItWorks.title}
          onChange={(e) => setContent({
            ...content,
            howItWorks: { ...content.howItWorks, title: e.target.value }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
        <textarea
          value={content.howItWorks.description}
          onChange={(e) => setContent({
            ...content,
            howItWorks: { ...content.howItWorks, description: e.target.value }
          })}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <h4 className="font-medium text-gray-900 mt-6">Steps</h4>
      <div className="space-y-4">
        {content.howItWorks.steps.map((step, index) => (
          <div key={step.id} className="p-4 bg-gray-50 rounded-lg flex gap-4">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Testimonials Editor
function TestimonialsEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Testimonials Section</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={content.testimonials.title}
          onChange={(e) => setContent({
            ...content,
            testimonials: { ...content.testimonials, title: e.target.value }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> To add, edit, or remove testimonials, go to the dedicated Testimonials page from the sidebar.
        </p>
      </div>

      <h4 className="font-medium text-gray-900 mt-4">Current Testimonials Preview</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {content.testimonials.items.map((testimonial) => (
          <div key={testimonial.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm italic mb-2">&quot;{testimonial.text.substring(0, 80)}...&quot;</p>
            <p className="text-gray-900 text-sm font-medium">{testimonial.author}</p>
            <p className="text-gray-500 text-xs">{testimonial.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// CTA Editor
function CTAEditor({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Call to Action Section</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={content.ctaSection.title}
          onChange={(e) => setContent({
            ...content,
            ctaSection: { ...content.ctaSection, title: e.target.value }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={content.ctaSection.description}
          onChange={(e) => setContent({
            ...content,
            ctaSection: { ...content.ctaSection, description: e.target.value }
          })}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
          <input
            type="text"
            value={content.ctaSection.buttonText}
            onChange={(e) => setContent({
              ...content,
              ctaSection: { ...content.ctaSection, buttonText: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
          <input
            type="text"
            value={content.ctaSection.buttonLink}
            onChange={(e) => setContent({
              ...content,
              ctaSection: { ...content.ctaSection, buttonLink: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <h4 className="font-medium text-gray-900 mt-6">Contact Banner</h4>
      <div className="p-4 bg-gray-50 rounded-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={content.contactBanner.title}
            onChange={(e) => setContent({
              ...content,
              contactBanner: { ...content.contactBanner, title: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            value={content.contactBanner.subtitle}
            onChange={(e) => setContent({
              ...content,
              contactBanner: { ...content.contactBanner, subtitle: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            value={content.contactBanner.phone}
            onChange={(e) => setContent({
              ...content,
              contactBanner: { ...content.contactBanner, phone: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
