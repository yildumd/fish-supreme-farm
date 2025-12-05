// src/app/cart/page.tsx - UPDATED VERSION
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const [orderNotes, setOrderNotes] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side to avoid hydration issues
  useState(() => {
    setIsClient(true);
  });

  const cartItems = state.items || [];
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = state.total || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        id: productId,
        quantity: newQuantity
      }
    });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: productId
    });
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      dispatch({
        type: 'CLEAR_CART'
      });
    }
  };

  const handleContactOrder = () => {
    const productList = cartItems.map(item => 
      `${item.name} - ${item.quantity} ${item.unit} - ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const message = `Order Inquiry from Fish Supreme Farm\n\nProducts:\n${productList}\n\nSubtotal: ${formatPrice(subtotal)}\n\nAdditional Notes: ${orderNotes || 'None'}`;
    
    // Redirect to contact page with order details
    window.location.href = `/contact?order=${encodeURIComponent(message)}`;
  };

  // Show loading state until client-side rendering is confirmed
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full"></div>
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart to get started.</p>
            <Link
              href="/products"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
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
              Your Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
            <p className="text-lg text-gray-600">
              Review your selected products and proceed to complete your order
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Selected Products ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Clear Cart</span>
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center overflow-hidden">
                            {item.image ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="96px"
                                />
                              </div>
                            ) : (
                              <span className="text-primary-600 font-semibold text-sm text-center px-1">
                                {item.name.split(' ')[0]}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-primary-600 font-semibold text-sm mt-1">
                                {formatPrice(item.price)} per {item.unit}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 font-medium">Quantity:</span>
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= item.minOrderQuantity}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                  aria-label="Decrease quantity"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="w-12 text-center font-semibold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                  aria-label="Increase quantity"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                              <span className="text-sm text-gray-600">
                                {item.unit}
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Minimum order: {item.minOrderQuantity} {item.unit}
                            </div>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 mb-2">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Item total
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Subtotal</span>
                    <span className="text-2xl font-bold text-primary-600">{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-6 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Any special requirements, delivery instructions, or questions about your order..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  We'll contact you within 24 hours to confirm your order details and delivery arrangements.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600">Calculated based on location</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-semibold text-gray-900 pt-4 border-t border-gray-200">
                    <span>Estimated Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="pt-4 space-y-3">
                    <button
                      onClick={handleContactOrder}
                      className="w-full bg-primary-600 text-white py-4 px-4 rounded-xl font-bold hover:bg-primary-700 transition-all duration-300 hover:shadow-lg text-center block text-lg"
                    >
                      Contact to Complete Order
                    </button>
                    
                    <Link
                      href="/products"
                      className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Order Benefits */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Fresh products guaranteed
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Nationwide delivery
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Bulk order discounts
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
                    <p>We accept bank transfers and cash on delivery</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mt-6 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call: +234 812 345 6789</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email: orders@fishsupremefarm.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Response time: Within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">Fresh products with quality assurance</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Nationwide delivery available</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Bank transfer & cash on delivery</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}