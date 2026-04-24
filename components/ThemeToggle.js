import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-theme-toggle" aria-label="Toggle theme">
        Dark mode
      </button>
    )
  }

  return (
    <button
      className="p-theme-toggle"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
