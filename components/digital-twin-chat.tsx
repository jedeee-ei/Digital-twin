'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, MessageCircle } from 'lucide-react'
import { searchDigitalTwin } from '../app/actions/digital-twin'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  context?: Array<{ title: string; score: number }>
}

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSuggestedQuestion = async (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      // Call server action
      const result = await searchDigitalTwin(question)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: result.message,
        context: result.context,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Call server action
      const result = await searchDigitalTwin(input)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: result.message,
        context: result.context,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center px-4">
              {/* AI Assistant Icon with gradient */}
              <div className="mb-6 inline-flex">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-full p-4 border border-slate-700/50">
                    <MessageCircle size={32} className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text" />
                  </div>
                </div>
              </div>

              {/* Greeting Text */}
              <h2 className="mb-2 text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hi! I'm Jhon's AI assistant
              </h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Ask me anything about my background, skills, projects, or experience.
              </p>

              {/* Quick Suggestions */}
              <div className="grid grid-cols-2 gap-2 mt-6 max-w-sm">
                <button
                  onClick={() => handleSuggestedQuestion("What are your main skills?")}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 rounded-lg text-xs text-slate-300 hover:text-blue-300 transition group"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1">→</span> Skills
                </button>
                <button
                  onClick={() => handleSuggestedQuestion("Tell me about your projects")}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/50 rounded-lg text-xs text-slate-300 hover:text-purple-300 transition group"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1">→</span> Projects
                </button>
                <button
                  onClick={() => handleSuggestedQuestion("What's your background?")}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-pink-500/50 rounded-lg text-xs text-slate-300 hover:text-pink-300 transition group"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1">→</span> Background
                </button>
                <button
                  onClick={() => handleSuggestedQuestion("What services do you offer?")}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-green-500/50 rounded-lg text-xs text-slate-300 hover:text-green-300 transition group"
                >
                  <span className="opacity-0 group-hover:opacity-100 mr-1">→</span> Services
                </button>
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex animate-fade-in ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-none border border-blue-400/20'
                  : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-slate-100 rounded-bl-none border border-slate-700/50 hover:border-slate-600/50 transition'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
              {message.context && message.context.length > 0 && (
                <div className="mt-3 border-t border-slate-600/30 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1 mb-1 font-semibold opacity-75">
                    <Sparkles size={12} className="text-blue-400" />
                    <span>AI Knowledge Base</span>
                  </div>
                  {message.context.slice(0, 2).map((ctx, i) => (
                    <p key={i} className="opacity-60 hover:opacity-100 transition">
                      • {ctx.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-800/80 p-3 rounded-bl-none border border-slate-700/50">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                <div className="animation-delay-200 h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                <div className="animation-delay-400 h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700/50 bg-gradient-to-t from-slate-950 via-slate-950 to-slate-900/50 p-4 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my background, skills, projects..."
            disabled={loading}
            className="flex-1 rounded-full border border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition transform hover:scale-110 shadow-lg hover:shadow-xl"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
