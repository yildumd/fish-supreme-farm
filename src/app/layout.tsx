import './globals.css'
import { Inter } from 'next/font/google'
import { AIChatWidget } from '@/components/ai-chat/AIChatWidget'
import { Header } from '@/components/layout/Header'
import { CartProvider } from '@/contexts/CartContext' // Add this import

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Fish Supreme Integrated Farm - Premium Nigerian Aquaculture',
  description: 'Nigeria\'s premier aquaculture export hub. Premium fingerlings, juvenile fish, table-size live fish, and export-grade smoked catfish and tilapia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <CartProvider> {/* Add this wrapper */}
          <Header />
          <main>{children}</main>
          <AIChatWidget />
        </CartProvider>
      </body>
    </html>
  )
}