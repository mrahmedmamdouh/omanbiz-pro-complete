import React, { useState, useEffect } from 'react';
import { ChartBarIcon, DocumentTextIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { reportsAPI } from '../services/api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [salesReport, setSalesReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')
  });

  useEffect(() => {
    loadSalesReport();
  }, [dateRange]);

  const loadSalesReport = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getSalesReport(dateRange);
      setSalesReport(response.data.data);
    } catch (error) {
      console.error('Failed to load sales report:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'OMR',
      minimumFractionDigits: 3,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
        <span className="ml-3">Loading reports...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="page-title">Business Reports</h1>
        <p className="page-subtitle">View business analytics and generate reports</p>
      </div>

      {/* Date Filter */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">From:</label>
              <input
                type="date"
                className="form-input"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">To:</label>
              <input
                type="date"
                className="form-input"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              />
            </div>
            <button onClick={loadSalesReport} className="btn-primary">
              Update Report
            </button>
          </div>
        </div>
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <DocumentTextIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <div className="text-sm text-gray-500">Total Invoices</div>
                <div className="text-2xl font-bold">{salesReport?.report?.totalInvoices || 0}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(salesReport?.report?.totalAmount || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <div className="text-sm text-gray-500">Amount Paid</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(salesReport?.report?.totalPaid || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-yellow-600" />
              <div className="ml-3">
                <div className="text-sm text-gray-500">Avg Invoice</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(salesReport?.report?.avgInvoiceAmount || 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium">Recent Invoices</h3>
        </div>
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {salesReport?.invoices?.slice(0, 10).map((invoice) => (
                  <tr key={invoice.invoiceId}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.customerInfo?.name}</td>
                    <td>{new Date(invoice.issueDate).toLocaleDateString()}</td>
                    <td>{formatCurrency(invoice.total)}</td>
                    <td>{formatCurrency(invoice.paidAmount)}</td>
                    <td>
                      <span className={`status-badge ${
                        invoice.status === 'paid' ? 'status-success' :
                        invoice.status === 'sent' ? 'status-info' :
                        invoice.status === 'overdue' ? 'status-danger' :
                        'status-warning'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
