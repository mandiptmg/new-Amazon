import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import BottomHeader from '@/components/BottomHeader'
import Header from '@/components/Header'
import StoreProvider from '@/store/StoreProvider'
export const metadata: Metadata = {
  title: 'Next_amazon',
  description: 'Discover the best ecommerce website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <StoreProvider>
        <Header />
        <div className='bg-slate-700 hidden lg:block'>
          <BottomHeader />
        </div>
        {children}
        <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
