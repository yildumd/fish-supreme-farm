'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Updated products data focusing on catfish with correct pricing
const products = [
  {
    id: 'catfish-fingerlings',
    name: 'Catfish Fingerlings',
    category: 'fingerlings',
    description: 'Premium quality catfish fingerlings for fish farmers. Healthy, disease-resistant, and fast-growing with excellent survival rates.',
    features: ['Disease-resistant strains', 'Fast growth rate', 'High survival rate', 'Acclimated to local conditions', 'Vaccinated when required'],
    minOrder: '5,000 pieces',
    price: 25, // price per piece
    unit: 'piece',
    image: '/images/products/fingerlings.jpg',
    inStock: true,
    popular: true,
    delivery: '2-3 days'
  },
  {
    id: 'catfish-juveniles',
    name: 'Catfish Juveniles',
    category: 'juveniles',
    description: 'Healthy juvenile catfish ready for grow-out ponds. Perfect for expanding your fish farming operation with uniform sizing.',
    features: ['4-6 weeks old', 'Pond-acclimated', 'Vaccinated when required', 'Uniform size grading', 'Ready for grow-out'],
    minOrder: '1,000 pieces',
    price: 300, // price per piece
    unit: 'piece',
    image: '/images/products/juveniles.jpg',
    inStock: true,
    popular: false,
    delivery: '2-3 days'
  },
  {
    id: 'table-size-catfish',
    name: 'Table Size Catfish',
    category: 'table-size',
    description: 'Fresh, live catfish ready for market and consumption. Perfect for restaurants, hotels, and local markets across Nigeria.',
    features: ['300-500g average weight', 'Daily fresh harvest', 'Nationwide delivery', 'Competitive pricing', 'Freshness guaranteed'],
    minOrder: '50kg',
    price: 4000, // N4,000 per kg as specified
    unit: 'kg',
    image: '/images/products/table-size.jpg',
    inStock: true,
    popular: true,
    delivery: '1-2 days'
  },
  {
    id: 'smoked-catfish-mid-cuts',
    name: 'Smoked Catfish - Mid Cuts',
    category: 'smoked',
    description: 'Premium smoked catfish mid cuts. Traditionally smoked with modern hygiene standards for exceptional flavor and long shelf life.',
    features: ['Vacuum-packed', '6-month shelf life', 'Hygienic processing', 'Rich traditional flavor', 'Export ready packaging'],
    minOrder: '20kg',
    price: 15000, // N15,000 per kg as specified
    unit: 'kg',
    image: '/images/products/smoked-mid-cuts.jpg',
    inStock: true,
    popular: true,
    delivery: '3-5 days'
  },
  {
    id: 'smoked-catfish-whole',
    name: 'Smoked Catfish - Whole',
    category: 'smoked',
    description: 'Whole smoked catfish, perfect for export and premium markets. Maintains natural flavor and texture with artisanal smoking techniques.',
    features: ['Whole fish presentation', 'Export-grade quality', 'Traditional smoking', 'Premium packaging', 'International standards'],
    minOrder: '20kg',
    price: 15000, // N15,000 per kg as specified
    unit: 'kg',
    image: '/images/products/smoked-whole.jpg',
    inStock: true,
    popular: false,
    delivery: '3-5 days'
  },
  {
    id: 'catfish-export-grade',
    name: 'Export Grade Catfish',
    category: 'export',
    description: 'Premium catfish meeting international export standards. Processed and packaged for global markets with full traceability.',
    features: ['FDA & EU compliant', 'IQF processing', 'HACCP certified', 'Global shipping', 'Full traceability'],
    minOrder: '100kg',
    price: 18000, // Adjusted export price
    unit: 'kg',
    image: '/images/products/export-grade.jpg',
    inStock: true,
    popular: false,
    delivery: '5-7 days'
  }
];

export default function ProductsPage() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const handleInquire = (product: any) => {
    // Simple alert for now - you can replace this with a modal or direct contact form
    alert(`Thank you for your interest in ${product.name}!\n\nPrice: ${formatPrice(product.price)} per ${product.unit}\nMinimum Order: ${product.minOrder}\n\nWe'll contact you within 24 hours to discuss your order.`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculatePricePerUnit = (product: any) => {
    if (product.unit === 'piece') {
      return `${formatPrice(product.price)}/piece`;
    }
    return `${formatPrice(product.price)}/kg`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24">
        {/* Enhanced Hero Section with Background Image */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/products/hero-background.jpg"
              alt="Fish Supreme Farm - Premium Catfish Products"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/75 to-aquatic-600/80"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-700/20 to-primary-900/0"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-white text-sm font-semibold tracking-wide">Premium Aquaculture Products</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Supreme Catfish
              <span className="block text-aquatic-300 bg-gradient-to-r from-aquatic-300 to-green-300 bg-clip-text text-transparent">Products</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-white/95">
              From premium fingerlings to export-grade smoked products - delivering excellence at every stage of the aquaculture journey
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                href="#products"
                className="bg-white text-primary-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center space-x-3"
              >
                <span>Explore Products</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center space-x-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span>Bulk Order Inquiry</span>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-3"></div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-12 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '10,000+', label: 'Monthly Fingerlings' },
                { number: '50,000+', label: 'Annual Production' },
                { number: '15+', label: 'States Served' },
                { number: '98%', label: 'Customer Satisfaction' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-semibold mb-6">
                Our Product Portfolio
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Premium Catfish Selection
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our comprehensive range of catfish products, meticulously nurtured from hatchery to harvest with uncompromising quality standards
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="group bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-3"
                >
                  {/* Product Image */}
                  <div className="relative h-72 overflow-hidden">
                    {!imageErrors[product.id] ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={() => handleImageError(product.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-aquatic-100 flex items-center justify-center">
                        <div className="text-center text-primary-700">
                          <div className="text-4xl mb-3">🐟</div>
                          <p className="font-semibold text-lg">{product.name}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Popular Badge */}
                    {product.popular && (
                      <div className="absolute top-5 left-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>Best Seller</span>
                      </div>
                    )}
                    
                    {/* Price Badge */}
                    <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg border border-gray-200">
                      {calculatePricePerUnit(product)}
                    </div>

                    {/* Min Order Badge */}
                    <div className="absolute bottom-5 left-5 bg-black/80 text-white px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      📦 Min: {product.minOrder}
                    </div>

                    {/* Delivery Badge */}
                    <div className="absolute bottom-5 right-5 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      🚚 {product.delivery}
                    </div>
                  </div>
                  
                  {/* Product Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {product.description}
                    </p>
                    
                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                        <svg className="w-5 h-5 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        Product Features:
                      </h4>
                      <ul className="text-gray-600 space-y-3">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-base">
                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                      <div className="text-sm text-gray-500 font-medium">
                        📞 Contact for pricing
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/contact?product=${product.id}`}
                          className="bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-sm border border-gray-300"
                        >
                          Get Detailed Quote
                        </Link>
                        <button
                          onClick={() => handleInquire(product)}
                          className="bg-gradient-to-r from-primary-600 to-aquatic-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-aquatic-700 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>Quick Inquire</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Additional Info */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Certified</h3>
                <p className="text-gray-600 leading-relaxed">
                  All products meet stringent quality standards with regular health checks and quality assurance protocols.
                </p>
              </div>
              <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-aquatic-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-aquatic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nationwide Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reliable delivery network across Nigeria with specialized transport for live and processed products.
                </p>
              </div>
              <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Payment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Multiple payment options including bank transfer, with customized payment plans for bulk orders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Comparison Section */}
        <section className="py-20 bg-gradient-to-r from-primary-50 to-aquatic-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Competitive market pricing with volume-based discounts for wholesale buyers
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <span className="w-3 h-8 bg-primary-600 rounded-full mr-4"></span>
                    Live Catfish Products
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Table Size Catfish', price: 4000, unit: 'kg', desc: 'Fresh, live 300-500g fish' },
                      { name: 'Catfish Juveniles', price: 300, unit: 'piece', desc: '4-6 weeks old, pond-ready' },
                      { name: 'Catfish Fingerlings', price: 25, unit: 'piece', desc: 'Premium quality, disease-resistant' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                        <div>
                          <span className="font-semibold text-gray-900 text-lg">{item.name}</span>
                          <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                        </div>
                        <span className="text-2xl font-bold text-primary-600">{formatPrice(item.price)}/{item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <span className="w-3 h-8 bg-amber-600 rounded-full mr-4"></span>
                    Processed Catfish Products
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Smoked Catfish - Mid Cuts', price: 15000, unit: 'kg', desc: 'Vacuum-packed, 6-month shelf life' },
                      { name: 'Smoked Catfish - Whole', price: 15000, unit: 'kg', desc: 'Premium whole fish presentation' },
                      { name: 'Export Grade Catfish', price: 18000, unit: 'kg', desc: 'International standards, HACCP certified' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-6 bg-amber-50 rounded-2xl hover:bg-amber-100 transition-colors">
                        <div>
                          <span className="font-semibold text-gray-900 text-lg">{item.name}</span>
                          <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                        </div>
                        <span className="text-2xl font-bold text-amber-600">{formatPrice(item.price)}/{item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-12 pt-12 border-t border-gray-200">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
                  <p className="text-lg text-gray-700 mb-2">
                    🎉 <strong>Special bulk discounts available</strong> for orders exceeding minimum quantities
                  </p>
                  <p className="text-gray-600">
                    Contact us for customized pricing based on your order volume and delivery location
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-block bg-primary-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                >
                  Request Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-aquatic-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:40px_40px]"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Order Premium Catfish?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of satisfied customers across Nigeria who trust Fish Supreme Farm for consistent quality, reliable supply, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Contact Sales Team</span>
              </Link>
              <a
                href="tel:+2348123456789"
                className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call: +234 812 345 6789</span>
              </a>
            </div>
            <p className="text-white/70 mt-8 text-lg">
              📧 Email: orders@fishsupremefarm.com
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}