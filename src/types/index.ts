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

  // ✅ If this will be stored in DB or passed via API:
  // Prefer string ISO format to avoid serialization issues
  createdAt: string; // or: string | Date;
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

  // Same recommendation: use ISO string if sending to API
  timestamp: string; // or: string | Date;
}