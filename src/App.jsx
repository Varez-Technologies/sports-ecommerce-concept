import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import BrandPage from './pages/BrandPage.jsx'
import Comparison from './pages/Comparison.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="brand/:brandId" element={<BrandPage />} />
        <Route path="compare" element={<Comparison />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
