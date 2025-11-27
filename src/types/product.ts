export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  unit: string;
  inStock?: boolean;
  minOrderQuantity: number;
  popular?: boolean;
  delivery?: string;
  features?: string[];
  cuts?: string[];
  weightOptions?: { weight: string; price: number }[];
  specifications?: {
    size: string;
    grade: string;
    shelfLife: string;
    packaging: string;
  };
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
}