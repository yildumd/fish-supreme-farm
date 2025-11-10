'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function CartPage() {
  const { state, dispatch } = useCart();

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { productId, quantity } 
    });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  if (state.items.length === 0) {
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
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
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
              Shopping Cart
            </h1>
            <p className="text-lg text-gray-600">
              Review your items and proceed to checkout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cart Items ({state.itemCount})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                            <span className="text-primary-600 font-semibold text-sm text-center">
                              {item.product.name.split(' ')[0]}
                            </span>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.product.description}
                          </p>
                          <p className="text-primary-600 font-semibold">
                            {formatPrice(item.product.price)} per {item.product.unit}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-900 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900 mb-2">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-semibold text-gray-900 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Link
                      href="/checkout"
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center block"
                    >
                      Proceed to Checkout
                    </Link>
                    
                    <Link
                      href="/products"
                      className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  <div className="text-xs text-gray-500 text-center pt-4">
                    <p>Secure checkout powered by Paystack</p>
                  </div>
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