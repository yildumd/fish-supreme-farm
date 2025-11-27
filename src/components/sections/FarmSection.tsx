import { FarmSection } from '@/types';
import Image from 'next/image';

const farmSections: FarmSection[] = [
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

export default function FarmSections() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Farm Facilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 mb-3">{section.description}</p>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {section.capacity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}