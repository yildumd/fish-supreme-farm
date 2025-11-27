import Link from 'next/link';
import Image from 'next/image';

export default function FarmTour() {
  const tourSections = [
    {
      title: "Fish Nursery",
      description: "Our specialized nursery where we carefully nurture young fish in controlled environments to ensure optimal growth and health.",
      images: [
        "/images/farm-tour/nursery-1.jpg",
        "/images/farm-tour/nursery-2.jpg",
      ],
      features: ["Temperature-controlled tanks", "24/7 monitoring", "Specialized feeding programs", "Disease prevention systems"]
    },
    {
      title: "Larval Rearing Unit",
      description: "State-of-the-art facilities where fish larvae are bred and cared for during their most delicate growth phase.",
      images: [
        "/images/farm-tour/larval-1.jpg",
      ],
      features: ["Advanced water filtration", "Precise temperature control", "Micro-algae feeding systems", "Continuous water quality monitoring"]
    },
    {
      title: "Fingerlings Production",
      description: "Dedicated units where young fish (fingerlings) are raised until they're ready for the main grow-out ponds.",
      images: [
        "/images/farm-tour/fingerlings-1.jpg",
        "/images/farm-tour/fingerlings-2.jpg",
        "/images/farm-tour/fingerlings-3.jpg"
      ],
      features: ["Graduated tank systems", "Growth monitoring", "Vaccination programs", "Size grading technology"]
    },
    {
      title: "Main Grow-out Ponds",
      description: "Our massive 100,000 capacity ponds where fish reach market size in ideal conditions.",
      images: [
        "/images/farm-tour/growout-1.jpg",
        "/images/farm-tour/growout-2.jpg",
        "/images/farm-tour/growout-3.jpg"
      ],
      features: ["100,000 fish capacity", "Automated feeding systems", "Oxygen monitoring", "Natural ecosystem balance"]
    },
    {
      title: "Processing & Smoking Facility",
      description: "Modern hygienic processing area where we prepare and smoke fish using traditional methods combined with modern technology.",
      images: [
        "/images/farm-tour/smoking-1.jpg",
        "/images/farm-tour/smoking-2.jpg",
        "/images/farm-tour/smoking-3.jpg"
      ],
      features: ["HACCP certified", "Traditional smoking techniques", "Quality control checks", "Vacuum packaging"]
    },
    {
      title: "Aerial Overview",
      description: "Bird's eye view of our entire integrated fish farming operation spanning multiple hectares.",
      images: [
        "/images/farm-tour/aerial-1.jpg",
        "/images/farm-tour/aerial-2.jpg",
        "/images/farm-tour/aerial-3.jpg"
      ],
      features: ["Integrated farm design", "Sustainable layout", "Water circulation systems", "Expansion areas"]
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="relative mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Farm Tour
          </h1>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary-500 to-green-500 rounded-full"></div>
        </div>
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Explore Our State-of-the-Art Integrated Aquaculture Facility
        </p>
        <p className="text-lg text-gray-500 mt-4 max-w-3xl mx-auto">
          From larval rearing to final processing, discover how we maintain the highest standards in sustainable fish farming
        </p>
      </section>

      {/* Main Tour Sections - 3 per row with multiple images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourSections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group">
              {/* Multiple Images Section */}
              <div className="relative">
                <div className="flex overflow-x-auto snap-x snap-mandatory h-64 scrollbar-hide">
                  {section.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="flex-shrink-0 w-full h-64 snap-center relative">
                      <Image
                        src={image}
                        alt={`${section.title} - Image ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    {section.images.length} photos
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {section.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {section.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                    {section.features.length > 3 && (
                      <li className="text-sm text-primary-600 font-medium">
                        +{section.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    15-20 min
                  </div>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Guided
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-green-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Excellence in Numbers</h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              Our commitment to quality and sustainability reflected in our operational metrics
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              { number: "100,000+", label: "Fish Capacity", icon: "🐟" },
              { number: "24/7", label: "Monitoring", icon: "📊" },
              { number: "100%", label: "Sustainable", icon: "🌱" },
              { number: "50+", label: "Team Members", icon: "👥" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 border border-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-green-50 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience the Difference in Person
            </h2>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              While our virtual tour is in development, nothing compares to walking through our facilities, 
              smelling the fresh air, and seeing our sustainable practices up close.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-green-600 text-white rounded-full font-semibold hover:from-primary-700 hover:to-green-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Schedule Physical Tour
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 text-lg hover:border-primary-700 hover:text-primary-700"
              >
                View Our Products
              </Link>
            </div>
            <p className="text-gray-500 mt-6 text-sm">
              Tours available Monday - Saturday • Group discounts available • Educational programs offered
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}