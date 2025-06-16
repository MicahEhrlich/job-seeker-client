import { useEffect, useState } from "react"
import { FiSun, FiMoon } from "react-icons/fi"

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Load theme from localStorage or system preference
    const saved = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md transition-colors"
      title="Toggle dark mode"
    >
      {isDark ? <FiSun className="text-yellow-300" /> : <FiMoon className="text-blue-500" />}
      <span className="text-sm">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  )
}
