'use client'

import { useState } from 'react'
import { MessageCircle, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import DigitalTwinChat from './digital-twin-chat'

export default function HeroLanding() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Digital Twin
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#skills" className="text-gray-300 hover:text-white transition">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Jhon Danver</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Certified HTML and CSS Developer | Web Developer | AI Agent Enthusiast
                </p>
              </div>

              <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                I build modern web applications and AI-powered solutions. Passionate about creating seamless user experiences and exploring the intersection of AI and web development.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setShowChat(true)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition transform hover:scale-105 flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  Ask My Digital Twin
                </button>
                <a
                  href="#contact"
                  className="px-8 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-white font-semibold rounded-lg transition"
                >
                  Get In Touch
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/jedeee-ei"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jhon-danver-abogado-abb196396/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:jhonabogado@spup.edu.ph"
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-400 hover:text-white transition"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            {/* Right Side - Feature Cards */}
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-xl font-semibold text-white mb-2">Full Stack Developer</h3>
                <p className="text-gray-400">Building modern web applications with Next.js, React, and TypeScript</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="text-xl font-semibold text-white mb-2">AI Integration</h3>
                <p className="text-gray-400">Implementing MCP servers and RAG systems with Groq API</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="text-xl font-semibold text-white mb-2">Problem Solver</h3>
                <p className="text-gray-400">Creating innovative solutions with clean, maintainable code</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">📚 Education</h3>
              <p className="text-gray-400">Certified HTML and CSS Developer with continuous learning in web development and AI technologies</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">🎯 Focus</h3>
              <p className="text-gray-400">Building user-centric applications with modern frameworks and exploring AI integration opportunities</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">🌟 Values</h3>
              <p className="text-gray-400">Code quality, continuous improvement, and creating meaningful digital experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">Frontend</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-400 mb-6">Backend & AI</h3>
              <div className="flex flex-wrap gap-3">
                {['Node.js', 'MCP Server', 'Groq API', 'RAG Systems', 'Python', 'REST APIs'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition">
              <h3 className="text-2xl font-semibold text-white mb-3">Digital Twin MCP Server</h3>
              <p className="text-gray-400 mb-4">An AI-powered Model Context Protocol server that answers questions about my professional background using RAG and Groq API.</p>
              <div className="flex gap-2 flex-wrap">
                {['Next.js', 'MCP', 'Groq', 'RAG'].map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a href="https://github.com/jedeee-ei/Digital-twin" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                View on GitHub <ExternalLink size={16} />
              </a>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition">
              <h3 className="text-2xl font-semibold text-white mb-3">Web Development Projects</h3>
              <p className="text-gray-400 mb-4">Building responsive, modern web applications with focus on user experience and performance optimization.</p>
              <div className="flex gap-2 flex-wrap">
                {['React', 'TypeScript', 'Tailwind'].map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <button onClick={() => setShowChat(true)} className="mt-4 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                Learn More <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Work Together</h2>
          <p className="text-xl text-gray-400 mb-8">
            Have a project in mind? Want to collaborate? Feel free to reach out!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:jhonabogado@spup.edu.ph"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition transform hover:scale-105"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/jhon-danver-abogado-abb196396/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-white font-semibold rounded-lg transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-110 z-30"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4">
          <div className="w-full md:w-96 h-[600px] md:h-[700px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-white">Digital Twin</h3>
                <p className="text-sm text-blue-100">Ask me anything about my background</p>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
                aria-label="Close chat"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden">
              <DigitalTwinChat />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
