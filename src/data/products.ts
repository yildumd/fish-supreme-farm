import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smoked Catfish',
    description: 'Premium smoked catfish available in various cuts',
    price: 7500,
    image: '/images/smoked-catfish.jpg',
    category: 'smoked',
    minOrderQuantity: 1,
    unit: 'kg',
    specifications: {
      size: 'Various sizes available',
      grade: 'Premium',
      shelfLife: '6 months',
      packaging: 'Vacuum sealed'
    },
    // Add the new properties
    cuts: ['Tail Cut', 'Head Cut', 'Full Round', 'Middle Cuts'],
    weightOptions: [
      { weight: '1kg', price: 7500 },
      { weight: '1.5kg', price: 15000 },
      { weight: '10kg', price: 150000 }
    ]
  },
  {
    id: '2',
    name: 'Fresh Catfish',
    description: 'Fresh catfish directly from our farm',
    price: 5000,
    image: '/images/fresh-catfish.jpg',
    category: 'table-size',
    minOrderQuantity: 1,
    unit: 'kg',
    specifications: {
      size: '500-700g per fish',
      grade: 'A',
      shelfLife: '3 days refrigerated',
      packaging: 'Ice packed'
    },
    cuts: ['Whole Fish', 'Gutted', 'Fillet'],
    weightOptions: [
      { weight: '1kg', price: 5000 },
      { weight: '5kg', price: 25000 },
      { weight: '10kg', price: 45000 }
    ]
  },
  {
    id: '3',
    name: 'Fingerlings',
    description: 'Healthy catfish fingerlings for farming',
    price: 50,
    image: '/images/fingerlings.jpg',
    category: 'fingerlings',
    minOrderQuantity: 100,
    unit: 'piece',
    specifications: {
      size: '2-3 inches',
      grade: 'A+',
      shelfLife: 'Live delivery',
      packaging: 'Oxygenated bags'
    },
    weightOptions: [
      { weight: '100 pieces', price: 5000 },
      { weight: '500 pieces', price: 22500 },
      { weight: '1000 pieces', price: 40000 }
    ]
  },
  {
    id: '4',
    name: 'Juveniles',
    description: 'Growing catfish juveniles',
    price: 100,
    image: '/images/juveniles.jpg',
    category: 'juveniles',
    minOrderQuantity: 100,
    unit: 'piece',
    specifications: {
      size: '4-6 inches',
      grade: 'A+',
      shelfLife: 'Live delivery',
      packaging: 'Oxygenated bags'
    },
    weightOptions: [
      { weight: '100 pieces', price: 10000 },
      { weight: '500 pieces', price: 45000 },
      { weight: '1000 pieces', price: 80000 }
    ]
  }
];

export const farmSections = [
  {
    id: '1',
    title: 'Nursery Section',
    description: 'Our specialized nursery for young fingerlings with controlled temperature and feeding systems',
    image: '/images/nursery-section.jpg',
    capacity: '50,000 capacity'
  },
  {
    id: '2',
    title: 'Fingerlings & Juveniles Building',
    description: 'Dedicated facility for growing fingerlings into healthy juveniles',
    image: '/images/fingerlings-building.jpg',
    capacity: '75,000 capacity'
  },
  {
    id: '3',
    title: 'Table Size Fish Building',
    description: 'Main production facility for growing fish to market size',
    image: '/images/table-size-building.jpg',
    capacity: '100,000 capacity'
  },
  {
    id: '4',
    title: 'Processing Unit',
    description: 'Modern facility for smoking and processing fish',
    image: '/images/processing-unit.jpg',
    capacity: 'Daily processing capacity: 500kg'
  }
];