'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Mock product data for the AI to recommend
const products = {
  fingerlings: {
    name: 'Premium Fingerlings',
    description: 'Tilapia & Catfish fingerlings for fish farming',
    minOrder: '5,000 pieces',
    price: 'Contact for pricing',
    bestFor: 'Fish farmers starting new ponds'
  },
  juveniles: {
    name: 'Juvenile Fish',
    description: '3-4 week old fish ready for grow-out',
    minOrder: '1,000 pieces',
    price: 'Contact for pricing',
    bestFor: 'Farmers with existing ponds'
  },
  'table-size': {
    name: 'Table-Size Live Fish',
    description: 'Fresh fish for local markets (300-500g)',
    minOrder: '50kg',
    price: 'Contact for pricing',
    bestFor: 'Local markets, restaurants, retailers'
  },
  smoked: {
    name: 'Smoked Fish',
    description: 'Export-grade smoked catfish and tilapia',
    minOrder: '20kg',
    price: 'Contact for pricing',
    bestFor: 'Export markets, supermarkets, distributors'
  },
  'export-catfish': {
    name: 'Export-Grade Catfish',
    description: 'Premium catfish for international markets',
    minOrder: '100kg',
    price: 'Contact for pricing',
    bestFor: 'International buyers, wholesalers'
  },
  'export-tilapia': {
    name: 'Export-Grade Tilapia',
    description: 'High-quality tilapia for export',
    minOrder: '100kg',
    price: 'Contact for pricing',
    bestFor: 'International markets, food processors'
  }
};

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  productRecommendation?: keyof typeof products;
  action?: 'collect-contact' | 'redirect-contact' | null;
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [collectingContact, setCollectingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initial AI message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: "Hello! I'm Supreme Selector, your AI aquaculture expert. I can help you find the perfect fish products for your needs. Are you looking to:\n\n• Start a fish farm 🐟\n• Buy for resale/restaurant 🏪\n• Export internationally 🌍\n• Personal consumption 🍽️\n\nJust tell me what you're looking for!",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let productRecommendation: keyof typeof products | undefined;
      let action: 'collect-contact' | 'redirect-contact' | null = null;

      const lowerMessage = userMessage.toLowerCase();

      // Sales connection triggers
      if (lowerMessage.includes('sales') || lowerMessage.includes('representative') || 
          lowerMessage.includes('agent') || lowerMessage.includes('person')) {
        response = "I'd be happy to connect you with our sales team! They can provide detailed pricing, delivery options, and answer any specific questions. May I get your name and contact information so our team can reach out to you?";
        action = 'collect-contact';
      }
      else if (lowerMessage.includes('quote') || lowerMessage.includes('pricing') || lowerMessage.includes('price')) {
        response = "I can help you get a detailed quote! Our sales team will provide pricing based on your specific needs, quantity, and delivery location. Could you share your name and contact details so we can prepare a custom quote for you?";
        action = 'collect-contact';
      }
      else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
        response = "I can connect you directly with our team! Would you like to:\n\n• Share your contact info for a callback\n• Visit our contact page with all details\n• Get immediate assistance via WhatsApp";
        action = 'redirect-contact';
      }
      else if (lowerMessage.includes('start') || lowerMessage.includes('farm') || lowerMessage.includes('fingerling')) {
        response = "Perfect! For starting a fish farm, I recommend our **Premium Fingerlings**. They have excellent growth rates and high survival rates. Would you like details about minimum order quantities and pricing?";
        productRecommendation = 'fingerlings';
      } else if (lowerMessage.includes('resale') || lowerMessage.includes('restaurant') || lowerMessage.includes('market')) {
        response = "For resale or restaurant use, our **Table-Size Live Fish** are ideal. They're fresh, healthy, and perfect for local markets. We also have **Smoked Fish** for longer shelf life. Which are you interested in?";
        productRecommendation = 'table-size';
      } else if (lowerMessage.includes('export') || lowerMessage.includes('international') || lowerMessage.includes('ship')) {
        response = "For international export, I recommend our **Export-Grade Smoked Fish** or **Premium Tilapia**. Both are FDA & EU compliant with full documentation. What's your target market?";
        productRecommendation = 'export-catfish';
      } else if (lowerMessage.includes('personal') || lowerMessage.includes('consume') || lowerMessage.includes('family')) {
        response = "For personal consumption, our **Table-Size Live Fish** are perfect. Fresh, healthy, and available for local delivery. What quantity are you looking for?";
        productRecommendation = 'table-size';
      } else {
        response = "Thank you for your interest in Fish Supreme! I specialize in helping customers find the right aquaculture products. Could you tell me more about your specific needs? Are you looking for pricing, product details, or would you like to speak with our sales team?";
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

      // If action is to collect contact, set the state
      if (action === 'collect-contact') {
        setCollectingContact(true);
      }
    }, 1500);
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
    setInputMessage(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleContactSubmit = () => {
    if (contactInfo.name && (contactInfo.email || contactInfo.phone)) {
      // In a real app, you would send this to your backend
      console.log('Contact info collected:', contactInfo);
      
      const thankYouMessage: Message = {
        id: Date.now().toString(),
        content: `Thank you ${contactInfo.name}! Our sales team will contact you within 24 hours at ${contactInfo.email || contactInfo.phone}. In the meantime, is there anything else I can help you with?`,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, thankYouMessage]);
      setCollectingContact(false);
      setContactInfo({ name: '', email: '', phone: '' });

      // Simulate sending to sales team (in real app, use API)
      setTimeout(() => {
        // This would be your API call
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...contactInfo,
            source: 'AI Chat',
            timestamp: new Date().toISOString()
          })
        }).catch(console.error);
      }, 1000);
    }
  };

  const redirectToContact = () => {
    setIsOpen(false);
    router.push('/contact');
  };

  const redirectToWhatsApp = () => {
    const message = "Hello! I'm interested in Fish Supreme products and would like to speak with a sales representative.";
    const whatsappUrl = `https://wa.me/234YOURNUMBER?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getProductInfo = (productKey: keyof typeof products) => {
    const product = products[productKey];
    return (
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-3">
        <h4 className="font-semibold text-primary-900 mb-2">{product.name}</h4>
        <p className="text-sm text-primary-700 mb-2">{product.description}</p>
        <div className="text-xs text-primary-600 space-y-1">
          <div>Minimum Order: {product.minOrder}</div>
          <div>Best For: {product.bestFor}</div>
        </div>
      </div>
    );
  };

  const renderMessageActions = (message: Message) => {
    if (!message.action) return null;

    switch (message.action) {
      case 'redirect-contact':
        return (
          <div className="mt-3 space-y-2">
            <button
              onClick={() => setCollectingContact(true)}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Share My Contact Info
            </button>
            <button
              onClick={redirectToContact}
              className="w-full border border-primary-600 text-primary-600 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors"
            >
              Visit Contact Page
            </button>
            <button
              onClick={redirectToWhatsApp}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.26-6.189-3.548-8.452"/>
              </svg>
              Chat on WhatsApp
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 hover:scale-110 z-40 group"
        aria-label="Chat with Supreme Selector AI"
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 text-white text-sm rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Chat with Supreme Selector AI
          <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-aquatic-600 text-white p-4 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Supreme Selector AI</h3>
                <p className="text-primary-100 text-sm">Your aquaculture expert</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    {message.productRecommendation && getProductInfo(message.productRecommendation)}
                    {renderMessageActions(message)}
                    <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-primary-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3">
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
            <div className="p-4 border-t border-gray-200 bg-primary-50">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary-900 text-sm">Share your contact details:</h4>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleContactSubmit}
                    disabled={!contactInfo.name || (!contactInfo.email && !contactInfo.phone)}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit to Sales Team
                  </button>
                  <button
                    onClick={() => setCollectingContact(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
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
                  'Start fish farm',
                  'Buy for restaurant',
                  'Export to USA',
                  'Personal use'
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="bg-white border border-primary-200 text-primary-700 px-3 py-1 rounded-full text-xs hover:bg-primary-50 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          {!collectingContact && (
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isTyping || inputMessage.trim() === ''}
                  className="bg-primary-600 text-white p-2 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}