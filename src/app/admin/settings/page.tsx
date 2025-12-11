'use client';

import { useState, useEffect } from 'react';
import AdminWrapper from '@/components/admin/AdminWrapper';
import { getSiteSettings, SiteSettings } from '@/lib/data-utils';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'shipping' | 'banner'>('general');

  useEffect(() => {
    setSettings(getSiteSettings());
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaveMessage('Settings saved successfully!');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!settings) {
    return (
      <AdminWrapper title="Settings" description="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper
      title="Site Settings"
      description="Configure your site settings and preferences"
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
          <nav className="flex">
            {[
              { id: 'general', label: 'General' },
              { id: 'contact', label: 'Contact Info' },
              { id: 'shipping', label: 'Shipping' },
              { id: 'banner', label: 'Top Banner' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
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
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
              <input
                type="text"
                value={settings.social.facebook}
                onChange={(e) => setSettings({
                  ...settings,
                  social: { ...settings.social, facebook: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <h4 className="font-medium text-gray-900">Primary Contact</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={settings.contact.phone1Label}
                    onChange={(e) => setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone1Label: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={settings.contact.phone1}
                    onChange={(e) => setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone1: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                <h4 className="font-medium text-gray-900">Secondary Contact</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={settings.contact.phone2Label}
                    onChange={(e) => setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone2Label: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={settings.contact.phone2}
                    onChange={(e) => setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone2: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.contact.email}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <h4 className="font-medium text-gray-900">Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                  <input
                    type="text"
                    value={settings.contact.address.street}
                    onChange={(e) => setSettings({
                      ...settings,
                      contact: {
                        ...settings.contact,
                        address: { ...settings.contact.address, street: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={settings.contact.address.city}
                    onChange={(e) => setSettings({
                      ...settings,
                      contact: {
                        ...settings.contact,
                        address: { ...settings.contact.address, city: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={settings.contact.address.state}
                      onChange={(e) => setSettings({
                        ...settings,
                        contact: {
                          ...settings.contact,
                          address: { ...settings.contact.address, state: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                    <input
                      type="text"
                      value={settings.contact.address.zip}
                      onChange={(e) => setSettings({
                        ...settings,
                        contact: {
                          ...settings.contact,
                          address: { ...settings.contact.address, zip: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Shipping Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold ($)</label>
                <input
                  type="number"
                  value={settings.shipping.freeShippingThreshold}
                  onChange={(e) => setSettings({
                    ...settings,
                    shipping: { ...settings.shipping, freeShippingThreshold: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Orders over this amount get free shipping</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flat Rate ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.shipping.flatRate}
                  onChange={(e) => setSettings({
                    ...settings,
                    shipping: { ...settings.shipping, flatRate: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Shipping cost for orders under threshold</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                <input
                  type="text"
                  value={settings.shipping.deliveryDays}
                  onChange={(e) => setSettings({
                    ...settings,
                    shipping: { ...settings.shipping, deliveryDays: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 2-3"
                />
                <p className="text-sm text-gray-500 mt-1">Estimated business days</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'banner' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Banner</h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Enable Banner</p>
                <p className="text-sm text-gray-500">Show promotional banner at the top of the site</p>
              </div>
              <button
                onClick={() => setSettings({
                  ...settings,
                  topBanner: { ...settings.topBanner, enabled: !settings.topBanner.enabled }
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.topBanner.enabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.topBanner.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banner Text</label>
              <input
                type="text"
                value={settings.topBanner.text}
                onChange={(e) => setSettings({
                  ...settings,
                  topBanner: { ...settings.topBanner, text: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Free Shipping on Orders Over $199"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link (optional)</label>
              <input
                type="text"
                value={settings.topBanner.link}
                onChange={(e) => setSettings({
                  ...settings,
                  topBanner: { ...settings.topBanner, link: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., /shipping"
              />
            </div>

            {settings.topBanner.enabled && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Preview</h4>
                <div className="bg-green-700 text-white text-center py-2 rounded-lg">
                  <p className="text-sm font-medium">{settings.topBanner.text}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminWrapper>
  );
}
