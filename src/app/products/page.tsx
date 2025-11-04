import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const products = [
  {
    id: 1,
    name: 'Premium Fingerlings',
    category: 'fingerlings',
    description: 'High-quality Tilapia & Catfish fingerlings for fish farmers',
    features: ['Disease-resistant', 'Fast growth rate', 'High survival rate'],
    minOrder: '5,000 pieces',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Juvenile Fish',
    category: 'juveniles',
    description: 'Healthy juvenile fish ready for grow-out ponds',
    features: ['3-4 weeks old', 'Acclimated to pond conditions', 'Vaccinated when required'],
    minOrder: '1,000 pieces',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    name: 'Table-Size Live Fish',
    category: 'table-size',
    description: 'Fresh, live fish ready for market and consumption',
    features: ['300-500g average weight', 'Fresh daily harvest', 'Local and national delivery'],
    minOrder: '50kg',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 4,
    name: 'Smoked Fish',
    category: 'smoked',
    description: 'Traditionally smoked fish with export-grade quality',
    features: ['Vacuum-packed', '6-month shelf life', 'FDA & EU compliant'],
    minOrder: '20kg',
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 5,
    name: 'Export-Grade Catfish',
    category: 'export',
    description: 'Premium catfish meeting international export standards',
    features: ['IQF processed', 'HACCP certified', 'Global shipping'],
    minOrder: '100kg',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 6,
    name: 'Export-Grade Tilapia',
    category: 'export',
    description: 'High-quality tilapia for international markets',
    features: ['Size-graded', 'FDA compliant', 'Cold chain logistics'],
    minOrder: '100kg',
    color: 'from-cyan-500 to-cyan-600'
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24"> {/* Added padding for fixed header */}
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-aquatic-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Premium Products</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              From fingerlings to export-grade products, we maintain supreme quality at every stage of production.
            </p>
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
                      <Link
                        href={`/contact?product=${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all duration-300 hover:shadow-lg"
                      >
                        Request Quote
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nationwide Delivery</h3>
                <p className="text-gray-600 text-sm">Fast, reliable delivery across Nigeria</p>
              </div>
              <div className="text-center">
                <div className="bg-aquatic-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Export</h3>
                <p className="text-gray-600 text-sm">International shipping available</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600 text-sm">Consistently exceeding expectations</p>
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
              Contact us today for bulk pricing, custom orders, or export inquiries. Our team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Contact Sales Team
              </Link>
              <Link
                href="/export"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all duration-300 hover:scale-105"
              >
                Export Inquiries
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}