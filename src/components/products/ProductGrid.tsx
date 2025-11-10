'use client';

import { products } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'live-fish', name: 'Live Fish' },
    { id: 'smoked-fish', name: 'Smoked Fish' },
    { id: 'fingerlings', name: 'Fingerlings' },
    { id: 'juvenile', name: 'Juvenile Fish' },
  ];

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <button
            key={category.id}
            className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 transition-colors text-sm font-medium"
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}