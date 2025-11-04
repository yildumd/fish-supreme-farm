import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-aquatic-600 text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">International Export</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Premium Nigerian Aquaculture Products Ready for Global Markets
          </p>
        </div>
      </section>

      {/* Export Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Export-Grade Quality</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meeting international standards with fully compliant, premium aquaculture products for discerning markets worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Export Features */}
            <div>
              <div className="space-y-6">
                {[
                  {
                    icon: '🛃',
                    title: 'Full Export Compliance',
                    description: 'FDA, EU, and HACCP certified with all required documentation'
                  },
                  {
                    icon: '❄️',
                    title: 'Cold Chain Logistics',
                    description: 'Temperature-controlled shipping to maintain product quality'
                  },
                  {
                    icon: '📦',
                    title: 'Professional Packaging',
                    description: 'Vacuum-sealed, blast-frozen products with proper labeling'
                  },
                  {
                    icon: '✈️',
                    title: 'Global Shipping',
                    description: 'Air freight to major international destinations'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Process */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Export Process</h3>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Inquiry & Quote', description: 'Submit your requirements for a detailed quote' },
                  { step: '2', title: 'Order Confirmation', description: 'Confirm order details and provide documentation' },
                  { step: '3', title: 'Processing & Certification', description: 'Quality control and health certification' },
                  { step: '4', title: 'Packaging & Shipping', description: 'Professional packaging and air freight' },
                  { step: '5', title: 'Delivery & Support', description: 'Track your shipment and receive support' }
                ].map((process, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {process.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{process.title}</h4>
                      <p className="text-gray-600 text-sm">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Export Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium quality products meeting international export standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Smoked Catfish */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-amber-500 to-amber-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Export Grade
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smoked Catfish</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grade:</span>
                    <span className="font-semibold">Premium Export</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Packaging:</span>
                    <span className="font-semibold">Vacuum Sealed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shelf Life:</span>
                    <span className="font-semibold">6 Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Order:</span>
                    <span className="font-semibold">100kg</span>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    FDA & EU Compliant
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    HACCP Certified
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Blast Frozen for Freshness
                  </li>
                </ul>
                <Link
                  href="/contact?inquiry=export"
                  className="w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors block"
                >
                  Request Export Quote
                </Link>
              </div>
            </div>

            {/* Export-Grade Tilapia */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Export Grade
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Tilapia</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grade:</span>
                    <span className="font-semibold">Size-Graded</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Packaging:</span>
                    <span className="font-semibold">IQF (Individually Quick Frozen)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shelf Life:</span>
                    <span className="font-semibold">12 Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Order:</span>
                    <span className="font-semibold">200kg</span>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    FDA & EU Compliant
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    HACCP Certified Processing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Consistent Size & Quality
                  </li>
                </ul>
                <Link
                  href="/contact?inquiry=export"
                  className="w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors block"
                >
                  Request Export Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Markets We Serve</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Exporting premium Nigerian aquaculture products to discerning markets worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { country: 'United States', flag: '🇺🇸', status: 'FDA Compliant' },
              { country: 'United Kingdom', flag: '🇬🇧', status: 'EU Standards' },
              { country: 'European Union', flag: '🇪🇺', status: 'Full Compliance' },
              { country: 'United Arab Emirates', flag: '🇦🇪', status: 'Halal Certified' },
              { country: 'Canada', flag: '🇨🇦', status: 'CFIA Approved' },
              { country: 'China', flag: '🇨🇳', status: 'Customs Cleared' },
              { country: 'South Africa', flag: '🇿🇦', status: 'Regional Hub' },
              { country: 'Other African Nations', flag: '🌍', status: 'Regional Export' }
            ].map((market, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
                <div className="text-3xl mb-3">{market.flag}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{market.country}</h3>
                <p className="text-sm text-primary-600 font-medium">{market.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-aquatic-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Import Premium Nigerian Fish?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join international buyers who trust Fish Supreme for consistent quality, reliable supply, and full export compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?inquiry=export"
              className="bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get Export Quote
            </Link>
            <Link
              href="/products"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}