import { create } from 'zustand'
import { ChatSession, ChatMessage } from '../types/chat'

interface ChatState {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  isLoading: boolean
  error: string | null

  // Session actions
  setSessions: (sessions: ChatSession[]) => void
  addSession: (session: ChatSession) => void
  setCurrentSession: (session: ChatSession | null) => void
  removeSession: (sessionId: string) => void

  // Message actions
  addMessage: (sessionId: string, message: ChatMessage) => void
  updateSession: (session: ChatSession) => void

  // State management
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useChatStore = create<ChatState>((set) => ({
  sessions: [],
  currentSession: null,
  isLoading: false,
  error: null,

  setSessions: (sessions: ChatSession[]) =>
    set({
      sessions,
    }),

  addSession: (session: ChatSession) =>
    set((state) => ({
      sessions: [session, ...state.sessions],
    })),

  setCurrentSession: (session: ChatSession | null) =>
    set({
      currentSession: session,
    }),

  removeSession: (sessionId: string) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
      currentSession:
        state.currentSession?.id === sessionId ? null : state.currentSession,
    })),

  addMessage: (sessionId: string, message: ChatMessage) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, messages: [...s.messages, message] } : s
      ),
      currentSession:
        state.currentSession?.id === sessionId
          ? { ...state.currentSession, messages: [...state.currentSession.messages, message] }
          : state.currentSession,
    })),

  updateSession: (session: ChatSession) =>
    set((state) => ({
      sessions: state.sessions.map((s) => (s.id === session.id ? session : s)),
      currentSession: state.currentSession?.id === session.id ? session : state.currentSession,
    })),

  setIsLoading: (isLoading: boolean) =>
    set({
      isLoading,
    }),

  setError: (error: string | null) =>
    set({
      error,
    }),
}))
