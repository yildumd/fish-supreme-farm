// src/app/products/page.tsx - IMPROVED VERSION
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';

// Updated products data with consistent structure
const products = [
  {
    id: 'catfish-fingerlings',
    name: 'Catfish Fingerlings',
    category: 'fingerlings',
    description: 'Premium quality catfish fingerlings for fish farmers. Healthy, disease-resistant, and fast-growing with excellent survival rates.',
    features: ['Disease-resistant strains', 'Fast growth rate', 'High survival rate', 'Acclimated to local conditions', 'Vaccinated when required'],
    minOrder: '5,000 pieces',
    minOrderQuantity: 5000,
    price: 25, // price per piece
    unit: 'piece',
    image: '/images/products/fingerlings.jpg',
    inStock: true,
    popular: true,
    delivery: '2-3 days',
    specifications: {
      size: '1-2 inches',
      grade: 'Premium A',
      shelfLife: 'Live product',
      packaging: 'Oxygenated bags'
    }
  },
  {
    id: 'catfish-juveniles',
    name: 'Catfish Juveniles',
    category: 'juveniles',
    description: 'Healthy juvenile catfish ready for grow-out ponds. Perfect for expanding your fish farming operation with uniform sizing.',
    features: ['4-6 weeks old', 'Pond-acclimated', 'Vaccinated when required', 'Uniform size grading', 'Ready for grow-out'],
    minOrder: '1,000 pieces',
    minOrderQuantity: 1000,
    price: 300, // price per piece
    unit: 'piece',
    image: '/images/products/juveniles.jpg',
    inStock: true,
    popular: false,
    delivery: '2-3 days',
    specifications: {
      size: '4-6 inches',
      grade: 'Premium A',
      shelfLife: 'Live product',
      packaging: 'Oxygenated bags'
    }
  },
  {
    id: 'table-size-catfish',
    name: 'Table Size Catfish',
    category: 'table-size',
    description: 'Fresh, live catfish ready for market and consumption. Perfect for restaurants, hotels, and local markets across Nigeria.',
    features: ['300-500g average weight', 'Daily fresh harvest', 'Nationwide delivery', 'Competitive pricing', 'Freshness guaranteed'],
    minOrder: '50kg',
    minOrderQuantity: 50,
    price: 4000, // N4,000 per kg as specified
    unit: 'kg',
    image: '/images/products/table-size.jpg',
    inStock: true,
    popular: true,
    delivery: '1-2 days',
    specifications: {
      size: '300-500g',
      grade: 'Grade A',
      shelfLife: 'Live product',
      packaging: 'Live fish containers'
    }
  },
  {
    id: 'smoked-catfish-mid-cuts',
    name: 'Smoked Catfish - Mid Cuts',
    category: 'smoked',
    description: 'Premium smoked catfish mid cuts. Traditionally smoked with modern hygiene standards for exceptional flavor and long shelf life.',
    features: ['Vacuum-packed', '6-month shelf life', 'Hygienic processing', 'Rich traditional flavor', 'Export ready packaging'],
    minOrder: '20kg',
    minOrderQuantity: 20,
    price: 15000, // N15,000 per kg as specified
    unit: 'kg',
    image: '/images/products/smoked-mid-cuts.jpg',
    inStock: true,
    popular: true,
    delivery: '3-5 days',
    specifications: {
      size: 'Mid cuts',
      grade: 'Export Grade',
      shelfLife: '6 months',
      packaging: 'Vacuum packs'
    }
  },
  {
    id: 'smoked-catfish-whole',
    name: 'Smoked Catfish - Whole',
    category: 'smoked',
    description: 'Whole smoked catfish, perfect for export and premium markets. Maintains natural flavor and texture with artisanal smoking techniques.',
    features: ['Whole fish presentation', 'Export-grade quality', 'Traditional smoking', 'Premium packaging', 'International standards'],
    minOrder: '20kg',
    minOrderQuantity: 20,
    price: 15000, // N15,000 per kg as specified
    unit: 'kg',
    image: '/images/products/smoked-whole.jpg',
    inStock: true,
    popular: false,
    delivery: '3-5 days',
    specifications: {
      size: 'Whole fish',
      grade: 'Export Grade',
      shelfLife: '6 months',
      packaging: 'Individual packs'
    }
  },
  {
    id: 'catfish-export-grade',
    name: 'Export Grade Catfish',
    category: 'export',
    description: 'Premium catfish meeting international export standards. Processed and packaged for global markets with full traceability.',
    features: ['FDA & EU compliant', 'IQF processing', 'HACCP certified', 'Global shipping', 'Full traceability'],
    minOrder: '100kg',
    minOrderQuantity: 100,
    price: 18000, // Adjusted export price
    unit: 'kg',
    image: '/images/products/export-grade.jpg',
    inStock: true,
    popular: false,
    delivery: '5-7 days',
    specifications: {
      size: 'Various cuts',
      grade: 'Export Grade',
      shelfLife: '12 months',
      packaging: 'International export packs'
    }
  }
];

export default function ProductsPage() {
  const { dispatch } = useCart();
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [addedProduct, setAddedProduct] = useState<string>('');

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const handleAddToCart = (product: typeof products[0]) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.minOrderQuantity,
      unit: product.unit,
      minOrderQuantity: product.minOrderQuantity,
      image: product.image
    };

    dispatch({ 
      type: 'ADD_ITEM', 
      payload: cartItem 
    });

    // Show success message
    setAddedProduct(product.name);
    setShowCartMessage(true);
    
    // Auto hide message after 3 seconds
    setTimeout(() => {
      setShowCartMessage(false);
    }, 3000);
  };

  const handleInquire = (product: typeof products[0]) => {
    const message = `I'm interested in ${product.name}\n\nMinimum Order: ${product.minOrder}\nPrice: ${formatPrice(product.price)} per ${product.unit}\n\nPlease send me more details.`;
    window.location.href = `/contact?message=${encodeURIComponent(message)}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculatePricePerUnit = (product: typeof products[0]) => {
    if (product.unit === 'piece') {
      return `${formatPrice(product.price)}/piece`;
    }
    return `${formatPrice(product.price)}/kg`;
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fingerlings', name: 'Fingerlings' },
    { id: 'juveniles', name: 'Juveniles' },
    { id: 'table-size', name: 'Table Size' },
    { id: 'smoked', name: 'Smoked Products' },
    { id: 'export', name: 'Export Grade' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Cart Success Message */}
      {showCartMessage && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{addedProduct} added to cart!</span>
          </div>
        </div>
      )}

      <div className="pt-24">
        {/* Hero Section - REMOVED BOUNCY SCROLL INDICATOR */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 to-aquatic-800">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-white text-sm font-semibold tracking-wide">Premium Aquaculture Products</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Premium Catfish
              <span className="block text-aquatic-300">Products</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed text-white/90">
              From premium fingerlings to export-grade smoked products - delivering excellence at every stage
            </p>
            <Link
              href="#products"
              className="inline-block bg-white text-primary-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Browse Products
            </Link>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="products" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative h-48">
                    {!imageErrors[product.id] ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(product.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center">
                        <div className="text-center text-primary-600">
                          <div className="text-3xl mb-2">🐟</div>
                          <p className="font-semibold">{product.name}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.popular && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Best Seller
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      {calculatePricePerUnit(product)}
                    </div>
                  </div>
                  
                  {/* Product Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {product.name}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Min: {product.minOrder}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Quick Features */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-2">
                        {product.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Specifications */}
                    <div className="mb-6 bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Specifications:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div><span className="font-medium">Size:</span> {product.specifications.size}</div>
                        <div><span className="font-medium">Grade:</span> {product.specifications.grade}</div>
                        <div><span className="font-medium">Shelf Life:</span> {product.specifications.shelfLife}</div>
                        <div><span className="font-medium">Packaging:</span> {product.specifications.packaging}</div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Add to Cart ({formatPrice(product.price * product.minOrderQuantity)})</span>
                      </button>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleInquire(product)}
                          className="w-full border border-primary-600 text-primary-600 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors text-sm"
                        >
                          Quick Inquiry
                        </button>
                        <Link
                          href={`/contact?product=${product.id}`}
                          className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm text-center"
                        >
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try selecting a different category</p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Show All Products
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Fish Supreme?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to delivering the highest quality catfish products with exceptional service
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Guaranteed</h3>
                <p className="text-gray-600">
                  Every product undergoes strict quality checks to ensure premium standards
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
                <p className="text-gray-600">
                  Nationwide delivery with specialized transport for live and processed fish
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Ordering</h3>
                <p className="text-gray-600">
                  Safe and secure ordering process with multiple payment options
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Our aquaculture experts are ready to help you select the right products for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Contact Our Team
              </Link>
              <a
                href="tel:+2348123456789"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary-700 transition-colors"
              >
                Call Now: +234 812 345 6789
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}