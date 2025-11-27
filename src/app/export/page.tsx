'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ExportPage() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-r from-blue-900 to-teal-800 text-white py-28 pt-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {!imageErrors['hero-background'] ? (
            <Image
              src="/images/export/hero-background.jpg"
              alt="Fish Supreme Farm International Export"
              fill
              className="object-cover"
              priority
              onError={() => handleImageError('hero-background')}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-900 to-teal-800"></div>
          )}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-white text-sm font-semibold tracking-wide">Global Export Solutions</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            International
            <span className="block text-teal-300 bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">Export</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-white/95">
            Premium Nigerian Catfish Products Meeting International Standards for Global Markets
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/contact?inquiry=export"
              className="bg-white text-blue-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl flex items-center space-x-3"
            >
              <span>Request Export Quote</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link
              href="#certifications"
              className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>View Certifications</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Countries Served' },
              { number: '500+', label: 'International Clients' },
              { number: '100%', label: 'Compliance Rate' },
              { number: '24/7', label: 'Export Support' }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Excellence Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Export-Grade Quality Assurance
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our premium catfish products undergo rigorous quality control processes to meet and exceed 
                international standards. From farm to port, we maintain the highest levels of 
                hygiene, traceability, and quality assurance for global markets.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '🏭',
                    title: 'HACCP Certified Facilities',
                    description: 'State-of-the-art processing plants with full HACCP implementation'
                  },
                  {
                    icon: '🔬',
                    title: 'Quality Control Labs',
                    description: 'In-house laboratories for comprehensive product testing'
                  },
                  {
                    icon: '📊',
                    title: 'Traceability Systems',
                    description: 'Complete farm-to-table traceability with digital documentation'
                  },
                  {
                    icon: '🌡️',
                    title: 'Cold Chain Management',
                    description: 'End-to-end temperature monitoring and control'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {!imageErrors['processing-facility'] ? (
                  <Image
                    src="/images/export/processing-facility.jpg"
                    alt="Modern fish processing facility for export"
                    fill
                    className="object-cover"
                    onError={() => handleImageError('processing-facility')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                    <div className="text-center text-blue-700">
                      <div className="text-6xl mb-4">🏭</div>
                      <p className="font-semibold text-lg">Export Processing Facility</p>
                      <p className="text-sm text-blue-600 mt-2">Modern HACCP certified facility</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-600/20 z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Streamlined Export Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our efficient export workflow ensures timely delivery and complete documentation 
              compliance for seamless international shipping of premium catfish products.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Process Steps */}
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Inquiry & Quotation',
                  description: 'Submit your requirements and receive a comprehensive quote within 24 hours'
                },
                {
                  step: '02',
                  title: 'Order Confirmation',
                  description: 'Confirm order details and provide necessary import documentation'
                },
                {
                  step: '03',
                  title: 'Processing & Certification',
                  description: 'Quality control, processing, and health certification issuance'
                },
                {
                  step: '04',
                  title: 'Packaging & Logistics',
                  description: 'Professional packaging and arrangement of international shipping'
                },
                {
                  step: '05',
                  title: 'Delivery & Support',
                  description: 'Real-time tracking and post-delivery support'
                }
              ].map((process, index) => (
                <div key={index} className="flex gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Visual */}
            <div className="sticky top-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="relative h-80 mb-6 rounded-xl overflow-hidden">
                  {!imageErrors['export-packaging'] ? (
                    <Image
                      src="/images/export/export-packaging.jpg"
                      alt="Professional export packaging for catfish products"
                      fill
                      className="object-cover"
                      onError={() => handleImageError('export-packaging')}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <p className="font-semibold text-blue-700">Export Packaging</p>
                        <p className="text-sm text-blue-600 mt-2">Vacuum-sealed for freshness</p>
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Efficient Supply Chain</h3>
                <p className="text-gray-600 mb-4">
                  Our integrated supply chain ensures your catfish products move seamlessly from our farms 
                  to your destination with minimal handling and maximum freshness preservation.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Average lead time: 7-14 days
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Real-time shipment tracking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Dedicated export manager
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Catfish Export Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carefully processed and packaged to maintain quality and freshness across global supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Smoked Catfish - Mid Cuts */}
            <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                {!imageErrors['smoked-catfish-mid-cuts'] ? (
                  <Image
                    src="/images/export/smoked-catfish-mid-cuts.jpg"
                    alt="Premium smoked catfish mid cuts for export"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={() => handleImageError('smoked-catfish-mid-cuts')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🐟</div>
                      <p className="font-semibold text-lg">Smoked Catfish</p>
                      <p className="text-amber-100 text-sm mt-2">Premium Mid Cuts - Export Grade</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                    🐟 Export Grade - Mid Cuts
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Smoked Catfish - Mid Cuts</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Packaging</div>
                    <div className="font-semibold text-gray-900">Vacuum Sealed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Shelf Life</div>
                    <div className="font-semibold text-gray-900">6 Months</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Min Order</div>
                    <div className="font-semibold text-gray-900">100kg</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Price</div>
                    <div className="font-semibold text-gray-900">₦15,000/kg</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Product Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Traditional smoking process for authentic flavor
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Blast frozen to preserve freshness and nutrients
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Consistent size and quality grading
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      FDA, EU, and HACCP certified
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact?inquiry=export&product=smoked-catfish-mid-cuts"
                  className="w-full bg-blue-600 text-white text-center py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg block"
                >
                  Request Mid Cuts Quote
                </Link>
              </div>
            </div>

            {/* Smoked Catfish - Whole */}
            <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                {!imageErrors['smoked-catfish-whole'] ? (
                  <Image
                    src="/images/export/smoked-catfish-whole.jpg"
                    alt="Premium whole smoked catfish for export"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={() => handleImageError('smoked-catfish-whole')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-amber-700 to-amber-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🐟</div>
                      <p className="font-semibold text-lg">Smoked Catfish</p>
                      <p className="text-amber-100 text-sm mt-2">Whole Fish - Export Grade</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                    🐟 Export Grade - Whole Fish
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Smoked Catfish - Whole</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Packaging</div>
                    <div className="font-semibold text-gray-900">Vacuum Sealed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Shelf Life</div>
                    <div className="font-semibold text-gray-900">6 Months</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Min Order</div>
                    <div className="font-semibold text-gray-900">100kg</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Price</div>
                    <div className="font-semibold text-gray-900">₦15,000/kg</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Product Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Premium whole fish presentation
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Artisanal smoking techniques
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Export-ready premium packaging
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      International standards compliance
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact?inquiry=export&product=smoked-catfish-whole"
                  className="w-full bg-blue-600 text-white text-center py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg block"
                >
                  Request Whole Fish Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Export Product - Table Size Catfish for Export */}
          <div className="max-w-2xl mx-auto">
            <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                {!imageErrors['table-size-catfish-export'] ? (
                  <Image
                    src="/images/export/table-size-catfish-export.jpg"
                    alt="Premium table size catfish for export"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={() => handleImageError('table-size-catfish-export')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🎯</div>
                      <p className="font-semibold text-lg">Table Size Catfish</p>
                      <p className="text-blue-100 text-sm mt-2">Fresh & Frozen - Export Grade</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                    🎯 Fresh & Frozen Options
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Table Size Catfish for Export</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Packaging</div>
                    <div className="font-semibold text-gray-900">IQF / Fresh Pack</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Shelf Life</div>
                    <div className="font-semibold text-gray-900">12 Months (Frozen)</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Min Order</div>
                    <div className="font-semibold text-gray-900">200kg</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Price</div>
                    <div className="font-semibold text-gray-900">₦18,000/kg</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Product Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Individually Quick Frozen (IQF) options
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Consistent 300-500g sizing
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      HACCP certified processing
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact?inquiry=export&product=table-size-catfish"
                  className="w-full bg-blue-600 text-white text-center py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg block"
                >
                  Request Fresh Catfish Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              International Certifications
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality is backed by internationally recognized certifications and standards.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'HACCP', description: 'Hazard Analysis Critical Control Points', icon: '📋' },
              { name: 'FDA', description: 'US Food and Drug Administration', icon: '🇺🇸' },
              { name: 'EU Standards', description: 'European Union Food Safety', icon: '🇪🇺' },
              { name: 'ISO 22000', description: 'Food Safety Management', icon: '🏆' }
            ].map((cert, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Markets Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Markets We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by importers and distributors in key international markets worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { country: 'United States', flag: '🇺🇸', status: 'FDA Compliant' },
              { country: 'United Kingdom', flag: '🇬🇧', status: 'EU Standards' },
              { country: 'European Union', flag: '🇪🇺', status: 'Full Compliance' },
              { country: 'United Arab Emirates', flag: '🇦🇪', status: 'Halal Certified' },
              { country: 'Canada', flag: '🇨🇦', status: 'CFIA Approved' },
              { country: 'China', flag: '🇨🇳', status: 'Customs Cleared' },
              { country: 'South Africa', flag: '🇿🇦', status: 'Regional Hub' },
              { country: 'Other Markets', flag: '🌍', status: 'Growing Presence' }
            ].map((market, index) => (
              <div key={index} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center">
                  <div className="text-4xl">{market.flag}</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">{market.country}</h3>
                  <p className="text-sm text-blue-600 font-medium">{market.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Export Premium Nigerian Catfish?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join international buyers worldwide who trust Fish Supreme Farm for consistent quality, 
            reliable supply chain, and full export compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact?inquiry=export"
              className="bg-white text-blue-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Get Export Quote</span>
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>View All Products</span>
            </Link>
          </div>
          <p className="text-white/70 mt-8 text-lg">
            📧 Email: export@fishsupremefarm.com
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}