import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section with Better Mobile Responsiveness */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        {/* Background Image with Lighter Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero-background.jpg"
            alt="Fish Supreme Farm - Premium Aquaculture"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Lighter gradient overlay to show more background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-primary-800/50 to-aquatic-600/60"></div>
          {/* Reduced radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-700/15 to-primary-900/0"></div>
          {/* Additional light overlay for better text readability */}
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="max-w-4xl mx-auto px-2">
            {/* Enhanced Badge with better contrast */}
            <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/25 backdrop-blur-sm border border-white/35 mb-6 sm:mb-8 shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-lg">Nigeria's Premier Aquaculture Export Hub</span>
            </div>
            
            {/* Enhanced Main Heading with better mobile sizing */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
              <span className="block drop-shadow-2xl">Fish Supreme</span>
              <span className="block text-aquatic-200 bg-gradient-to-r from-aquatic-200 to-green-200 bg-clip-text text-transparent drop-shadow-2xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Farm
              </span>
            </h1>
            
            {/* Enhanced Subheading with better mobile sizing */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-2xl px-2">
              Premium Aquaculture Excellence from Plateau State to Global Markets
            </p>
            
            {/* Enhanced Description */}
            <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-2xl px-2">
              Sustainable fish farming, export-grade products, and reliable supply chain solutions for domestic and international markets.
            </p>
            
            {/* Enhanced CTA Buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-2">
              <Link
                href="/products"
                className="group bg-white text-primary-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 sm:space-x-3 shadow-2xl backdrop-blur-sm w-full sm:w-auto"
              >
                <span>Explore Our Products</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105 shadow-2xl backdrop-blur-sm bg-white/10 w-full sm:w-auto flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span>Get Export Quote</span>
              </Link>
            </div>

            {/* Enhanced Trust Metrics - 2 columns on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto px-2">
              {[
                { number: '10+', label: 'Years Experience', icon: '🏆' },
                { number: '500+', label: 'Global Clients', icon: '🌍' },
                { number: '50K+', label: 'Monthly Production', icon: '🐟' },
                { number: '15+', label: 'Countries Served', icon: '🚢' },
              ].map((metric, index) => (
                <div key={index} className="text-center bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/30 shadow-2xl">
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2 drop-shadow-lg">{metric.icon}</div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 drop-shadow-2xl">{metric.number}</div>
                  <div className="text-white/90 text-xs sm:text-sm font-medium drop-shadow-lg leading-tight">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Trust Bar */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Trusted by Global Partners</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Meeting international standards with premium quality and reliable delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { 
                icon: '🛡️', 
                title: 'FDA & EU Compliant', 
                description: 'Full compliance with international food safety standards' 
              },
              { 
                icon: '📊', 
                title: 'HACCP Certified', 
                description: 'Rigorous quality control and hazard analysis' 
              },
              { 
                icon: '🚚', 
                title: 'Global Logistics', 
                description: 'Cold chain delivery to 15+ countries worldwide' 
              },
              { 
                icon: '⭐', 
                title: 'Premium Quality', 
                description: 'Consistently exceeding customer expectations' 
              },
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:border-primary-200 group hover:-translate-y-1 sm:hover:-translate-y-2"
              >
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Products Showcase with Better Mobile Layout */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Our Premium Products</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              From fingerlings to export-grade products, we maintain supreme quality at every stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Premium Fingerlings',
                description: 'High-quality Tilapia & Catfish fingerlings with excellent growth rates and disease resistance',
                features: ['Fast growth rate', 'Disease resistant', 'High survival rate'],
                minOrder: '5,000 pieces',
                image: '/images/home/fingerlings-product.jpg',
                color: 'from-blue-500 to-blue-600'
              },
              {
                name: 'Table-Size Live Fish',
                description: 'Fresh, healthy live fish ready for local markets and restaurants across Nigeria',
                features: ['300-500g average', 'Daily harvest', 'Nationwide delivery'],
                minOrder: '50kg',
                image: '/images/home/live-fish-product.jpg',
                color: 'from-green-500 to-green-600'
              },
              {
                name: 'Export-Grade Smoked Fish',
                description: 'Premium smoked catfish and tilapia meeting international export standards',
                features: ['Vacuum-packed', '6-month shelf life', 'FDA compliant'],
                minOrder: '100kg',
                image: '/images/home/smoked-fish-product.jpg',
                color: 'from-amber-500 to-amber-600'
              },
            ].map((product, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      Min: {product.minOrder}
                    </span>
                  </div>
                </div>
                
                {/* Product Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {product.description}
                  </p>
                  
                  <div className="mb-4 sm:mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Key Features:</h4>
                    <ul className="text-gray-600 space-y-1 sm:space-y-2">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm sm:text-base">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    href="/products"
                    className="w-full bg-primary-600 text-white text-center py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-primary-700 transition-all duration-300 hover:shadow-lg block hover:scale-105"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced View All Products CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <span>View All Products</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Locations Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Our Strategic Locations</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Strategically located in Plateau State for optimal production and distribution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Main Farm */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl">🏭</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Main Farm & Processing Facility</h3>
                  <div className="space-y-3 sm:space-y-4 text-gray-600">
                    <p className="flex items-start sm:items-center text-sm sm:text-base lg:text-lg">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Mel, Jikon along Jiban-Quanpan Road
                    </p>
                    <p className="flex items-start sm:items-center text-sm sm:text-base lg:text-lg">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Pankshin LGA, Plateau State, Nigeria
                    </p>
                    <p className="text-gray-500 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 leading-relaxed">
                      Our primary production facility featuring state-of-the-art hatcheries, grow-out ponds, and processing units.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution Center */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-aquatic-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl">🏪</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Sales & Distribution Center</h3>
                  <div className="space-y-3 sm:space-y-4 text-gray-600">
                    <p className="flex items-start sm:items-center text-sm sm:text-base lg:text-lg">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-aquatic-500 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Simdel Plaza, No. 8 Sylvester Davou Street
                    </p>
                    <p className="flex items-start sm:items-center text-sm sm:text-base lg:text-lg">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-aquatic-500 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Beside Wisdom Private School, Gura Topp, Rayfield, Jos
                    </p>
                    <p className="text-gray-500 text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 leading-relaxed">
                      Central distribution hub for nationwide delivery and international export coordination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-aquatic-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Partner with Nigeria's Premier Fish Farm?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of satisfied clients worldwide who trust Fish Supreme for premium quality and reliable supply.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              Get Custom Quote
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}