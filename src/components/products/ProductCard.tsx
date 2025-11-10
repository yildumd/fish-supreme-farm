'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

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
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: product 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        {/* Placeholder for product image */}
        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
          <span className="text-primary-600 font-semibold">{product.name}</span>
        </div>
        {/* Uncomment when you have actual images:
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        */}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">per {product.unit}</span>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p>Minimum order: {product.minimumOrder.toLocaleString()} {product.unit}</p>
          <p className={product.inStock ? 'text-green-600' : 'text-red-600'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
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