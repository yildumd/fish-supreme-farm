const products = [
  {
    name: 'Fingerlings',
    description: 'Premium Tilapia & Catfish Fingerlings',
    href: '/products/fingerlings',
    icon: '🐟'
  },
  {
    name: 'Juvenile Fish',
    description: 'Tilapia & Catfish Juveniles',
    href: '/products/juveniles',
    icon: '🎣'
  },
  {
    name: 'Table-Size Live Fish',
    description: 'Fresh Tilapia & Catfish',
    href: '/products/table-size',
    icon: '🐠'
  },
  {
    name: 'Smoked Fish',
    description: 'Traditional & Export-Grade',
    href: '/products/smoked-fish',
    icon: '🔥'
  }
];

export function ProductShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From fingerlings to export-grade smoked fish, we control every step of the process to ensure supreme quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.href}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {product.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}