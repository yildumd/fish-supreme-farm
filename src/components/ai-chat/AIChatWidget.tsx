'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Professional product database
const products = {
  fingerlings: {
    name: 'Tilapia & Catfish Fingerlings',
    description: 'Premium quality fingerlings for fish farming',
    price: '₦25-₦30 per piece',
    minOrder: '5,000 pieces minimum',
    delivery: 'Nationwide delivery available'
  },
  juveniles: {
    name: 'Juvenile Fish',
    description: 'Healthy juveniles ready for grow-out phase',
    price: '₦300-₦350 per piece',
    minOrder: '1,000 pieces minimum',
    delivery: 'Next day delivery'
  },
  'live-fish': {
    name: 'Live Table Fish',
    description: 'Fresh live fish for markets and restaurants (300-500g)',
    price: '₦1,200-₦1,500 per kg',
    minOrder: '50kg minimum',
    delivery: 'Same day delivery available'
  },
  smoked: {
    name: 'Smoked Fish Products',
    description: 'Export-grade smoked catfish and tilapia',
    price: '₦2,500-₦3,000 per kg',
    minOrder: '20kg minimum',
    delivery: 'International shipping'
  },
  'export-grade': {
    name: 'Export Grade Fish',
    description: 'Premium quality for international markets',
    price: 'Contact for export pricing',
    minOrder: '100kg minimum',
    delivery: 'FOB/CIF terms available'
  }
};

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  productRecommendation?: keyof typeof products;
  action?: 'catalog' | 'pricing' | 'contact-agent' | 'complete-order' | null;
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [collectingContact, setCollectingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '',
    productInterest: '',
    quantity: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Initial professional message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: `Welcome to Fish Supreme Integrated Farm. I'm here to assist you with:\n\n• Product catalog and specifications\n• Current pricing and quotes\n• Connecting with sales agents\n• Order processing and delivery\n\nHow may I assist you today?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Professional AI response
  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let productRecommendation: keyof typeof products | undefined;
      let action: Message['action'] = null;
      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('catalog') || lowerMessage.includes('product') || lowerMessage.includes('what do you sell')) {
        response = `Our product catalog includes:\n\n• Tilapia & Catfish Fingerlings\n• Juvenile Fish\n• Live Table Fish\n• Smoked Fish Products\n• Export Grade Fish\n\nWhich product category would you like more information about?`;
        action = 'catalog';
      } 
      else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
        response = `Current pricing:\n\n• Fingerlings: ₦25-₦30 per piece\n• Juveniles: ₦300-₦350 per piece\n• Live Fish: ₦1,200-₦1,500 per kg\n• Smoked Fish: ₦2,500-₦3,000 per kg\n• Export pricing available upon request\n\nWould you like a detailed quote for specific products?`;
        action = 'pricing';
      }
      else if (lowerMessage.includes('agent') || lowerMessage.includes('sales') || lowerMessage.includes('representative') || lowerMessage.includes('contact')) {
        response = `I can connect you with one of our sales agents who can provide:\n\n• Custom pricing based on quantity\n• Delivery arrangements\n• Contract terms\n• Export documentation\n\nMay I collect your contact details to have an agent reach out?`;
        action = 'contact-agent';
      }
      else if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
        response = `I can help you place an order. To get started, I'll need:\n\n• Your contact information\n• Product interest\n• Quantity required\n• Delivery location\n\nWould you like to proceed with order details?`;
        action = 'complete-order';
      }
      else if (lowerMessage.includes('fingerling')) {
        response = `Tilapia & Catfish Fingerlings:\n\n• Price: ₦25-₦30 per piece\n• Minimum order: 5,000 pieces\n• 98% survival rate\n• Nationwide delivery\n\nWould you like pricing for specific quantities or to speak with an agent?`;
        productRecommendation = 'fingerlings';
      }
      else if (lowerMessage.includes('juvenile')) {
        response = `Juvenile Fish:\n\n• Price: ₦300-₦350 per piece\n• Minimum order: 1,000 pieces\n• 4-6 weeks to harvest\n• Next day delivery available\n\nWould you like to discuss quantities or delivery options?`;
        productRecommendation = 'juveniles';
      }
      else if (lowerMessage.includes('live') || lowerMessage.includes('fresh')) {
        response = `Live Table Fish:\n\n• Price: ₦1,200-₦1,500 per kg\n• Minimum order: 50kg\n• 300-500g size range\n• Same day delivery in major cities\n\nAre you interested in regular supply or one-time purchase?`;
        productRecommendation = 'live-fish';
      }
      else if (lowerMessage.includes('smoke')) {
        response = `Smoked Fish Products:\n\n• Price: ₦2,500-₦3,000 per kg\n• Minimum order: 20kg\n• 6-month shelf life\n• Export grade quality\n\nWould you like information about export requirements?`;
        productRecommendation = 'smoked';
      }
      else if (lowerMessage.includes('export')) {
        response = `Export Grade Fish:\n\n• Custom pricing based on volume\n• Minimum order: 100kg\n• FDA & EU compliant\n• Full export documentation\n• International shipping\n\nI can connect you with our export specialist for detailed requirements.`;
        productRecommendation = 'export-grade';
      }
      else {
        response = `Thank you for your inquiry. I specialize in assisting with:\n\n• Product information and specifications\n• Current pricing and volume discounts\n• Order processing and delivery\n• Agent connections for complex requirements\n\nHow may I help you proceed?`;
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        productRecommendation,
        action
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      if (action === 'contact-agent' || action === 'complete-order') {
        setCollectingContact(true);
      }
    }, 1000);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    simulateAIResponse(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: action,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(action);
  };

  const handleContactSubmit = () => {
    if (contactInfo.name && (contactInfo.email || contactInfo.phone)) {
      // In real app, send to backend
      console.log('Order/Contact submitted:', contactInfo);
      
      const thankYouMessage: Message = {
        id: Date.now().toString(),
        content: `Thank you ${contactInfo.name}. Your information has been submitted.\n\nOur sales team will contact you within 24 hours to discuss ${contactInfo.productInterest || 'your fish product requirements'}.\n\nFor immediate assistance, you can also call our sales line: +234-XXX-XXXX`,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, thankYouMessage]);
      setCollectingContact(false);
      setContactInfo({ name: '', email: '', phone: '', company: '', productInterest: '', quantity: '' });

      // Send to backend (commented out for now)
      // fetch('/api/submit-inquiry', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...contactInfo,
      //     type: 'sales-inquiry',
      //     timestamp: new Date().toISOString()
      //   })
      // }).catch(console.error);
    }
  };

  const validateContactInfo = (): boolean => {
    return contactInfo.name.trim() !== '' && 
           (contactInfo.email.trim() !== '' || contactInfo.phone.trim() !== '');
  };

  const redirectToProducts = () => {
    setIsOpen(false);
    setTimeout(() => router.push('/products'), 300);
  };

  const redirectToContact = () => {
    setIsOpen(false);
    setTimeout(() => router.push('/contact'), 300);
  };

  const getProductInfo = (productKey: keyof typeof products) => {
    const product = products[productKey];
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
        <h4 className="font-semibold text-blue-900 text-sm mb-1">{product.name}</h4>
        <p className="text-xs text-blue-700 mb-2">{product.description}</p>
        <div className="text-xs text-blue-600 space-y-1">
          <div>Price: {product.price}</div>
          <div>Minimum Order: {product.minOrder}</div>
          <div>Delivery: {product.delivery}</div>
        </div>
      </div>
    );
  };

  const renderMessageActions = (message: Message) => {
    if (!message.action) return null;

    switch (message.action) {
      case 'catalog':
        return (
          <div className="mt-3 space-y-2">
            <button
              onClick={() => handleQuickAction('Show me fingerlings information')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              View Fingerlings
            </button>
            <button
              onClick={() => handleQuickAction('Show me live fish products')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              View Live Fish
            </button>
            <button
              onClick={redirectToProducts}
              className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Full Product Catalog
            </button>
          </div>
        );
      
      case 'pricing':
        return (
          <div className="mt-3 space-y-2">
            <button
              onClick={() => setCollectingContact(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Get Custom Quote
            </button>
            <button
              onClick={() => handleQuickAction('Connect me with sales agent')}
              className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Speak with Sales Agent
            </button>
          </div>
        );

      case 'contact-agent':
        return (
          <div className="mt-3 space-y-2">
            <button
              onClick={() => setCollectingContact(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Provide Contact Details
            </button>
            <button
              onClick={redirectToContact}
              className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              View Contact Page
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Professional Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        aria-label="Business Assistant"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md h-[500px] flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Business Assistant</h3>
                  <p className="text-blue-100 text-sm">Fish Supreme Integrated Farm</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      {message.productRecommendation && getProductInfo(message.productRecommendation)}
                      {renderMessageActions(message)}
                      <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Contact Form */}
            {collectingContact && (
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm">Contact Information</h4>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Company (Optional)"
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Product Interest"
                    value={contactInfo.productInterest}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, productInterest: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Estimated Quantity"
                    value={contactInfo.quantity}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleContactSubmit}
                      disabled={!validateContactInfo()}
                      className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit to Sales Team
                    </button>
                    <button
                      onClick={() => setCollectingContact(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {messages.length <= 1 && !collectingContact && (
              <div className="px-4 pt-2 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {[
                    'Product Catalog',
                    'Current Pricing',
                    'Speak with Agent',
                    'Place Order'
                  ].map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-50 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            {!collectingContact && (
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isTyping || inputMessage.trim() === ''}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}