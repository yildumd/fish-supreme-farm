import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info with Logo */}
          <div className="md:col-span-2">
            <Link href="/" className="block mb-4 -ml-24 sm:-ml-30 lg:-ml-34">
              <div className="relative w-48 h-12">
                <Image
                  src="/logo-transparent.png"
                  alt="Fish Supreme Integrated Farm"
                  fill
                  className="object-contain"
                  priority={false}
                  sizes="(max-width: 768px) 192px, 192px"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Nigeria's premier aquaculture export hub, delivering premium quality fish products from our sustainable farms in Plateau State to global markets.
            </p>
            <div className="flex space-x-4">
              {/* Social links would go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Our Products', 'Export Services', 'Farm Tour', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div>
                <h4 className="font-medium text-white text-sm mb-1">Main Farm</h4>
                <p className="text-sm">Mel, Jikon, Pankshin LGA<br />Plateau State, Nigeria</p>
              </div>
              <div>
                <h4 className="font-medium text-white text-sm mb-1">Distribution</h4>
                <p className="text-sm">Simdel Plaza, Rayfield<br />Jos, Plateau State</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Fish Supreme Integrated Farm. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}