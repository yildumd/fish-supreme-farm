'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Enhanced product database with more details
const products = {
  fingerlings: {
    name: 'Premium Fingerlings',
    description: 'High-quality Tilapia & Catfish fingerlings with excellent growth rates and disease resistance',
    minOrder: '5,000 pieces',
    price: '₦25-₦30 per piece',
    bestFor: 'New fish farmers, pond stocking',
    features: ['98% survival rate', 'Fast growth cycle', 'Disease resistant', 'Professional guidance included'],
    delivery: 'Available nationwide',
    image: '/images/products/fingerlings.jpg'
  },
  juveniles: {
    name: 'Juvenile Fish',
    description: '3-4 week old healthy juveniles ready for grow-out phase',
    minOrder: '1,000 pieces',
    price: '₦300-₦350 per piece',
    bestFor: 'Existing farmers, expansion projects',
    features: ['4-6 weeks to harvest', 'Strong immune system', 'Uniform size', 'Technical support'],
    delivery: 'Next day delivery available',
    image: '/images/products/juveniles.jpg'
  },
  'table-size': {
    name: 'Table-Size Live Fish',
    description: 'Fresh, healthy live fish perfect for local markets and restaurants (300-500g)',
    minOrder: '50kg',
    price: '₦1,200-₦1,500 per kg',
    bestFor: 'Restaurants, local markets, retailers',
    features: ['Fresh daily harvest', 'Various sizes available', 'Live delivery guarantee', 'Bulk discounts'],
    delivery: 'Same day delivery in Lagos',
    image: '/images/products/table-size.jpg'
  },
  smoked: {
    name: 'Premium Smoked Fish',
    description: 'Export-grade smoked catfish and tilapia with extended shelf life',
    minOrder: '20kg',
    price: '₦2,500-₦3,000 per kg',
    bestFor: 'Export markets, supermarkets, distributors',
    features: ['6-month shelf life', 'FDA & EU compliant', 'Vacuum packed', 'Custom packaging'],
    delivery: 'International shipping available',
    image: '/images/products/smoked.jpg'
  },
  'export-catfish': {
    name: 'Export-Grade Catfish',
    description: 'Premium quality catfish processed for international markets',
    minOrder: '100kg',
    price: 'Contact for export pricing',
    bestFor: 'International buyers, wholesalers, processors',
    features: ['HACCP certified', 'IQF processing', 'Custom cutting', 'Full documentation'],
    delivery: 'FOB/CIF terms available',
    image: '/images/products/export-catfish.jpg'
  },
  'export-tilapia': {
    name: 'Export-Grade Tilapia',
    description: 'High-quality tilapia fillets and whole fish for international markets',
    minOrder: '100kg',
    price: 'Contact for export pricing',
    bestFor: 'International markets, food processors, distributors',
    features: ['BAP certified', 'Various cuts available', 'EU compliance', 'Cold chain logistics'],
    delivery: 'Worldwide shipping',
    image: '/images/products/export-tilapia.jpg'
  }
};

// Conversation contexts for better flow
type ConversationContext = {
  interest: 'farming' | 'business' | 'export' | 'personal' | null;
  budget: 'low' | 'medium' | 'high' | null;
  experience: 'beginner' | 'intermediate' | 'expert' | null;
  timeline: 'immediate' | '1-2 weeks' | '1-3 months' | 'planning' | null;
};

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  productRecommendation?: keyof typeof products;
  action?: 'collect-contact' | 'redirect-contact' | 'product-details' | 'budget-discussion' | null;
  quickReplies?: string[];
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [collectingContact, setCollectingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', business: '' });
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    interest: null,
    budget: null,
    experience: null,
    timeline: null
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Enhanced initial message with better engagement
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: `🎣 **Welcome to Fish Supreme!** 

I'm Supreme Selector, your AI aquaculture consultant. I'm here to help you find the perfect fish products for your needs.

**What brings you here today?**
• 🏗️ Starting a fish farm
• 💼 Buying for business/resale
• 🌍 Export requirements
• 🍽️ Personal consumption
• 💰 Budget planning
• 📚 Learning about aquaculture

Tell me about your project and I'll provide personalized recommendations!`,
        sender: 'ai',
        timestamp: new Date(),
        quickReplies: [
          'Start fish farm',
          'Buy for restaurant',
          'Export to USA/Europe',
          'Personal use',
          'Get price quotes'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced AI response simulation with context awareness
  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let productRecommendation: keyof typeof products | undefined;
      let action: Message['action'] = null;
      let quickReplies: string[] = [];
      const lowerMessage = userMessage.toLowerCase();

      // Update conversation context based on user input
      updateConversationContext(lowerMessage);

      // Intelligent response generation based on context and keywords
      if (isSalesTrigger(lowerMessage)) {
        response = generateSalesResponse();
        action = 'collect-contact';
        quickReplies = ['Share my details', 'Call me now', 'Visit contact page'];
      } else if (isPricingTrigger(lowerMessage)) {
        response = generatePricingResponse();
        action = 'budget-discussion';
        quickReplies = ['Under ₦100k', '₦100k-₦500k', 'Over ₦500k', 'Get custom quote'];
      } else if (isProductInquiry(lowerMessage)) {
        const { response: productResponse, recommendation } = generateProductResponse(lowerMessage);
        response = productResponse;
        productRecommendation = recommendation;
        action = 'product-details';
        quickReplies = ['More details', 'Pricing', 'Delivery info', 'Speak to expert'];
      } else if (isFarmingInterest(lowerMessage)) {
        response = generateFarmingResponse();
        quickReplies = ['Fingerlings info', 'Farm setup cost', 'Training needed', 'Market potential'];
      } else if (isExportInterest(lowerMessage)) {
        response = generateExportResponse();
        quickReplies = ['Export requirements', 'Documentation', 'Shipping costs', 'International standards'];
      } else {
        response = generateGeneralResponse();
        quickReplies = ['Product catalog', 'Price list', 'Farm tour', 'Contact sales'];
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        productRecommendation,
        action,
        quickReplies
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      if (action === 'collect-contact') {
        setCollectingContact(true);
      }
    }, 1200 + Math.random() * 800); // Variable typing delay for natural feel
  };

  // Enhanced context detection
  const updateConversationContext = (message: string) => {
    const newContext = { ...conversationContext };
    
    // Detect interest
    if (message.includes('farm') || message.includes('start') || message.includes('beginner')) {
      newContext.interest = 'farming';
    } else if (message.includes('restaurant') || message.includes('resale') || message.includes('business')) {
      newContext.interest = 'business';
    } else if (message.includes('export') || message.includes('international') || message.includes('ship')) {
      newContext.interest = 'export';
    } else if (message.includes('personal') || message.includes('family') || message.includes('consume')) {
      newContext.interest = 'personal';
    }

    // Detect budget
    if (message.includes('cheap') || message.includes('low') || message.includes('small')) {
      newContext.budget = 'low';
    } else if (message.includes('medium') || message.includes('standard')) {
      newContext.budget = 'medium';
    } else if (message.includes('premium') || message.includes('high') || message.includes('large')) {
      newContext.budget = 'high';
    }

    // Detect experience
    if (message.includes('new') || message.includes('beginner') || message.includes('first time')) {
      newContext.experience = 'beginner';
    } else if (message.includes('experience') || message.includes('before') || message.includes('existing')) {
      newContext.experience = 'intermediate';
    } else if (message.includes('expert') || message.includes('professional') || message.includes('commercial')) {
      newContext.experience = 'expert';
    }

    // Detect timeline
    if (message.includes('now') || message.includes('immediate') || message.includes('urgent')) {
      newContext.timeline = 'immediate';
    } else if (message.includes('week') || message.includes('soon')) {
      newContext.timeline = '1-2 weeks';
    } else if (message.includes('month') || message.includes('plan') || message.includes('future')) {
      newContext.timeline = '1-3 months';
    }

    setConversationContext(newContext);
  };

  // Enhanced response generators
  const isSalesTrigger = (message: string): boolean => 
    /(sales|representative|agent|person|call|meet|discuss)/.test(message);

  const isPricingTrigger = (message: string): boolean =>
    /(price|cost|quote|pricing|how much|budget)/.test(message);

  const isProductInquiry = (message: string): boolean =>
    /(fingerling|juvenile|smoked|live|export|tilapia|catfish)/.test(message);

  const isFarmingInterest = (message: string): boolean =>
    /(farm|pond|start|beginner|aquaculture|grow)/.test(message);

  const isExportInterest = (message: string): boolean =>
    /(export|international|ship|overseas|europe|usa|uk)/.test(message);

  const generateSalesResponse = (): string => {
    return `Excellent! I'd love to connect you with our aquaculture experts. Our sales team can provide:

• 📊 Custom pricing based on your quantity
• 🚚 Delivery options and timelines
• 📝 Contract farming opportunities
• 🌟 Special bulk discounts
• 📋 Export documentation support

May I get your contact details so our specialist can reach out with personalized assistance?`;
  };

  const generatePricingResponse = (): string => {
    const { interest, budget } = conversationContext;
    
    let baseResponse = "I can help you with pricing! Our products range from affordable starter packs to premium export quality.\n\n";
    
    if (interest === 'farming') {
      baseResponse += "**For fish farming:**\n• Fingerlings: ₦25-₦30 per piece\n• Juveniles: ₦300-₦350 per piece\n• Complete farm setup consultation available\n\n";
    } else if (interest === 'business') {
      baseResponse += "**For business/resale:**\n• Live fish: ₦1,200-₦1,500 per kg\n• Smoked fish: ₦2,500-₦3,000 per kg\n• Bulk discounts available\n\n";
    }
    
    baseResponse += "What's your approximate budget range? This helps me provide the most relevant options.";
    
    return baseResponse;
  };

  const generateProductResponse = (message: string): { response: string; recommendation: keyof typeof products } => {
    let recommendation: keyof typeof products = 'table-size';
    let response = '';

    if (message.includes('fingerling')) {
      recommendation = 'fingerlings';
      response = `Perfect choice! Our **Premium Fingerlings** are ideal for starting your fish farm:\n\n`;
    } else if (message.includes('juvenile')) {
      recommendation = 'juveniles';
      response = `Great selection! Our **Juvenile Fish** are perfect for growers:\n\n`;
    } else if (message.includes('smoked')) {
      recommendation = 'smoked';
      response = `Excellent! Our **Premium Smoked Fish** are perfect for export and local markets:\n\n`;
    } else if (message.includes('export')) {
      recommendation = message.includes('tilapia') ? 'export-tilapia' : 'export-catfish';
      response = `Outstanding! Our **Export-Grade ${message.includes('tilapia') ? 'Tilapia' : 'Catfish'}** meet international standards:\n\n`;
    } else {
      recommendation = 'table-size';
      response = `Wonderful! Our **Table-Size Live Fish** are perfect for immediate use:\n\n`;
    }

    const product = products[recommendation];
    response += `**${product.name}**\n${product.description}\n\n💵 **Price:** ${product.price}\n📦 **Min Order:** ${product.minOrder}\n🎯 **Best For:** ${product.bestFor}\n🚚 **Delivery:** ${product.delivery}`;

    return { response, recommendation };
  };

  const generateFarmingResponse = (): string => {
    return `🐟 **Fish Farming Made Easy!**

Starting a fish farm is an excellent investment! Here's what you need:

**For Beginners:**
1. Start with 5,000 fingerlings (₦125,000 - ₦150,000)
2. Pond setup consultation available
3. 4-6 month growth cycle
4. Potential ROI: 40-60%

**We Provide:**
• Quality fingerlings & juveniles
• Technical training & support
• Feed recommendations
• Market access assistance

Would you like specific details about fingerlings, farm setup costs, or market potential?`;
  };

  const generateExportResponse = (): string => {
    return `🌍 **International Export Excellence**

We specialize in helping Nigerian fish farmers access global markets:

**Our Export Capabilities:**
• FDA & EU compliance certification
• HACCP & BAP certified processing
• Cold chain logistics
• Full export documentation
• FOB/CIF shipping terms

**Key Markets:**
• United States • United Kingdom • European Union • Middle East

**Popular Export Products:**
• Smoked Catfish & Tilapia
• IQF Fish Fillets
• Whole Frozen Fish
• Custom processed products

Would you like information about specific export requirements, documentation, or shipping costs?`;
  };

  const generateGeneralResponse = (): string => {
    return `Thank you for your interest in Fish Supreme Integrated Farm! 🌟

We're one of Nigeria's leading aquaculture companies with:
• 🏆 15+ years industry experience
• 🌱 Sustainable farming practices
• 🚚 Nationwide delivery
• 🌍 International export capabilities
• 💰 Competitive pricing
• 📚 Comprehensive support

How can I assist you today? You can ask about:
• Specific products and pricing
• Starting a fish farm
• Export requirements
• Bulk order discounts
• Delivery options

Or I can connect you with our expert team for personalized assistance!`;
  };

  // Enhanced message handling
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

  const handleQuickReply = (reply: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: reply,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(reply);
  };

  // Enhanced contact handling with validation
  const handleContactSubmit = () => {
    if (validateContactInfo()) {
      // Simulate API call to backend
      console.log('Contact info submitted:', contactInfo);
      
      const thankYouMessage: Message = {
        id: Date.now().toString(),
        content: `✅ **Thank you ${contactInfo.name}!**\n\nOur sales team will contact you within 24 hours at ${contactInfo.phone || contactInfo.email}.\n\nWe'll discuss:\n• ${contactInfo.business || 'Your fish product needs'}\n• Custom pricing options\n• Delivery arrangements\n• Any technical support needed\n\nIn the meantime, feel free to ask me any other questions!`,
        sender: 'ai',
        timestamp: new Date(),
        quickReplies: ['Product catalog', 'Farm location', 'Visit website', 'Chat more']
      };

      setMessages(prev => [...prev, thankYouMessage]);
      setCollectingContact(false);
      setContactInfo({ name: '', email: '', phone: '', business: '' });

      // In real implementation, send to your backend
      fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactInfo,
          source: 'AI Chat Widget',
          context: conversationContext,
          timestamp: new Date().toISOString()
        })
      }).catch(console.error);
    }
  };

  const validateContactInfo = (): boolean => {
    return contactInfo.name.trim() !== '' && 
           (contactInfo.email.trim() !== '' || contactInfo.phone.trim() !== '') &&
           contactInfo.phone.trim().length >= 10;
  };

  // Enhanced navigation handlers
  const redirectToContact = () => {
    setIsOpen(false);
    setTimeout(() => router.push('/contact'), 300);
  };

  const redirectToProducts = () => {
    setIsOpen(false);
    setTimeout(() => router.push('/products'), 300);
  };

  const redirectToWhatsApp = () => {
    const contextMessage = conversationContext.interest ? 
      `I'm interested in ${conversationContext.interest} and would like to speak with a sales representative.` :
      "I'm interested in Fish Supreme products and would like to speak with a sales representative.";
    
    const whatsappUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(contextMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Enhanced product display component
  const getProductInfo = (productKey: keyof typeof products) => {
    const product = products[productKey];
    return (
      <div className="bg-gradient-to-br from-primary-50 to-aquatic-50 border border-primary-200 rounded-xl p-3 mt-2 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-bold text-primary-900 text-sm mb-1">{product.name}</h4>
            <p className="text-xs text-primary-700 mb-2 leading-relaxed">{product.description}</p>
            
            <div className="grid grid-cols-1 gap-1 text-xs">
              <div className="flex items-center">
                <span className="text-primary-600 font-semibold mr-1 text-xs">💰</span>
                <span className="text-xs">{product.price}</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-600 font-semibold mr-1 text-xs">📦</span>
                <span className="text-xs">{product.minOrder}</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-600 font-semibold mr-1 text-xs">🎯</span>
                <span className="text-xs">{product.bestFor}</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary-600 font-semibold mr-1 text-xs">🚚</span>
                <span className="text-xs">{product.delivery}</span>
              </div>
            </div>

            <div className="mt-2">
              <h5 className="text-xs font-semibold text-primary-800 mb-1">Key Features:</h5>
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                    +{product.features.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced message actions
  const renderMessageActions = (message: Message) => {
    if (!message.action) return null;

    switch (message.action) {
      case 'redirect-contact':
        return (
          <div className="mt-2 space-y-2">
            <button
              onClick={() => setCollectingContact(true)}
              className="w-full bg-gradient-to-r from-primary-600 to-aquatic-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-aquatic-700 transition-all shadow-md"
            >
              📞 Share My Contact Info
            </button>
            <button
              onClick={redirectToContact}
              className="w-full border border-primary-600 text-primary-600 py-3 px-4 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors"
            >
              👥 Visit Contact Page
            </button>
            <button
              onClick={redirectToWhatsApp}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.26-6.189-3.548-8.452"/>
              </svg>
              WhatsApp Instant Chat
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Quick replies component - now horizontal scroll on mobile
  const renderQuickReplies = (quickReplies: string[]) => {
    return (
      <div className="mt-2">
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="flex-shrink-0 bg-white border border-primary-200 text-primary-700 px-3 py-2 rounded-full text-sm hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile-optimized Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-primary-600 to-aquatic-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:from-primary-700 hover:to-aquatic-700 transition-all duration-300 hover:scale-110 z-40 group animate-bounce hover:animate-none touch-manipulation"
        aria-label="Chat with Supreme Selector AI"
        style={{ touchAction: 'manipulation' }}
      >
        <div className="relative">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="hidden sm:block absolute bottom-full right-0 mb-2 w-64 bg-gray-900 text-white text-sm rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
          <div className="font-semibold">Supreme Selector AI</div>
          <div className="text-gray-300">Get instant fish farming advice!</div>
          <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>

      {/* Mobile-optimized Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:h-[600px] bg-white sm:rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col transform transition-all duration-300 scale-100">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-primary-600 to-aquatic-600 text-white p-3 sm:p-4 sm:rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm sm:text-lg">🎣</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">Supreme Selector AI</h3>
                  <p className="text-primary-100 text-xs sm:text-sm">Your Aquaculture Expert • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10 touch-manipulation"
                style={{ touchAction: 'manipulation' }}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Enhanced Chat Messages - Mobile Optimized */}
          <div className="flex-1 p-3 sm:p-4 bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3 sm:p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-none shadow-md'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">{message.content}</div>
                    {message.productRecommendation && getProductInfo(message.productRecommendation)}
                    {renderMessageActions(message)}
                    {message.quickReplies && renderQuickReplies(message.quickReplies)}
                    <div className={`text-xs mt-1 sm:mt-2 ${message.sender === 'user' ? 'text-primary-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3 sm:p-4 shadow-sm max-w-[90%] sm:max-w-[85%]">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">Supreme Selector is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Enhanced Contact Form - Mobile Optimized */}
          {collectingContact && (
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-gradient-to-b from-primary-50 to-white">
              <div className="space-y-3">
                <h4 className="font-bold text-primary-900 text-sm flex items-center">
                  <span className="mr-2">📞</span>
                  Connect with Our Experts
                </h4>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                />
                <input
                  type="text"
                  placeholder="Your Business/Interest"
                  value={contactInfo.business}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, business: e.target.value }))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleContactSubmit}
                    disabled={!validateContactInfo()}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-aquatic-600 text-white py-3 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-aquatic-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                  >
                    ✅ Submit to Sales Team
                  </button>
                  <button
                    onClick={() => setCollectingContact(false)}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Quick Actions - Mobile Optimized */}
          {messages.length <= 1 && !collectingContact && (
            <div className="px-3 sm:px-4 pt-2 sm:pt-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2 font-semibold">Quick start:</p>
              <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {[
                  '🐟 Start Fish Farm',
                  '🏪 Buy for Business',
                  '🌍 Export Products',
                  '💰 Get Price Quotes',
                  '📚 Farm Training',
                  '🚚 Delivery Info'
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="flex-shrink-0 bg-white border border-primary-200 text-primary-700 px-3 py-2 rounded-full text-xs hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Input Area - Mobile Optimized */}
          {!collectingContact && (
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white sm:rounded-b-2xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about fish farming, products, pricing..."
                  className="flex-1 border border-gray-300 rounded-xl px-3 sm:px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isTyping || inputMessage.trim() === ''}
                  className="bg-gradient-to-r from-primary-600 to-aquatic-600 text-white p-3 rounded-xl hover:from-primary-700 hover:to-aquatic-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by Fish Supreme AI • Your aquaculture expert
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}