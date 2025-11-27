export interface Product {
  id: string;
  name: string;
  category: 'fingerlings' | 'juveniles' | 'table-size' | 'smoked' | 'export';
  description: string;
  price: number;
  minOrderQuantity: number;
  unit: string;
  image: string;
  specifications: {
    size?: string;
    grade?: string;
    shelfLife?: string;
    packaging?: string;
  };
  // Add the new properties for cuts and weight options
  cuts?: string[];
  weightOptions?: { weight: string; price: number }[];
}

// ✅ Added missing OrderProduct interface
export interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number; // quantity * unitPrice
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  products: OrderProduct[];
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  shippingAddress: string;
  totalAmount: number;
  createdAt: string;
}

export interface AIConversation {
  id: string;
  messages: AIMessage[];
  customerIntent: 'buying' | 'consulting' | 'information';
  status: 'active' | 'resolved' | 'converted';
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// ✅ Add FarmSection interface for the farm facilities
export interface FarmSection {
  id: string;
  title: string;
  description: string;
  image: string;
  capacity: string;
}

// ✅ Update CartItem to include selected cuts and weights
export interface CartItem {
  product: Product;
  quantity: number;
  selectedCut?: string;
  selectedWeight?: string;
}