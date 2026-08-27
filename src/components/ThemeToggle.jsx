import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-full p-2 text-lg leading-none transition hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      {/* key={theme} remounts the span on change so the pop animation replays. */}
      <span key={theme} className="inline-block animate-[theme-icon-pop_0.35s_ease]">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
