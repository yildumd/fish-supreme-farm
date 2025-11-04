import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Added pt-24 to push content below fixed header */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-aquatic-600 overflow-hidden pt-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-700/20 to-primary-900/0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-white/90 text-sm font-medium">Nigeria's Premier Aquaculture Export Hub</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Supreme Quality
              <span className="block text-aquatic-300">Aquaculture</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              From our sustainable farms in Pankshin to global markets – delivering premium fingerlings, live fish, and export-grade products worldwide.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/products"
                className="group bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2"
              >
                <span>Explore Our Products</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105"
              >
                <span>Get Export Quote</span>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { number: '10+', label: 'Years Experience' },
                { number: '500+', label: 'Clients Worldwide' },
                { number: '50K+', label: 'Fish Monthly' },
                { number: '15+', label: 'Countries Served' },
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{metric.number}</div>
                  <div className="text-white/70 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Rest of your existing content remains exactly the same */}
      {/* Trust Bar */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Global Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meeting international standards with premium quality and reliable delivery
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-primary-200 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From fingerlings to export-grade products, we maintain supreme quality at every stage of growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Premium Fingerlings',
                description: 'High-quality Tilapia & Catfish fingerlings with excellent growth rates and disease resistance',
                features: ['Fast growth rate', 'Disease resistant', 'High survival rate'],
                minOrder: '5,000 pieces',
                image: '/api/placeholder/400/300',
                color: 'from-blue-500 to-blue-600'
              },
              {
                name: 'Table-Size Live Fish',
                description: 'Fresh, healthy live fish ready for local markets and restaurants across Nigeria',
                features: ['300-500g average', 'Daily harvest', 'Nationwide delivery'],
                minOrder: '50kg',
                image: '/api/placeholder/400/300',
                color: 'from-green-500 to-green-600'
              },
              {
                name: 'Export-Grade Smoked Fish',
                description: 'Premium smoked catfish and tilapia meeting international export standards',
                features: ['Vacuum-packed', '6-month shelf life', 'FDA compliant'],
                minOrder: '100kg',
                image: '/api/placeholder/400/300',
                color: 'from-amber-500 to-amber-600'
              },
            ].map((product, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                {/* Product Image */}
                <div className={`h-48 bg-gradient-to-r ${product.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {product.minOrder}
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
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    href="/products"
                    className="w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 hover:shadow-lg block"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Products CTA */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold group"
            >
              <span>View All Products</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Strategic Locations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Strategically located in Plateau State for optimal production and distribution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Farm */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏭</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Main Farm & Processing Facility</h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Mel, Jikon along Jiban-Quanpan Road
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Pankshin LGA, Plateau State, Nigeria
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      Our primary production facility featuring state-of-the-art hatcheries, grow-out ponds, and processing units.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution Center */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-aquatic-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏪</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sales & Distribution Center</h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="flex items-center">
                      <svg className="w-5 h-5 text-aquatic-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Simdel Plaza, No. 8 Sylvester Davou Street
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 text-aquatic-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Beside Wisdom Private School, Gura Topp, Rayfield, Jos
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      Central distribution hub for nationwide delivery and international export coordination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-aquatic-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Partner with Nigeria's Premier Fish Farm?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients worldwide who trust Fish Supreme for premium quality and reliable supply.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get Custom Quote
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105"
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