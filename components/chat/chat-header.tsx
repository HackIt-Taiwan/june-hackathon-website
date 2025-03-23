"use client"

import React, { useState, useEffect } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSidebarStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { LucideMenu } from 'lucide-react'
import { motion } from 'framer-motion'

export function ChatHeader() {
  const { toggleSidebar } = useSidebarStore()
  const [mounted, setMounted] = useState(false)
  
  // Only show animations after client-side hydration
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Static version for server-side rendering
  if (!mounted) {
    return (
      <header className="flex items-center justify-between border-b border-border py-3 px-4 md:px-6 transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-xl font-semibold">A</span>
            </div>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Astral Chat
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle variant="icon" size="md" />
          </div>
          
          <div className="block md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <LucideMenu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    )
  }
  
  // Animated version for client-side
  return (
    <motion.header 
      className="flex items-center justify-between border-b border-border py-3 px-4 md:px-6 transition-all duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <motion.div 
          className="relative h-8 w-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-xl font-semibold">A</span>
          </div>
        </motion.div>
        <motion.h1 
          className="text-xl font-semibold tracking-tight"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Astral Chat
        </motion.h1>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Theme toggle - hide on small screens, show on medium and up */}
        <div className="hidden md:block">
          <ThemeToggle variant="icon" size="md" />
        </div>
        
        {/* Mobile menu button - only show on small screens */}
        <motion.div 
          className="block md:hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <LucideMenu className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
} 