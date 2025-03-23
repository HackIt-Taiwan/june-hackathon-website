"use client"

import React from 'react'
import { ChatHeader } from './chat-header'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { Sidebar } from '@/components/sidebar/sidebar'
import { useThemeStore } from '@/lib/store'

export function ChatInterface() {
  const { theme } = useThemeStore()
  
  return (
    <div className="flex h-screen w-full bg-background text-foreground transition-colors duration-300">
      <Sidebar />
      
      <div className="flex flex-col flex-1 h-full w-full md:pl-[280px]">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
} 