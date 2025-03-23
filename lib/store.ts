"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MessageType = 'user' | 'assistant'

interface Message {
  id: string
  content: string
  type: MessageType
  timestamp: Date
}

interface ChatState {
  messages: Message[]
  input: string
  isLoading: boolean
  setInput: (input: string) => void
  addMessage: (content: string, type: MessageType) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      type: 'assistant',
      timestamp: new Date(),
    },
  ],
  input: '',
  isLoading: false,
  setInput: (input) => set({ input }),
  addMessage: (content, type) => 
    set((state) => ({ 
      messages: [
        ...state.messages, 
        {
          id: Math.random().toString(36).substring(2, 9),
          content,
          type,
          timestamp: new Date(),
        }
      ],
      input: '',
    })),
  clearMessages: () => 
    set({ 
      messages: [
        {
          id: '1',
          content: 'Hello! How can I help you today?',
          type: 'assistant',
          timestamp: new Date(),
        },
      ] 
    }),
}))

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

interface SidebarState {
  isOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setSidebarOpen: (isOpen) => set({ isOpen }),
})) 