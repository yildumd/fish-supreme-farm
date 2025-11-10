export interface Product {
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

export interface CartItem {
  product: Product;
  quantity: number;
}