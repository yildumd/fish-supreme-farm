import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24"> {/* Added padding to account for fixed header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Fish Supreme Integrated Farm</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From our sustainable farms in Plateau State to global markets, we're redefining Nigerian aquaculture excellence.
            </p>
          </div>

          {/* Our Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with a vision to revolutionize fish farming in Nigeria, Fish Supreme Integrated Farm began as a small operation in Pankshin LGA and has grown into a premier aquaculture export hub.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our journey is rooted in the rich, fertile lands of Plateau State, where pristine water sources and ideal climate create the perfect environment for raising supreme-quality fish.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we operate a fully integrated system from our main facility in Pankshin to our distribution center in Jos, serving clients across Nigeria and internationally.
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl flex items-center justify-center min-h-96 p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🐟</div>
                <p className="text-gray-500 text-lg">Farm Image Gallery Coming Soon</p>
                <p className="text-gray-400 text-sm mt-2">Drone footage and facility photos</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-primary-50 p-8 rounded-2xl border border-primary-200">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Our Mission</h3>
              <p className="text-primary-800 leading-relaxed">
                To provide premium, sustainable aquaculture products that meet international standards while empowering local communities and promoting economic growth in Nigeria.
              </p>
            </div>
            <div className="bg-aquatic-50 p-8 rounded-2xl border border-aquatic-200">
              <h3 className="text-2xl font-bold text-aquatic-900 mb-4">Our Vision</h3>
              <p className="text-aquatic-800 leading-relaxed">
                To become Africa's leading aquaculture export hub, recognized globally for quality, innovation, and sustainable fishing practices.
              </p>
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary-600">Main Farm & Processing Facility</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <svg className="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Mel, Jikon along Jiban-Quanpan Road<br />
                  Pankshin LGA, Plateau State<br />
                  Nigeria
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Our primary production facility featuring state-of-the-art hatcheries, grow-out ponds, and HACCP-certified processing units.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-aquatic-600">Sales & Distribution Office</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <svg className="w-5 h-5 text-aquatic-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Simdel Plaza, No. 8 Sylvester Davou Street<br />
                  Beside Wisdom Private School, Gura Topp<br />
                  Rayfield, Jos, Plateau State<br />
                  Nigeria
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Central distribution hub for nationwide delivery and international export coordination with cold storage facilities.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Quality Excellence',
                  description: 'Uncompromising commitment to premium quality at every stage of production',
                  icon: '⭐'
                },
                {
                  title: 'Sustainability',
                  description: 'Environmentally responsible farming practices for long-term viability',
                  icon: '🌱'
                },
                {
                  title: 'Customer Focus',
                  description: 'Building lasting relationships through reliability and exceptional service',
                  icon: '🤝'
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}