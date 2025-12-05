// src/app/contact/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Your WhatsApp number formatted for international use
const whatsappNumber = '2348052624236'; // 08052624236 without the leading 0
const FORMSPREE_FORM_ID = 'mkgdzvyp'; // Your Formspree form ID

export default function ContactPage() {
  const [orderDetails, setOrderDetails] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'order',
    message: ''
  });

  // Initialize Formspree - use the returned handleSubmit directly
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  // Check for order details in URL when page loads
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const orderParam = urlParams.get('order');
      
      if (orderParam) {
        try {
          const decodedOrder = decodeURIComponent(orderParam);
          setOrderDetails(decodedOrder);
          
          // Auto-populate message with order details
          setFormData(prev => ({
            ...prev,
            inquiryType: 'order',
            message: decodedOrder
          }));
        } catch (error) {
          console.error('Error parsing order details:', error);
        }
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatWhatsAppOrderMessage = () => {
    const name = formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : 'Customer';
    const contact = formData.phone || formData.email ? `\nContact: ${formData.phone || formData.email}` : '';
    const baseMessage = orderDetails || formData.message;
    
    return encodeURIComponent(
      `Hello Fish Supreme Farm!\n\nI'd like to place an order:\n\n${baseMessage}\n\nName: ${name}${contact}\n\nPlease contact me to complete this order.`
    );
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formatWhatsAppOrderMessage()}`;

  // Show success state
  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Submitted Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We've received your details and will contact you within 2 hours to confirm.
            </p>
            <div className="space-y-4">
              <Link href="/" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block">
                Return Home
              </Link>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Need immediate assistance?</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.26-6.189-3.548-8.452"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-aquatic-600 text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Get in touch with Fish Supreme Integrated Farm for premium aquaculture products and export inquiries
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Order Summary Banner (only shows when there's an order) */}
          {orderDetails && (
            <div className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Order Ready to Complete
                  </h3>
                  <p className="opacity-90">Your cart items have been pre-filled below. Complete your contact details to place the order.</p>
                </div>
                <Link
                  href="/cart"
                  className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Edit Order
                </Link>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              {/* Main Farm */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">Main Farm & Processing Facility</h3>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Mel, Jikon along Jiban-Quanpan Road<br />
                    Pankshin LGA, Plateau State<br />
                    Nigeria
                  </p>
                </div>
              </div>

              {/* Distribution Center */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <h3 className="text-xl font-semibold text-aquatic-600 mb-4">Sales & Distribution Office</h3>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <svg className="w-5 h-5 text-aquatic-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 11111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Simdel Plaza, No. 8 Sylvester Davou Street<br />
                    Beside Wisdom Private School<br />
                    Gura Topp, Rayfield, Jos<br />
                    Plateau State, Nigeria
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">+234 805 262 4236</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">info@fishsupremefarm.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Mon - Sat: 8:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Order Processing Info */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">How Orders Are Processed</h3>
                <ol className="list-decimal pl-5 space-y-2 text-blue-700 text-sm">
                  <li>Submit your order via this form</li>
                  <li>We'll contact you within 2 hours to confirm details</li>
                  <li>Payment details and delivery arrangement</li>
                  <li>Order processing and dispatch</li>
                  <li>Delivery and follow-up</li>
                </ol>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Order</h2>
              
              {/* Loading Message */}
              {state.submitting && (
                <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
                  <p className="font-semibold flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing your order...
                  </p>
                </div>
              )}

              {/* Error Message */}
              {state.errors && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                  <p className="font-semibold">⚠ There was an error submitting your order</p>
                  <p className="text-sm mt-1">Please try again or contact us directly via WhatsApp or phone.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                {/* Hidden fields for Formspree */}
                <input type="hidden" name="_subject" value={`New ${formData.inquiryType} Inquiry - Fish Supreme Farm`} />
                {orderDetails && (
                  <input type="hidden" name="orderDetails" value={orderDetails} />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Your first name"
                    />
                    <ValidationError 
                      prefix="firstName" 
                      field="firstName"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Your last name"
                    />
                    <ValidationError 
                      prefix="lastName" 
                      field="lastName"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="+234 805 262 4236"
                  />
                  <ValidationError 
                    prefix="Phone" 
                    field="phone"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Inquiry *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="order">Order Inquiry</option>
                    <option value="export">Export Inquiry</option>
                    <option value="wholesale">Wholesale Purchase</option>
                    <option value="fingerlings">Fingerlings Order</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Order Details / Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Your order details or message..."
                  ></textarea>
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-xs mt-1"
                  />
                  {orderDetails && (
                    <p className="text-xs text-gray-500 mt-2">
                      Your cart items have been pre-filled above. You can edit as needed.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className={`w-full ${
                    state.submitting ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
                  } text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center`}
                >
                  {state.submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Order Inquiry'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting, you agree to our team contacting you to confirm order details.
                </p>
              </form>

              {/* WhatsApp CTA */}
              <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Prefer WhatsApp?</h3>
                <p className="text-green-700 mb-4">Get instant responses via WhatsApp for quick inquiries</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.26-6.189-3.548-8.452"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <p className="text-xs text-green-600 mt-2">
                  Click to open WhatsApp with your order details pre-filled
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}