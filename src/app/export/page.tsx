'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ExportPage() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white py-24 pt-32">
        <div className="absolute inset-0 overflow-hidden">
          {!imageErrors['hero-background'] ? (
            <Image
              src="/images/export/hero-background.jpg"
              alt="Fish Supreme Farm International Export"
              fill
              className="object-cover opacity-30"
              priority
              onError={() => handleImageError('hero-background')}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900"></div>
          )}
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium tracking-wide">Premium Export Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Global <span className="text-teal-300">Catfish</span> Export
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed text-white/90">
            Premium Nigerian catfish products meeting international standards for markets worldwide
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?inquiry=export"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <span>Get Export Quote</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link
              href="#products"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - More Compact */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '50+', label: 'Countries Served', color: 'text-blue-600' },
              { number: '500+', label: 'Global Clients', color: 'text-teal-600' },
              { number: '100%', label: 'Compliance', color: 'text-green-600' },
              { number: '24/7', label: 'Support', color: 'text-purple-600' }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Quality & Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Export Excellence & Process
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From farm to global markets, we maintain the highest standards in quality, processing, and logistics
            </p>
          </div>

          {/* Grid with Video and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Video Column */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl">
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster="/images/export/video-poster.jpg"
                    controls
                    playsInline
                  >
                    <source src="/videos/export-process.mp4" type="video/mp4" />
                    <source src="/videos/export-process.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video overlay */}
                  <div className="absolute bottom-4 left-4">
                    <button
                      onClick={handlePlayVideo}
                      className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm hover:bg-white transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play Facility Tour
                    </button>
                  </div>
                </div>
                
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Export Facility Tour</h3>
                  <p className="text-gray-600 mb-4">
                    See our HACCP-certified processing facility and quality control procedures in action
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">HACCP Process</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Quality Control</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">Packaging</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Column */}
            <div className="space-y-6">
              {[
                {
                  icon: '🏭',
                  title: 'Certified Facilities',
                  description: 'HACCP-certified processing plants meeting international standards',
                  color: 'bg-blue-50 text-blue-600'
                },
                {
                  icon: '🔬',
                  title: 'Quality Labs',
                  description: 'In-house laboratories for comprehensive product testing',
                  color: 'bg-green-50 text-green-600'
                },
                {
                  icon: '📦',
                  title: 'Export Packaging',
                  description: 'Vacuum-sealed packaging for maximum freshness preservation',
                  color: 'bg-amber-50 text-amber-600'
                },
                {
                  icon: '🌡️',
                  title: 'Cold Chain',
                  description: 'End-to-end temperature monitoring and control',
                  color: 'bg-purple-50 text-purple-600'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-xl`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Export Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: '1', title: 'Inquiry', desc: 'Submit requirements' },
                { step: '2', title: 'Quote', desc: 'Receive detailed quote' },
                { step: '3', title: 'Process', desc: 'Quality processing' },
                { step: '4', title: 'Package', desc: 'Export packaging' },
                { step: '5', title: 'Ship', desc: 'International delivery' }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center font-bold text-blue-600 mx-auto mb-3">
                      {process.step}
                    </div>
                    {index < 4 && (
                      <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-blue-300 -z-10"></div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{process.title}</h4>
                  <p className="text-sm text-gray-600">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Export Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Export Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carefully processed and packaged for international markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product 1 - Smoked Catfish Mid Cuts */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {!imageErrors['smoked-catfish-mid-cuts'] ? (
                  <Image
                    src="/images/export/smoked-catfish-mid-cuts.jpg"
                    alt="Smoked Catfish Mid Cuts"
                    fill
                    className="object-cover"
                    onError={() => handleImageError('smoked-catfish-mid-cuts')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">🐟</div>
                      <p className="font-semibold">Smoked Catfish</p>
                      <p className="text-amber-100 text-xs">Mid Cuts</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smoked Catfish - Mid Cuts</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Packaging</div>
                    <div className="font-semibold text-gray-900">Vacuum Sealed</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Min Order</div>
                    <div className="font-semibold text-gray-900">100kg</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Features:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Traditional smoking process
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      FDA & HACCP certified
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="text-xl font-bold text-blue-600">₦15,000/kg</div>
                  </div>
                  <Link
                    href="/contact?inquiry=export&product=smoked-catfish-mid-cuts"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2 - Smoked Catfish Whole */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {!imageErrors['smoked-catfish-whole'] ? (
                  <Image
                    src="/images/export/smoked-catfish-whole.jpg"
                    alt="Whole Smoked Catfish"
                    fill
                    className="object-cover"
                    onError={() => handleImageError('smoked-catfish-whole')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">🐟</div>
                      <p className="font-semibold">Smoked Catfish</p>
                      <p className="text-amber-100 text-xs">Whole Fish</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smoked Catfish - Whole</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Packaging</div>
                    <div className="font-semibold text-gray-900">Vacuum Sealed</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Shelf Life</div>
                    <div className="font-semibold text-gray-900">6 Months</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Features:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Premium whole fish presentation
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Artisanal smoking techniques
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="text-xl font-bold text-blue-600">₦15,000/kg</div>
                  </div>
                  <Link
                    href="/contact?inquiry=export&product=smoked-catfish-whole"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 - Table Size Catfish */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {!imageErrors['table-size-catfish-export'] ? (
                  <Image
                    src="/images/export/table-size-catfish-export.jpg"
                    alt="Table Size Catfish"
                    fill
                    className="object-cover"
                    onError={() => handleImageError('table-size-catfish-export')}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="font-semibold">Fresh Catfish</p>
                      <p className="text-blue-100 text-xs">Table Size</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    Fresh & Frozen
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fresh Catfish - Table Size</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Packaging</div>
                    <div className="font-semibold text-gray-900">IQF / Fresh</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Min Order</div>
                    <div className="font-semibold text-gray-900">200kg</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Features:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Individually Quick Frozen (IQF)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      300-500g consistent sizing
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="text-xl font-bold text-blue-600">₦18,000/kg</div>
                  </div>
                  <Link
                    href="/contact?inquiry=export&product=table-size-catfish"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Markets */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">International Certifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'HACCP Certified', icon: '📋', color: 'bg-blue-50 border-blue-200' },
                  { name: 'FDA Compliant', icon: '🇺🇸', color: 'bg-green-50 border-green-200' },
                  { name: 'EU Standards', icon: '🇪🇺', color: 'bg-purple-50 border-purple-200' },
                  { name: 'Halal Certified', icon: '☪️', color: 'bg-amber-50 border-amber-200' }
                ].map((cert, index) => (
                  <div key={index} className={`${cert.color} border rounded-lg p-4 text-center`}>
                    <div className="text-2xl mb-2">{cert.icon}</div>
                    <div className="font-medium text-gray-900">{cert.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Markets */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Global Markets</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { country: 'USA', flag: '🇺🇸' },
                  { country: 'UK', flag: '🇬🇧' },
                  { country: 'UAE', flag: '🇦🇪' },
                  { country: 'Canada', flag: '🇨🇦' },
                  { country: 'China', flag: '🇨🇳' },
                  { country: 'EU', flag: '🇪🇺' },
                  { country: 'South Africa', flag: '🇿🇦' },
                  { country: 'Ghana', flag: '🇬🇭' }
                ].map((market, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors">
                    <div className="text-xl mb-1">{market.flag}</div>
                    <div className="text-sm font-medium text-gray-900">{market.country}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Export Premium Catfish?
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join international buyers who trust Fish Supreme Farm for quality, reliability, and compliance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?inquiry=export"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Get Export Quote
            </Link>
            
            <a
              href="mailto:export@fishsupremefarm.com"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-5.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80">
              📧 export@fishsupremefarm.com | 📞 +234 805 262 4236
            </p>
            <p className="text-white/60 text-sm mt-2">
              Monday - Friday: 8AM - 6PM WAT | Saturday: 9AM - 1PM WAT
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}