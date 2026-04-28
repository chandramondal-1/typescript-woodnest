import { Routes, Route, useLocation } from 'react-router'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Categories from './pages/Categories'
import Blog, { BlogDetail } from './pages/Blog'
import ProductDetail from './pages/ProductDetail'
import Checkout, { OrderSuccess, TrackOrder } from './pages/Checkout'
import Wishlist from './pages/Wishlist'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <CartProvider>
      <WishlistProvider>
        <ScrollToTop />
        <Navbar />
        <CartDrawer />
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
            <Route path="/categories" element={<PageWrapper><Categories /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/blog/:id" element={<PageWrapper><BlogDetail /></PageWrapper>} />
            <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route path="/order-success/:orderId" element={<PageWrapper><OrderSuccess /></PageWrapper>} />
            <Route path="/track-order/:orderId" element={<PageWrapper><TrackOrder /></PageWrapper>} />
            <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </WishlistProvider>
    </CartProvider>
  )
}
