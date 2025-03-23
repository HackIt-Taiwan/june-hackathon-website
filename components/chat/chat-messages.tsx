"use client"

import React, { useRef, useEffect } from 'react'
import { useChatStore } from '@/lib/store'
import { ChatMessage } from './chat-message'
import { motion, AnimatePresence } from 'framer-motion'

export function ChatMessages() {
  const { messages } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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