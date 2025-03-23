"use client"

import React, { useEffect } from 'react'
import { useSidebarStore, useThemeStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LucideMoon, LucideSun, LucideX } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { motion, AnimatePresence } from 'framer-motion'

export function Sidebar() {
  const { isOpen, toggleSidebar, setSidebarOpen } = useSidebarStore()
  const { theme, toggleTheme } = useThemeStore()
  
  // Close sidebar on wider screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setSidebarOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, setSidebarOpen])
  
  // Sidebar for mobile (slide overlay)
  const mobileSidebar = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-background border-r border-border z-50 md:hidden"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex flex-col h-full">
              <motion.div 
                className="flex items-center justify-between p-4 border-b border-border"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <h2 className="text-lg font-medium">Astral Chat</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setSidebarOpen(false)}
                >
                  <LucideX className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </motion.div>
              <motion.div 
                className="flex-1 overflow-auto p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <SidebarContent showThemeToggle={true} />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
  
  // Desktop sidebar (fixed on the left)
  const desktopSidebar = (
    <motion.div 
      className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:w-[280px] md:border-r md:border-border md:bg-background z-10"
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div 
        className="p-4 border-b border-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h2 className="text-lg font-medium">Astral Chat</h2>
      </motion.div>
      <motion.div 
        className="flex-1 overflow-auto p-4 h-[calc(100vh-57px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <SidebarContent showThemeToggle={false} />
      </motion.div>
    </motion.div>
  )
  
  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  )
}

function SidebarContent({ showThemeToggle }: { showThemeToggle: boolean }) {
  const { theme, toggleTheme } = useThemeStore()
  
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Recent Chats</h3>
        <ul className="space-y-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.2 }}
            >
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm font-normal"
              >
                Chat {i + 1}
              </Button>
            </motion.li>
          ))}
        </ul>
      </div>
      
      <motion.div 
        className="space-y-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.2 }}
      >
        <h3 className="text-sm font-medium">Settings</h3>
        {showThemeToggle && (
          <div className="pt-1">
            <ThemeToggle variant="button" />
          </div>
        )}
      </motion.div>
    </div>
  )
} 