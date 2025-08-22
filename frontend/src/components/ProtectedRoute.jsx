import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute check:', {
    isAuthenticated,
    isLoading,
    user: user ? `${user.profile?.firstName} ${user.profile?.lastName}` : null,
    path: location.pathname,
    requiredPermissions
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
        <span className="ml-3">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For testing, make permissions very permissive
  if (requiredPermissions.length > 0 && user) {
    // If user is business_owner or admin, allow everything
    if (user.role === 'business_owner' || user.role === 'admin') {
      console.log('✅ Access granted (business owner/admin)');
      return children;
    }
    
    // Check specific permissions
    const hasPermission = requiredPermissions.every(permission =>
      user.permissions?.includes(permission)
    );
    
    if (!hasPermission) {
      console.log('❌ Insufficient permissions:', {
        required: requiredPermissions,
        userPermissions: user.permissions,
        userRole: user.role
      });
      return <Navigate to="/unauthorized" replace />;
    }
  }

  console.log('✅ Access granted');
  return children;
};

export default ProtectedRoute;
