'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCart(); // Get state from cart
  
  // Calculate item count from state
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  // Updated navigation items array with Farm Tour
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Farm Tour', href: '/farm-tour' },
    { name: 'Export', href: '/export' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-lg py-2 border-b border-primary-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center -ml-40 sm:-ml-44 lg:-ml-48">
            <div className="relative w-64 h-16">
              <Image
                src="/logo-transparent.png"
                alt="Fish Supreme Integrated Farm"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 256px, 256px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium transition-all hover:scale-105 text-sm text-gray-700 hover:text-primary-600"
              >
                {item.name}
              </Link>
            ))}
            {/* Add Cart Icon to Desktop Navigation */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full font-semibold transition-all hover:shadow-lg text-sm bg-primary-600 text-white hover:bg-primary-700 border border-primary-500"
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-gray-700"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Add Cart to Mobile Navigation */}
              <Link
                href="/cart"
                className="flex items-center text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
              <Link
                href="/contact"
                className="block bg-primary-600 text-white text-center px-4 py-2 rounded-full font-semibold hover:bg-primary-700 transition-colors mt-3 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}