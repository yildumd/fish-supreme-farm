import OrderTracking from '@/components/order/OrderTracking'

export default function TrackOrderPage() {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your order ID to check the current status of your shipment. 
            You can find your order ID in your confirmation email.
          </p>
        </div>
        
        <OrderTracking />
      </div>
    </div>
  )
}