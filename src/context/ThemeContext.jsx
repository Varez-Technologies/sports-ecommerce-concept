import { createContext, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext(null)

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const transitionTimer = useRef(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    // Briefly enable color transitions so the whole page fades instead of
    // snapping. The class is removed once the fade has finished.
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.clearTimeout(transitionTimer.current)
    transitionTimer.current = window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 450)

    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
