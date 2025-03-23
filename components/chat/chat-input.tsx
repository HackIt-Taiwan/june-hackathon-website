"use client"

import React, { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useChatStore } from '@/lib/store'
import { motion } from 'framer-motion'

export function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { input, setInput, addMessage, isLoading } = useChatStore()
  const [mounted, setMounted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading) return
    
    // Add user message
    addMessage(input, 'user')
    
    // Simulate assistant response
    setTimeout(() => {
      addMessage("I'm an AI assistant here to help you. This is a simulated response for demonstration purposes.", 'assistant')
    }, 1000)
  }

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  // Auto focus textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Set mounted state on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Static version for server-side rendering
  if (!mounted) {
    return (
      <div className="border-t border-border p-4 md:p-6">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 max-w-5xl mx-auto"
        >
          <div className="relative flex items-end">
            <Textarea
              ref={textareaRef}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              className="min-h-[60px] max-h-[200px] pr-14"
            />
            <div className="absolute bottom-2 right-2">
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 p-0 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // Animated version for client-side
  return (
    <motion.div 
      className="border-t border-border p-4 md:p-6 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <motion.form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-5xl mx-auto"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <motion.div 
          className="relative flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            className="min-h-[60px] max-h-[200px] pr-14"
          />
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-2 right-2"
          >
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 p-0 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              <span className="sr-only">Send</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.div>
  )
} 