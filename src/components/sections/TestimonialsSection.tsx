const testimonials = [
  {
    quote: "The quality of Fish Supreme's smoked catfish is exceptional. Our customers in the UK love it!",
    author: "Sarah Johnson",
    company: "Global Seafood Imports, UK"
  },
  {
    quote: "As a restaurant owner in Lagos, I rely on Fish Supreme for consistent, fresh table-size fish.",
    author: "Chef Adebayo",
    company: "Premium Restaurant, Lagos"
  },
  {
    quote: "Their fingerlings have dramatically improved our farm's yield. Professional service throughout.",
    author: "Farm Manager",
    company: "Plateau Aquaculture Group"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Clients Worldwide</h2>
          <p className="text-lg text-gray-600">
            From local restaurants to international distributors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="text-primary-600 text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}