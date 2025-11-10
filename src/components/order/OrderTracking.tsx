'use client';

import { useState } from 'react';

// Mock order data - in real app, this comes from your database
const mockOrders = {
  'FS2024-001': {
    id: 'FS2024-001',
    customerName: 'John Doe',
    products: ['Live Tilapia (50kg)', 'Smoked Catfish (25kg)'],
    status: 'shipped',
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-22',
    trackingNumber: 'TRK123456789',
    updates: [
      { date: '2024-01-15 10:30', status: 'ordered', description: 'Order placed and confirmed' },
      { date: '2024-01-16 14:20', status: 'processing', description: 'Order is being processed' },
      { date: '2024-01-18 09:15', status: 'shipped', description: 'Order has been shipped' },
    ]
  },
  'FS2024-002': {
    id: 'FS2024-002',
    customerName: 'Jane Smith',
    products: ['Fingerlings (1000 units)'],
    status: 'processing',
    orderDate: '2024-01-17',
    estimatedDelivery: '2024-01-25',
    trackingNumber: null,
    updates: [
      { date: '2024-01-17 11:45', status: 'ordered', description: 'Order placed and confirmed' },
      { date: '2024-01-18 08:30', status: 'processing', description: 'Order is being processed' },
    ]
  }
};

type OrderStatus = 'ordered' | 'processing' | 'shipped' | 'delivered';

interface OrderUpdate {
  date: string;
  status: OrderStatus;
  description: string;
}

interface Order {
  id: string;
  customerName: string;
  products: string[];
  status: OrderStatus;
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber: string | null;
  updates: OrderUpdate[];
}

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setOrder(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mockOrders[orderId as keyof typeof mockOrders]) {
      setOrder(mockOrders[orderId as keyof typeof mockOrders] as Order);
    } else {
      setError('Order not found. Please check your order ID and try again.');
    }
    setIsLoading(false);
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      ordered: 'bg-blue-100 text-blue-800',
      processing: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
    };
    return colors[status];
  };

  const getStatusText = (status: OrderStatus) => {
    const texts = {
      ordered: 'Order Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
    };
    return texts[status];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {/* Search Form */}
      <form onSubmit={handleTrackOrder} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            placeholder="Enter your order ID (e.g., FS2024-001)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Tracking...' : 'Track Order'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Order Details */}
      {order && (
        <div className="space-y-6">
          {/* Order Header */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order #{order.id}</h2>
                <p className="text-gray-600">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Products</h3>
            <ul className="space-y-2">
              {order.products.map((product, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {product}
                </li>
              ))}
            </ul>
          </div>

          {/* Tracking Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Information</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Estimated Delivery:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                {order.trackingNumber && (
                  <p><span className="font-medium">Tracking Number:</span> {order.trackingNumber}</p>
                )}
              </div>
            </div>

            {/* Order Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Updates</h3>
              <div className="space-y-4">
                {order.updates.map((update, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-3 h-3 rounded-full ${
                        update.status === 'ordered' ? 'bg-blue-500' :
                        update.status === 'processing' ? 'bg-yellow-500' :
                        update.status === 'shipped' ? 'bg-purple-500' : 'bg-green-500'
                      }`} />
                      {index < order.updates.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-gray-900">{update.description}</p>
                      <p className="text-sm text-gray-500">{new Date(update.date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <p className="text-sm text-gray-600">
              Need help with your order?{' '}
              <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}