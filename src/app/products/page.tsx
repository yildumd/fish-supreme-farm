'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';

// Updated products data with prices and IDs
const products = [
  {
    id: 'premium-fingerlings',
    name: 'Premium Fingerlings',
    category: 'fingerlings',
    description: 'High-quality Tilapia & Catfish fingerlings for fish farmers',
    features: ['Disease-resistant', 'Fast growth rate', 'High survival rate'],
    minOrder: '5,000 pieces',
    price: 25, // price per piece
    unit: 'piece',
    color: 'from-blue-500 to-blue-600',
    inStock: true
  },
  {
    id: 'juvenile-fish',
    name: 'Juvenile Fish',
    category: 'juveniles',
    description: 'Healthy juvenile fish ready for grow-out ponds',
    features: ['3-4 weeks old', 'Acclimated to pond conditions', 'Vaccinated when required'],
    minOrder: '1,000 pieces',
    price: 300, // price per piece
    unit: 'piece',
    color: 'from-green-500 to-green-600',
    inStock: true
  },
  {
    id: 'table-size-live-fish',
    name: 'Table-Size Live Fish',
    category: 'table-size',
    description: 'Fresh, live fish ready for market and consumption',
    features: ['300-500g average weight', 'Fresh daily harvest', 'Local and national delivery'],
    minOrder: '50kg',
    price: 1200, // price per kg
    unit: 'kg',
    color: 'from-emerald-500 to-emerald-600',
    inStock: true
  },
  {
    id: 'smoked-fish',
    name: 'Smoked Fish',
    category: 'smoked',
    description: 'Traditionally smoked fish with export-grade quality',
    features: ['Vacuum-packed', '6-month shelf life', 'FDA & EU compliant'],
    minOrder: '20kg',
    price: 2500, // price per kg
    unit: 'kg',
    color: 'from-amber-500 to-amber-600',
    inStock: true
  },
  {
    id: 'export-grade-catfish',
    name: 'Export-Grade Catfish',
    category: 'export',
    description: 'Premium catfish meeting international export standards',
    features: ['IQF processed', 'HACCP certified', 'Global shipping'],
    minOrder: '100kg',
    price: 3000, // price per kg
    unit: 'kg',
    color: 'from-purple-500 to-purple-600',
    inStock: true
  },
  {
    id: 'export-grade-tilapia',
    name: 'Export-Grade Tilapia',
    category: 'export',
    description: 'High-quality tilapia for international markets',
    features: ['Size-graded', 'FDA compliant', 'Cold chain logistics'],
    minOrder: '100kg',
    price: 2800, // price per kg
    unit: 'kg',
    color: 'from-cyan-500 to-cyan-600',
    inStock: true
  }
];

export default function ProductsPage() {
  const { dispatch, state } = useCart();

  const handleAddToCart = (product: any) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: `/images/products/${product.id}.jpg`, // You'll need to add these images
        category: product.category,
        unit: product.unit,
        inStock: product.inStock,
        minimumOrder: parseInt(product.minOrder) || 1
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-aquatic-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Premium Products</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              From fingerlings to export-grade products, we maintain supreme quality at every stage of production.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cart"
                className="bg-white text-primary-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                View Cart ({state.itemCount})
              </Link>
              <Link
                href="/store"
                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary-700 transition-all duration-300"
              >
                Quick Shop
              </Link>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Product Range</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our full range of aquaculture products, from starter fingerlings to premium export-grade fish
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 group"
                >
                  {/* Product Image Placeholder with Gradient */}
                  <div className={`h-48 bg-gradient-to-r ${product.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {product.minOrder}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {formatPrice(product.price)}/{product.unit}
                      </span>
                    </div>
                  </div>
                  
                  {/* Product Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 font-medium">Min. Order: {product.minOrder}</span>
                      <div className="flex gap-2">
                        <Link
                          href={`/contact?product=${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all duration-300"
                        >
                          Quote
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all duration-300 hover:shadow-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Ordering</h3>
                <p className="text-gray-600 text-sm">Add to cart and checkout securely</p>
              </div>
              <div className="text-center">
                <div className="bg-aquatic-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-aquatic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600 text-sm">Paystack secured transactions</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Tracking</h3>
                <p className="text-gray-600 text-sm">Track your order in real-time</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-aquatic-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Order?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Shop online with secure payments or contact us for bulk pricing and custom orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cart"
                className="bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                View Cart ({state.itemCount} items)
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105"
              >
                Bulk Orders & Export
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}