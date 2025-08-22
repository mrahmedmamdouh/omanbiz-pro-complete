import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, EyeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { invoicesAPI } from '../services/api';
import toast from 'react-hot-toast';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      console.log('📄 Loading invoices...');
      const response = await invoicesAPI.getAll();
      console.log('✅ Invoices loaded:', response.data);
      setInvoices(response.data.data.invoices || []);
    } catch (error) {
      console.error('❌ Failed to load invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'OMR',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'status-success';
      case 'sent': return 'status-info';
      case 'draft': return 'status-warning';
      case 'overdue': return 'status-danger';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'status-info';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerInfo?.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
        <span className="ml-3">Loading invoices...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">Create and manage your invoices</p>
        </div>
        <button className="btn-primary">
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="text-sm text-gray-500">Total Invoices</div>
            <div className="text-2xl font-bold text-gray-900">{invoices.length}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="text-sm text-gray-500">Paid</div>
            <div className="text-2xl font-bold text-green-600">
              {invoices.filter(inv => inv.status === 'paid').length}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {invoices.filter(inv => inv.status === 'sent').length}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="text-sm text-gray-500">Total Value</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(invoices.reduce((sum, inv) => sum + (inv.total || 0), 0))}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="form-input w-48"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.invoiceId}>
                  <td>
                    <div className="font-medium">{invoice.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">#{invoice.invoiceId}</div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium">{invoice.customerInfo?.name}</div>
                      <div className="text-sm text-gray-500">{invoice.customerInfo?.company}</div>
                    </div>
                  </td>
                  <td>{formatDate(invoice.issueDate)}</td>
                  <td>{formatDate(invoice.dueDate)}</td>
                  <td>
                    <div>
                      <div className="font-medium">{formatCurrency(invoice.total)}</div>
                      {invoice.paidAmount > 0 && invoice.paidAmount < invoice.total && (
                        <div className="text-sm text-green-600">
                          {formatCurrency(invoice.paidAmount)} paid
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="View Invoice"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Download PDF"
                      >
                        <DocumentArrowDownIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchTerm || statusFilter ? 'No invoices found matching your criteria.' : 'No invoices found. Create your first invoice!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
