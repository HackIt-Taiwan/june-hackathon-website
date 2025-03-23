"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'
import { useSidebarStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { LucideMenu } from 'lucide-react'

export function ChatHeader() {
  const { toggleSidebar } = useSidebarStore()
  
  return (
    <motion.header 
      className="flex items-center justify-between border-b border-border py-3 px-4 md:px-6 transition-all duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8">
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-xl font-semibold">A</span>
          </div>
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Astral Chat</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Theme toggle - hide on small screens, show on medium and up */}
        <div className="hidden md:block">
          <ThemeToggle variant="icon" size="md" />
        </div>
        
        {/* Mobile menu button - only show on small screens */}
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
    </motion.header>
  )
} 