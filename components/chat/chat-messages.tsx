"use client"

import React, { useRef, useEffect, useState } from 'react'
import { useChatStore } from '@/lib/store'
import { ChatMessage } from './chat-message'
import { motion, AnimatePresence } from 'framer-motion'

export function ChatMessages() {
  const { messages } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Static version for server-side rendering
  if (!mounted) {
    return (
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <ChatMessage key={message.id} message={message} index={index} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    )
  }

  // Animated version for client-side
  return (
    <motion.div 
      className="flex-1 overflow-y-auto transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {messages.map((message, index) => (
          <ChatMessage key={message.id} message={message} index={index} />
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </motion.div>
  )
} 