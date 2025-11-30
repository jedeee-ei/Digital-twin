'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
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
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
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

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
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
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center px-4">
              {/* Robot Icon - SVG */}
              <div className="mb-6 inline-flex">
                <svg width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Head */}
                  <rect x="45" y="50" width="110" height="100" rx="15" fill="#E5E7EB" />
                  {/* Eyes */}
                  <circle cx="75" cy="80" r="12" fill="#1E3A8A" />
                  <circle cx="125" cy="80" r="12" fill="#1E3A8A" />
                  {/* Mouth - curved */}
                  <rect x="60" y="110" width="80" height="12" rx="6" fill="#1E3A8A" opacity="0.3" />
                  {/* Antenna */}
                  <rect x="95" y="10" width="10" height="40" fill="#60A5FA" rx="5" />
                  <circle cx="100" cy="10" r="8" fill="#60A5FA" />
                  {/* Ears */}
                  <rect x="20" y="85" width="20" height="35" rx="10" fill="#60A5FA" />
                  <rect x="160" y="85" width="20" height="35" rx="10" fill="#60A5FA" />
                  {/* Body */}
                  <rect x="40" y="140" width="120" height="50" rx="10" fill="#E5E7EB" />
                  {/* Speech bubble indicator */}
                  <circle cx="160" cy="45" r="6" fill="#60A5FA" opacity="0.8" />
                  <circle cx="175" cy="55" r="5" fill="#60A5FA" opacity="0.6" />
                  <circle cx="170" cy="70" r="4" fill="#60A5FA" opacity="0.4" />
                </svg>
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
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 rounded-full text-xs text-slate-300 hover:text-blue-300 transition font-medium"
                >
                  Skills
                </button>
                <button
                  onClick={() => handleSuggestedQuestion("Tell me about your projects")}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/50 rounded-full text-xs text-slate-300 hover:text-purple-300 transition font-medium"
                >
                  Projects
                </button>
                <button
                  onClick={() => handleSuggestedQuestion("What's your background?")}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-pink-500/50 rounded-full text-xs text-slate-300 hover:text-pink-300 transition font-medium"
                >
                  Background
                </button>
                <button
                  onClick={() => handleSuggestedQuestion("What services do you offer?")}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-green-500/50 rounded-full text-xs text-slate-300 hover:text-green-300 transition font-medium"
                >
                  Services
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
            } items-end gap-2`}
          >
            {message.type === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">🤖</span>
              </div>
            )}
            <div
              className={`max-w-xs px-4 py-2.5 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-none'
                  : 'bg-slate-800/80 text-slate-100 rounded-bl-none border border-slate-700/50'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
              {message.context && message.context.length > 0 && (
                <div className="mt-2 border-t border-slate-600/30 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1 mb-1 font-semibold opacity-75">
                    <Sparkles size={12} />
                    <span>Knowledge Base</span>
                  </div>
                  {message.context.slice(0, 2).map((ctx, i) => (
                    <p key={i} className="opacity-70">
                      • {ctx.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">👤</span>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">🤖</span>
            </div>
            <div className="bg-slate-800/80 rounded-2xl rounded-bl-none p-3 border border-slate-700/50">
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
      <div className="border-t border-slate-700/50 bg-gradient-to-t from-slate-950 via-slate-950 to-slate-900/50 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
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
