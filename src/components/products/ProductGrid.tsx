'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'live-fish', name: 'Live Fish' },
    { id: 'smoked-fish', name: 'Smoked Fish' },
    { id: 'fingerlings', name: 'Fingerlings' },
    { id: 'juvenile', name: 'Juvenile Fish' },
  ];

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}