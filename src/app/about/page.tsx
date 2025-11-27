'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryImages = [
    {
      src: "/images/about/gallery-1.jpg",
      alt: "Fish Supreme Farm - Main Facility Overview"
    },
    {
      src: "/images/about/gallery-2.jpg", 
      alt: "Modern Fish Farming Ponds"
    },
    {
      src: "/images/about/gallery-3.jpg",
      alt: "Processing and Quality Control"
    },
    {
      src: "/images/about/gallery-4.jpg",
      alt: "Team and Operations"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-semibold mb-6">
              About Fish Supreme Farm
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Redefining Aquaculture
              <span className="block text-primary-600">Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From our sustainable farms in Plateau State to global markets, we're setting new standards 
              in Nigerian aquaculture through innovation, quality, and commitment.
            </p>
          </div>

          {/* Enhanced Our Story with Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-3 h-8 bg-primary-600 rounded-full mr-4"></div>
                <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              </div>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to revolutionize fish farming in Nigeria, Fish Supreme Integrated Farm 
                  began as a modest operation in Pankshin LGA and has blossomed into a premier aquaculture export hub.
                </p>
                <p>
                  Our journey is deeply rooted in the rich, fertile lands of Plateau State, where pristine water 
                  sources and an ideal climate create the perfect environment for raising supreme-quality fish.
                </p>
                <p>
                  Today, we operate a fully integrated system spanning from our main facility in Pankshin to our 
                  distribution center in Jos, serving clients across Nigeria and international markets with 
                  uncompromising quality and reliability.
                </p>
              </div>

              {/* Key Milestones */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { number: '10+', label: 'Years Experience' },
                  { number: '100K+', label: 'Fish Capacity' },
                  { number: '15+', label: 'Countries Served' },
                  { number: '500+', label: 'Happy Clients' }
                ].map((milestone, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{milestone.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{milestone.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Image Gallery */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Gallery Container */}
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                  ))}
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Slide Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentSlide + 1} / {galleryImages.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-3xl border border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-primary-900">Our Mission</h3>
              </div>
              <p className="text-primary-800 leading-relaxed text-lg">
                To provide premium, sustainable aquaculture products that meet international standards while 
                empowering local communities, promoting economic growth, and setting new benchmarks for 
                excellence in Nigerian aquaculture.
              </p>
            </div>
            <div className="bg-gradient-to-br from-aquatic-50 to-aquatic-100 p-8 rounded-3xl border border-aquatic-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-aquatic-600 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-aquatic-900">Our Vision</h3>
              </div>
              <p className="text-aquatic-800 leading-relaxed text-lg">
                To become Africa's leading aquaculture export hub, recognized globally for innovation, 
                sustainable practices, and unparalleled quality – transforming Nigerian aquaculture 
                into a world-class industry.
              </p>
            </div>
          </div>

          {/* Enhanced Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🏭</span>
                </div>
                <h3 className="text-2xl font-bold text-primary-600">Main Farm & Processing Facility</h3>
              </div>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start text-lg">
                  <svg className="w-6 h-6 text-primary-500 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    Mel, Jikon along Jiban-Quanpan Road<br />
                    Pankshin LGA, Plateau State<br />
                    Nigeria
                  </span>
                </p>
                <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-4 rounded-xl">
                  Our primary production facility featuring state-of-the-art hatcheries, grow-out ponds, 
                  and HACCP-certified processing units with advanced water management systems.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-aquatic-100 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🏪</span>
                </div>
                <h3 className="text-2xl font-bold text-aquatic-600">Sales & Distribution Office</h3>
              </div>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start text-lg">
                  <svg className="w-6 h-6 text-aquatic-500 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    Simdel Plaza, No. 8 Sylvester Davou Street<br />
                    Beside Wisdom Private School, Gura Topp<br />
                    Rayfield, Jos, Plateau State<br />
                    Nigeria
                  </span>
                </p>
                <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-4 rounded-xl">
                  Central distribution hub for nationwide delivery and international export coordination 
                  with modern cold storage facilities and logistics management.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Values Section */}
          <div className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-3xl p-12 mb-16 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at Fish Supreme Farm
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Quality Excellence',
                  description: 'Uncompromising commitment to premium quality at every stage of production, from hatchery to harvest',
                  icon: '⭐',
                  color: 'from-yellow-50 to-yellow-100',
                  border: 'border-yellow-200'
                },
                {
                  title: 'Sustainability',
                  description: 'Environmentally responsible farming practices ensuring long-term viability and ecological balance',
                  icon: '🌱',
                  color: 'from-green-50 to-green-100',
                  border: 'border-green-200'
                },
                {
                  title: 'Customer Focus',
                  description: 'Building lasting relationships through reliability, transparency, and exceptional service delivery',
                  icon: '🤝',
                  color: 'from-blue-50 to-blue-100',
                  border: 'border-blue-200'
                }
              ].map((value, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${value.color} border ${value.border} rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2`}
                >
                  <div className="text-5xl mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-primary-600 to-aquatic-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience Supreme Quality?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our growing family of satisfied clients and discover why Fish Supreme is the trusted choice for premium aquaculture products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Get In Touch
              </a>
              <a
                href="/products"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105"
              >
                View Products
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}