'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  unit: string;
  inStock: boolean;
  minimumOrder: number;
  cuts?: string[];
  weightOptions?: { weight: string; price: number }[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const [selectedCut, setSelectedCut] = useState<string>(product.cuts?.[0] || '');
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weightOptions?.[0]?.weight || '');

  const handleAddToCart = () => {
    // Calculate final price based on selected weight option
    let finalPrice = product.price;
    if (selectedWeight && product.weightOptions) {
      const selectedOption = product.weightOptions.find(option => option.weight === selectedWeight);
      if (selectedOption) {
        finalPrice = selectedOption.price;
      }
    }

    // Create the product object to add to cart
    const productToAdd = {
      ...product,
      price: finalPrice,
      // Include selected options if available
      ...(selectedCut && { selectedCut }),
      ...(selectedWeight && { selectedWeight })
    };

    dispatch({ 
      type: 'ADD_ITEM', 
      payload: productToAdd 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const getCurrentPrice = () => {
    if (selectedWeight && product.weightOptions) {
      const selectedOption = product.weightOptions.find(option => option.weight === selectedWeight);
      return selectedOption ? selectedOption.price : product.price;
    }
    return product.price;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        {/* Use actual product image */}
        <div className="w-full h-48 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Fallback if image doesn't load */}
          <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center absolute inset-0">
            <span className="text-primary-600 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Cuts Selection */}
        {product.cuts && product.cuts.length > 0 && (
          <div className="mb-3">
            <label className="text-sm text-gray-700 font-medium block mb-1">
              Select Cut:
            </label>
            <select 
              value={selectedCut}
              onChange={(e) => setSelectedCut(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              {product.cuts.map((cut, index) => (
                <option key={index} value={cut}>
                  {cut}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Weight Options */}
        {product.weightOptions && product.weightOptions.length > 0 && (
          <div className="mb-3">
            <label className="text-sm text-gray-700 font-medium block mb-1">
              Select Weight:
            </label>
            <select 
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              {product.weightOptions.map((option, index) => (
                <option key={index} value={option.weight}>
                  {option.weight} - {formatPrice(option.price)}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Display all weight options as reference */}
        {product.weightOptions && product.weightOptions.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 font-medium mb-1">Available Options:</p>
            {product.weightOptions.map((option, index) => (
              <p key={index} className="text-xs text-gray-500">
                {option.weight}: {formatPrice(option.price)}
              </p>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(getCurrentPrice())}
          </span>
          <span className="text-sm text-gray-500">
            {selectedWeight && product.weightOptions ? '' : `per ${product.unit}`}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p>Minimum order: {product.minimumOrder.toLocaleString()} {product.unit}</p>
          <p className={product.inStock ? 'text-green-600' : 'text-red-600'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
          {selectedCut && (
            <p className="text-primary-600 font-medium">Selected: {selectedCut}</p>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}