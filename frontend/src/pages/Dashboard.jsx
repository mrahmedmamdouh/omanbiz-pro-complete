import React, { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  CubeIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dashboardAPI } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, activityRes, chartRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentActivity(),
        dashboardAPI.getChartData('revenue', '6months')
      ]);

      setStats(statsRes.data.data.stats);
      setRecentActivity(activityRes.data.data.activity);
      setChartData(chartRes.data.data.chartData || []);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'OMR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const StatCard = ({ title, value, icon: Icon, change, color = 'blue' }) => (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-md bg-${color}-50`}>
              <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-center">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {change && (
                  <div className={`ml-2 flex items-center text-sm ${
                    change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {change > 0 ? (
                      <ArrowUpIcon className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(change)}%
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={stats?.customers?.total || 0}
          icon={UserGroupIcon}
          change={stats?.customers?.growth}
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={stats?.products?.total || 0}
          icon={CubeIcon}
          color="green"
        />
        <StatCard
          title="Total Invoices"
          value={stats?.invoices?.total || 0}
          icon={DocumentTextIcon}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats?.revenue?.total || 0)}
          icon={BanknotesIcon}
          color="yellow"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Monthly Revenue</h3>
          </div>
          <div className="card-body">
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(stats?.revenue?.monthly || 0)}
            </div>
            <p className="text-sm text-gray-600 mt-1">This month</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Pending Invoices</h3>
          </div>
          <div className="card-body">
            <div className="text-3xl font-bold text-orange-600">
              {stats?.invoices?.pending || 0}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {formatCurrency(stats?.invoices?.pendingAmount || 0)} total
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Low Stock Items</h3>
          </div>
          <div className="card-body">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-red-600">
                {stats?.products?.lowStock || 0}
              </div>
              {stats?.products?.lowStock > 0 && (
                <ExclamationTriangleIcon className="w-6 h-6 text-red-500 ml-2" />
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">Need attention</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
            <p className="text-sm text-gray-500">Last 6 months</p>
          </div>
          <div className="card-body">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="period" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const [year, month] = value.split('-');
                      return `${month}/${year.slice(2)}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Revenue']}
                    labelFormatter={(value) => {
                      const [year, month] = value.split('-');
                      const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
                      return `${monthName} ${year}`;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Invoice Status Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Invoice Status</h3>
          </div>
          <div className="card-body">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Paid', value: stats?.invoices?.total - stats?.invoices?.pending || 0, color: '#10b981' },
                      { name: 'Pending', value: stats?.invoices?.pending || 0, color: '#f59e0b' },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Recent Invoices</h3>
          </div>
          <div className="card-body">
            {recentActivity?.recentInvoices?.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.recentInvoices.slice(0, 5).map((invoice) => (
                  <div key={invoice._id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {invoice.customerId?.name || 'Unknown Customer'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(invoice.total)}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                        invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {invoice.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent invoices</p>
            )}
          </div>
        </div>

        {/* Recent Customers */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Recent Customers</h3>
          </div>
          <div className="card-body">
            {recentActivity?.recentCustomers?.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.recentCustomers.slice(0, 5).map((customer) => (
                  <div key={customer._id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {customer.email || customer.company}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent customers</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;