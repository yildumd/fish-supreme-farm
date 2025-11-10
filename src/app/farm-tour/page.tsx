import Link from 'next/link';
import Image from 'next/image';

export default function FarmTour() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Farm Tour
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Take a virtual journey through our state-of-the-art integrated fish farm. 
          Discover our sustainable practices, advanced facilities, and the care we put into every aspect of our operations.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Coming Soon Placeholder */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Farm Tour Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              We're currently gathering the best photos and videos to give you an immersive tour of our facilities. 
              Check back next week to explore our farm!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
              >
                View Our Products
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </section>

        {/* Preview Sections - Structure for future content */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Fish Farming Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Aquaculture Facilities</h3>
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Photos & Videos Coming Soon</span>
            </div>
            <p className="text-gray-600">
              Explore our modern fish farming operations with advanced water management systems 
              and sustainable practices.
            </p>
          </div>

          {/* Processing Unit */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Processing Unit</h3>
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Photos & Videos Coming Soon</span>
            </div>
            <p className="text-gray-600">
              See our hygienic processing facilities where we ensure the highest quality standards 
              for all our products.
            </p>
          </div>
        </div>

        {/* Drone Footage Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Aerial View
          </h2>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-500">Drone footage coming soon</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Want to See More?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're happy to arrange physical tours of our facilities. Contact us to schedule a visit 
            and see our operations firsthand.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            Schedule a Physical Tour
          </Link>
        </section>
      </div>
    </div>
  );
}