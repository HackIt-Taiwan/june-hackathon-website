"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { LucideMoon, LucideSun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ThemeToggleProps {
  variant?: 'icon' | 'button'
  size?: 'sm' | 'md'
}

export function ThemeToggle({ 
  variant = 'icon',
  size = 'md' 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={size === 'sm' ? "h-7 w-7 p-0 rounded-full" : "h-9 w-9 p-0 rounded-full"}
        disabled
      >
        <div className="flex items-center justify-center opacity-0">
          <LucideMoon className={size === 'sm' ? "h-4 w-4" : "h-5 w-5"} />
        </div>
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={size === 'sm' ? "h-7 w-7 p-0 rounded-full" : "h-9 w-9 p-0 rounded-full"}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <LucideSun className={size === 'sm' ? "h-4 w-4" : "h-5 w-5"} />
            ) : (
              <LucideMoon className={size === 'sm' ? "h-4 w-4" : "h-5 w-5"} />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
    )
  }
  
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-sm font-normal"
      onClick={toggleTheme}
    >
      <motion.div 
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center"
      >
        {theme === 'dark' ? (
          <LucideSun className="mr-2 h-4 w-4" />
        ) : (
          <LucideMoon className="mr-2 h-4 w-4" />
        )}
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </motion.div>
    </Button>
  )
} 