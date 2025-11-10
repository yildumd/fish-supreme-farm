'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const handleFlutterwavePayment = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);

    // Generate a unique transaction reference
    const transactionRef = `FS${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    // Prepare payment data for Flutterwave
    const paymentData = {
      tx_ref: transactionRef,
      amount: state.total,
      currency: 'NGN',
      payment_options: 'card, banktransfer, ussd',
      customer: {
        email: customerInfo.email,
        phone_number: customerInfo.phone,
        name: `${customerInfo.firstName} ${customerInfo.lastName}`
      },
      customizations: {
        title: 'Fish Supreme Integrated Farm',
        description: 'Payment for fish products',
        logo: '/logo-transparent.png'
      },
      meta: {
        customer_id: customerInfo.email,
        order_items: state.items.map(item => ({
          product: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        }))
      }
    };

    // In a real implementation, you would:
    // 1. Send paymentData to your backend
    // 2. Get Flutterwave public key from environment variables
    // 3. Initialize Flutterwave payment

    // For now, we'll simulate a successful payment
    setTimeout(() => {
      setIsProcessing(false);
      
      // Create order object
      const order = {
        id: transactionRef,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        products: state.items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: state.total,
        status: 'processing' as const,
        orderDate: new Date().toISOString(),
        shippingAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state}, ${customerInfo.country}`,
        notes: customerInfo.notes
      };

      // Save order to localStorage (in real app, send to backend)
      const existingOrders = JSON.parse(localStorage.getItem('fishSupremeOrders') || '[]');
      localStorage.setItem('fishSupremeOrders', JSON.stringify([...existingOrders, order]));

      // Clear cart
      dispatch({ type: 'CLEAR_CART' });

      // Redirect to order confirmation
      router.push(`/order-confirmation?orderId=${transactionRef}`);
    }, 2000);
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state'];
    for (const field of required) {
      if (!customerInfo[field as keyof typeof customerInfo]) {
        alert(`Please fill in the ${field} field`);
        return false;
      }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    // Basic phone validation (Nigerian format)
    const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
    if (!phoneRegex.test(customerInfo.phone.replace(/\s/g, ''))) {
      alert('Please enter a valid Nigerian phone number');
      return false;
    }

    return true;
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Items to Checkout</h1>
            <p className="text-gray-600 mb-8">Your cart is empty. Add some products to proceed with checkout.</p>
            <button
              onClick={() => router.push('/products')}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Checkout
            </h1>
            <p className="text-lg text-gray-600">
              Complete your order with secure payment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Customer Information
              </h2>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., 08012345678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={customerInfo.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Any special delivery instructions or notes..."
                  />
                </div>
              </form>
            </div>

            {/* Order Summary & Payment */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} × {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Calculated after order</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex items-center h-5">
                      <input
                        type="radio"
                        name="payment-method"
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        checked
                        readOnly
                      />
                    </div>
                    <div className="ml-3 flex items-center">
                      <img 
                        src="https://flutterwave.com/images/logo/full.svg" 
                        alt="Flutterwave" 
                        className="h-6 mr-2"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        Flutterwave (Cards, Bank Transfer, USSD)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleFlutterwavePayment}
                    disabled={isProcessing}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      `Pay ${formatPrice(state.total)}`
                    )}
                  </button>

                  <button
                    onClick={() => router.push('/cart')}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back to Cart
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>Your payment is secured and encrypted by Flutterwave</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}