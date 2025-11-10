import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'live-tilapia-1kg',
    name: 'Live Tilapia',
    description: 'Fresh, healthy live tilapia, perfect for immediate consumption or farming.',
    price: 1200,
    image: '/images/products/live-tilapia.jpg',
    category: 'live-fish',
    unit: 'kg',
    inStock: true,
    minimumOrder: 10
  },
  {
    id: 'live-catfish-1kg',
    name: 'Live Catfish',
    description: 'Premium live catfish, known for its excellent taste and nutritional value.',
    price: 1500,
    image: '/images/products/live-catfish.jpg',
    category: 'live-fish',
    unit: 'kg',
    inStock: true,
    minimumOrder: 10
  },
  {
    id: 'smoked-tilapia',
    name: 'Smoked Tilapia',
    description: 'Expertly smoked tilapia with traditional methods, perfect for export.',
    price: 2500,
    image: '/images/products/smoked-tilapia.jpg',
    category: 'smoked-fish',
    unit: 'kg',
    inStock: true,
    minimumOrder: 5
  },
  {
    id: 'smoked-catfish',
    name: 'Smoked Catfish',
    description: 'Premium smoked catfish, vacuum-packed for freshness and export quality.',
    price: 3000,
    image: '/images/products/smoked-catfish.jpg',
    category: 'smoked-fish',
    unit: 'kg',
    inStock: true,
    minimumOrder: 5
  },
  {
    id: 'tilapia-fingerlings',
    name: 'Tilapia Fingerlings',
    description: 'High-quality tilapia fingerlings for fish farming, disease-resistant.',
    price: 25,
    image: '/images/products/tilapia-fingerlings.jpg',
    category: 'fingerlings',
    unit: 'piece',
    inStock: true,
    minimumOrder: 100
  },
  {
    id: 'catfish-fingerlings',
    name: 'Catfish Fingerlings',
    description: 'Premium catfish fingerlings, fast-growing and high survival rate.',
    price: 30,
    image: '/images/products/catfish-fingerlings.jpg',
    category: 'fingerlings',
    unit: 'piece',
    inStock: true,
    minimumOrder: 100
  },
  {
    id: 'juvenile-tilapia',
    name: 'Juvenile Tilapia',
    description: 'Healthy juvenile tilapia ready for grow-out ponds.',
    price: 300,
    image: '/images/products/juvenile-tilapia.jpg',
    category: 'juvenile',
    unit: 'piece',
    inStock: true,
    minimumOrder: 50
  },
  {
    id: 'juvenile-catfish',
    name: 'Juvenile Catfish',
    description: 'Robust juvenile catfish for commercial fish farming.',
    price: 350,
    image: '/images/products/juvenile-catfish.jpg',
    category: 'juvenile',
    unit: 'piece',
    inStock: true,
    minimumOrder: 50
  }
];