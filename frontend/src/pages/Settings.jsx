import React, { useState, useEffect } from 'react';
import { CogIcon, BellIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { businessAPI } from '../services/api';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await businessAPI.getSettings();
      setSettings(response.data.data.settings);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      await businessAPI.updateSettings(settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
        <span className="ml-3">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your application settings</p>
      </div>

      {/* Business Settings */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center">
            <CogIcon className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-medium">Business Settings</h3>
          </div>
        </div>
        <div className="card-body space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Invoice Prefix</label>
              <input
                type="text"
                className="form-input"
                value={settings?.business?.invoicePrefix || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  business: { ...settings.business, invoicePrefix: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="form-label">Default Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={settings?.business?.defaultTaxRate || 0}
                onChange={(e) => setSettings({
                  ...settings,
                  business: { ...settings.business, defaultTaxRate: parseFloat(e.target.value) }
                })}
              />
            </div>
            <div>
              <label className="form-label">Default Payment Terms (days)</label>
              <input
                type="number"
                className="form-input"
                value={settings?.business?.defaultPaymentTerms || 30}
                onChange={(e) => setSettings({
                  ...settings,
                  business: { ...settings.business, defaultPaymentTerms: parseInt(e.target.value) }
                })}
              />
            </div>
            <div>
              <label className="form-label">Currency</label>
              <select 
                className="form-input"
                value={settings?.business?.currency || 'OMR'}
                onChange={(e) => setSettings({
                  ...settings,
                  business: { ...settings.business, currency: e.target.value }
                })}
              >
                <option value="OMR">Omani Rial (OMR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center">
            <BellIcon className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-lg font-medium">Notifications</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Invoices</div>
                <div className="text-sm text-gray-500">Send invoices via email automatically</div>
              </div>
              <input
                type="checkbox"
                checked={settings?.notifications?.emailInvoices || false}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, emailInvoices: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Payment Reminders</div>
                <div className="text-sm text-gray-500">Send automatic payment reminders</div>
              </div>
              <input
                type="checkbox"
                checked={settings?.notifications?.emailReminders || false}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, emailReminders: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMS Notifications</div>
                <div className="text-sm text-gray-500">Receive SMS notifications for important events</div>
              </div>
              <input
                type="checkbox"
                checked={settings?.notifications?.smsNotifications || false}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, smsNotifications: e.target.checked }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Settings */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center">
            <CreditCardIcon className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-medium">Integrations</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <CreditCardIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Banking Integration</div>
                  <div className="text-sm text-gray-500">Connect your bank account for automatic reconciliation</div>
                </div>
              </div>
              <button className="btn-secondary">
                {settings?.integrations?.banking?.enabled ? 'Disconnect' : 'Connect'}
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <CogIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Accounting Software</div>
                  <div className="text-sm text-gray-500">Sync with popular accounting platforms</div>
                </div>
              </div>
              <button className="btn-secondary">
                {settings?.integrations?.accounting?.enabled ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={saveSettings}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
