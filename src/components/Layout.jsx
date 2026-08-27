import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CartDrawer from './CartDrawer.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
