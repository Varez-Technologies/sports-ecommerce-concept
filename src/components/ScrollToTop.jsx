import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the top on route change (skips hash links like /about#faqs). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
