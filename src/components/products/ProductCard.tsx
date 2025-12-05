'use client';

import { useCart } from '@/contexts/CartContext'; // Fixed import path
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const [selectedCut, setSelectedCut] = useState<string>(product.cuts?.[0] || '');
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weightOptions?.[0]?.weight || '');
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    // Calculate final price based on selected weight option
    let finalPrice = product.price;
    if (selectedWeight && product.weightOptions) {
      const selectedOption = product.weightOptions.find(option => option.weight === selectedWeight);
      if (selectedOption) {
        finalPrice = selectedOption.price;
      }
    }

    // Create the cart item object with correct structure
    const cartItem = {
      id: product.id.toString(), // Ensure id is string
      name: product.name,
      price: finalPrice,
      quantity: product.minOrderQuantity || 1,
      unit: product.unit || 'kg', // Default to kg
      minOrderQuantity: product.minOrderQuantity || 1,
      image: product.image
    };

    dispatch({ 
      type: 'ADD_ITEM', 
      payload: cartItem 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getCurrentPrice = () => {
    if (selectedWeight && product.weightOptions) {
      const selectedOption = product.weightOptions.find(option => option.weight === selectedWeight);
      return selectedOption ? selectedOption.price : product.price;
    }
    return product.price;
  };

  const getMinOrderDisplay = () => {
    return `${product.minOrderQuantity || 1} ${product.unit || 'unit'}`;
  };

  // Check if product is in stock (default to true if not specified)
  const isInStock = product.inStock !== false;

  // Fixed image error handler for Next.js Image
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        <div className="w-full h-48 relative">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-center px-2">{product.name}</span>
            </div>
          )}
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
        
        {/* Specifications */}
        {product.specifications && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 font-medium mb-1">Specifications:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>Size: {product.specifications.size}</p>
              <p>Grade: {product.specifications.grade}</p>
              <p>Shelf Life: {product.specifications.shelfLife}</p>
              <p>Packaging: {product.specifications.packaging}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(getCurrentPrice())}
          </span>
          <span className="text-sm text-gray-500">
            {selectedWeight && product.weightOptions ? '' : `per ${product.unit || 'unit'}`}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p>Minimum order: {getMinOrderDisplay()}</p>
          <p className={isInStock ? 'text-green-600' : 'text-red-600'}>
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </p>
          {selectedCut && (
            <p className="text-primary-600 font-medium">Selected: {selectedCut}</p>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}