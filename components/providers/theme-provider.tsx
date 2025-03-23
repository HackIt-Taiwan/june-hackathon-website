"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useThemeStore } from "@/lib/store"

const ThemeProviderContext = createContext<{
  theme: string | null
  setTheme: (theme: "light" | "dark") => void
}>({
  theme: null,
  setTheme: () => {},
})

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    setIsMounted(true)
    
    // Check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // If no stored preference yet, use system preference
    if (!localStorage.getItem('theme-storage')) {
      setTheme(prefersDark ? 'dark' : 'light')
    }
    
    // Apply theme class
    const currentTheme = theme || (prefersDark ? 'dark' : 'light')
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme, setTheme])

  // Avoid hydration mismatch by only rendering on client
  if (!isMounted) return null

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
} 