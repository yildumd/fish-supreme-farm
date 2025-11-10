'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  products: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  shippingAddress: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  notes?: string;
}

// Extended mock data with more orders
const mockOrders: Order[] = [
  {
    id: 'FS2024-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+2348012345678',
    products: [
      { name: 'Live Tilapia', quantity: 50, price: 1200 },
      { name: 'Smoked Catfish', quantity: 25, price: 2500 }
    ],
    totalAmount: 122500,
    status: 'shipped',
    orderDate: '2024-01-15T10:30:00',
    shippingAddress: '123 Main Street, Lagos Island, Lagos',
    estimatedDelivery: '2024-01-22',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'FS2024-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+2348098765432',
    products: [
      { name: 'Fingerlings', quantity: 1000, price: 25 }
    ],
    totalAmount: 25000,
    status: 'processing',
    orderDate: '2024-01-17T11:45:00',
    shippingAddress: '456 Victoria Island, Lagos',
    estimatedDelivery: '2024-01-25'
  },
  {
    id: 'FS2024-003',
    customerName: 'ABC Restaurant',
    customerEmail: 'orders@abcrestaurant.com',
    customerPhone: '+2348055512345',
    products: [
      { name: 'Live Tilapia', quantity: 100, price: 1200 },
      { name: 'Smoked Catfish', quantity: 50, price: 2500 },
      { name: 'Juvenile Fish', quantity: 200, price: 300 }
    ],
    totalAmount: 235000,
    status: 'confirmed',
    orderDate: '2024-01-18T09:15:00',
    shippingAddress: '789 Ikeja, Lagos'
  },
  {
    id: 'FS2024-004',
    customerName: 'Michael Johnson',
    customerEmail: 'michael@example.com',
    customerPhone: '+2348033344455',
    products: [
      { name: 'Smoked Catfish', quantity: 10, price: 2500 }
    ],
    totalAmount: 25000,
    status: 'pending',
    orderDate: '2024-01-19T14:20:00',
    shippingAddress: '321 Surulere, Lagos',
    notes: 'Customer requested weekend delivery'
  }
];

export default function AdminOrders() {
  const { logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const addTrackingNumber = (orderId: string, trackingNumber: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, trackingNumber, status: 'shipped' as OrderStatus } : order
    ));
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status];
  };

  const getStatusText = (status: OrderStatus) => {
    const texts = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return texts[status];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders
            </button>
            {(['pending', 'confirmed', 'processing', 'shipped', 'delivered'] as OrderStatus[]).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === status 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getStatusText(status)}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by order ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <button
              onClick={logout}
              className="hidden md:flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    <div className="text-sm text-gray-500">{order.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      View
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.id}</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Order Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                    <p><span className="font-medium">Phone:</span> {selectedOrder.customerPhone}</p>
                    <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h4>
                  <p className="text-sm text-gray-700">{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.products.map((product, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{product.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{product.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(product.price)}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(product.quantity * product.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Total:</td>
                        <td className="px-4 py-2 text-sm font-bold text-gray-900">{formatCurrency(selectedOrder.totalAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Status and Tracking */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Order Status</h4>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value as OrderStatus);
                      setSelectedOrder({ ...selectedOrder, status: e.target.value as OrderStatus });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Tracking Information</h4>
                  {selectedOrder.trackingNumber ? (
                    <div>
                      <p className="text-sm"><span className="font-medium">Tracking Number:</span> {selectedOrder.trackingNumber}</p>
                      {selectedOrder.estimatedDelivery && (
                        <p className="text-sm"><span className="font-medium">Estimated Delivery:</span> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter tracking number"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        id="tracking-input"
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById('tracking-input') as HTMLInputElement;
                          if (input.value) {
                            addTrackingNumber(selectedOrder.id, input.value);
                            setSelectedOrder({ ...selectedOrder, trackingNumber: input.value, status: 'shipped' });
                            input.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
                      >
                        Add Tracking
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Order Notes</h4>
                  <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}