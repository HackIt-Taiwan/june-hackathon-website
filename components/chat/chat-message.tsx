"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'

interface ChatMessageProps {
  message: {
    id: string
    content: string
    type: 'user' | 'assistant'
    timestamp: Date
  }
  index: number
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.type === 'user'
  
  return (
    <motion.div
      className={cn(
        "py-4 px-4 md:px-6",
        index % 2 === 0 ? "bg-muted/30" : "bg-background",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex gap-3 max-w-5xl mx-auto">
        <div className="flex-shrink-0 pt-0.5">
          {isUser ? (
            <Avatar size="sm">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar size="sm">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-semibold">A</span>
              </div>
            </Avatar>
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {isUser ? 'You' : 'Astral Assistant'}
            </span>
            <span className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="prose prose-sm max-w-none">
            <p>{message.content}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 