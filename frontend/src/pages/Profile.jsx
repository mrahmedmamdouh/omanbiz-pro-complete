import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Manage your account settings</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium">Personal Information</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">First Name</label>
              <p className="text-gray-900">{user?.profile?.firstName}</p>
            </div>
            <div>
              <label className="form-label">Last Name</label>
              <p className="text-gray-900">{user?.profile?.lastName}</p>
            </div>
            <div>
              <label className="form-label">Email</label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="form-label">Phone</label>
              <p className="text-gray-900">{user?.profile?.phone}</p>
            </div>
            <div>
              <label className="form-label">Role</label>
              <span className="status-info">{user?.role}</span>
            </div>
            <div>
              <label className="form-label">Status</label>
              <span className={`status-badge ${
                user?.status === 'active' ? 'status-success' : 'status-warning'
              }`}>
                {user?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;