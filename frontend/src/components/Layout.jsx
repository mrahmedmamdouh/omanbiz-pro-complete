import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  UserGroupIcon,
  CubeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  BuildingOfficeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: location.pathname === '/dashboard' },
    { name: 'Business', href: '/business', icon: BuildingOfficeIcon, current: location.pathname === '/business' },
    { name: 'Customers', href: '/customers', icon: UserGroupIcon, current: location.pathname === '/customers' },
    { name: 'Products', href: '/products', icon: CubeIcon, current: location.pathname === '/products' },
    { name: 'Invoices', href: '/invoices', icon: DocumentTextIcon, current: location.pathname === '/invoices' },
    { name: 'Reports', href: '/reports', icon: ChartBarIcon, current: location.pathname === '/reports' },
    { name: 'Settings', href: '/settings', icon: CogIcon, current: location.pathname === '/settings' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col ${mobile ? 'h-full' : 'h-screen'}`}>
      {/* Logo */}
      <div className="flex items-center h-16 px-6 bg-blue-600">
        <Link to="/dashboard" className="flex items-center">
          <BuildingOfficeIcon className="w-8 h-8 text-white" />
          <span className="ml-2 text-xl font-semibold text-white">OmanBiz Pro</span>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <UserIcon className="w-8 h-8 text-gray-400" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">
              {user?.profile?.firstName} {user?.profile?.lastName}
            </div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                item.current
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } group flex items-center px-3 py-2 text-sm font-medium rounded-l-md transition-colors`}
              onClick={() => mobile && setSidebarOpen(false)}
            >
              <Icon className="flex-shrink-0 w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
            <div className="absolute top-0 right-0 p-1 -mr-12">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden w-64 bg-white border-r border-gray-200 md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <Link to="/dashboard" className="flex items-center">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">OmanBiz Pro</span>
            </Link>
            <div className="w-6 h-6" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;