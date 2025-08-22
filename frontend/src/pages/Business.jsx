import React, { useState, useEffect } from 'react';
import { BuildingOfficeIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { businessAPI } from '../services/api';
import toast from 'react-hot-toast';

const Business = () => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness = async () => {
    try {
      setLoading(true);
      console.log('🏢 Loading business info...');
      const response = await businessAPI.getCurrent();
      console.log('✅ Business loaded:', response.data);
      setBusiness(response.data.data.business);
      setFormData(response.data.data.business);
    } catch (error) {
      console.error('❌ Failed to load business:', error);
      toast.error('Failed to load business information');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await businessAPI.update(formData);
      setBusiness(formData);
      setEditing(false);
      toast.success('Business information updated successfully');
    } catch (error) {
      toast.error('Failed to update business information');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
        <span className="ml-3">Loading business information...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Business Information</h1>
          <p className="page-subtitle">Manage your business details and settings</p>
        </div>
        {!editing ? (
          <button 
            onClick={() => setEditing(true)}
            className="btn-primary"
          >
            Edit Information
          </button>
        ) : (
          <div className="flex space-x-3">
            <button 
              onClick={() => { setEditing(false); setFormData(business); }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Business Overview Card */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center">
            <BuildingOfficeIcon className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-medium">Business Overview</h3>
          </div>
        </div>
        <div className="card-body">
          {!editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Business Name</label>
                <p className="text-gray-900 font-medium">{business?.businessName}</p>
              </div>
              <div>
                <label className="form-label">Business Name (Arabic)</label>
                <p className="text-gray-900 font-medium">{business?.businessNameAr || 'Not provided'}</p>
              </div>
              <div>
                <label className="form-label">Business Type</label>
                <p className="text-gray-900">{business?.businessType?.toUpperCase()}</p>
              </div>
              <div>
                <label className="form-label">Industry</label>
                <p className="text-gray-900 capitalize">{business?.industry}</p>
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Description</label>
                <p className="text-gray-900">{business?.description || 'No description provided'}</p>
              </div>
              <div>
                <label className="form-label">Established Date</label>
                <p className="text-gray-900">
                  {business?.establishedDate ? new Date(business.establishedDate).toLocaleDateString() : 'Not provided'}
                </p>
              </div>
              <div>
                <label className="form-label">Status</label>
                <span className={`status-badge ${business?.status === 'active' ? 'status-success' : 'status-warning'}`}>
                  {business?.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Business Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.businessName || ''}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Business Name (Arabic)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.businessNameAr || ''}
                  onChange={(e) => setFormData({...formData, businessNameAr: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Business Type</label>
                <select 
                  className="form-input"
                  value={formData.businessType || ''}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                >
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole_proprietorship">Sole Proprietorship</option>
                </select>
              </div>
              <div>
                <label className="form-label">Industry</label>
                <select 
                  className="form-input"
                  value={formData.industry || ''}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                >
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Description</label>
                <textarea
                  rows="3"
                  className="form-input"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center">
            <PhoneIcon className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-medium">Contact Information</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{business?.contact?.email}</div>
              </div>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{business?.contact?.phone}</div>
              </div>
            </div>
            <div className="flex items-start md:col-span-2">
              <MapPinIcon className="w-5 h-5 text-gray-400 mr-3 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-medium">
                  {business?.address?.street}<br />
                  {business?.address?.city}, {business?.address?.state}<br />
                  {business?.address?.country} {business?.address?.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Information */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium">Subscription Details</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500">Plan</div>
              <div className="font-medium capitalize">{business?.subscription?.plan}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <span className={`status-badge ${
                business?.subscription?.status === 'active' ? 'status-success' : 'status-warning'
              }`}>
                {business?.subscription?.status}
              </span>
            </div>
            <div>
              <div className="text-sm text-gray-500">Renewal Date</div>
              <div className="font-medium">
                {business?.subscription?.endDate ? 
                  new Date(business.subscription.endDate).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
