const processSteps = [
  {
    step: '1',
    title: 'Supreme Breeding',
    description: 'Genetic selection in our advanced hatcheries',
    icon: '🥚'
  },
  {
    step: '2',
    title: 'Sustainable Rearing',
    description: 'Natural, clean water environments in Pankshin',
    icon: '🌊'
  },
  {
    step: '3',
    title: 'Quality Processing',
    description: 'HACCP-certified processing & packaging',
    icon: '📦'
  },
  {
    step: '4',
    title: 'Global Logistics',
    description: 'Cold chain from Jos to worldwide destinations',
    icon: '✈️'
  }
];

export function ProcessSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Fish Supreme Process</h2>
          <p className="text-lg text-gray-600">
            Our fully integrated approach ensures quality from pond to plate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step) => (
            <div key={step.step} className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-md">
                {step.icon}
              </div>
              <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}