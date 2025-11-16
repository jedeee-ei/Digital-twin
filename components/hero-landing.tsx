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
                Full Stack Developer with expertise in Next.js, React, and AI integration. I specialize in building modern web applications with MCP servers and RAG systems. Currently focused on creating intelligent digital twin solutions and exploring the future of AI-assisted development.
              </p>

              <div className="grid grid-cols-3 gap-4 py-6">
                <div>
                  <div className="text-3xl font-bold text-blue-400">10+</div>
                  <p className="text-gray-400 text-sm">Projects</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">5+</div>
                  <p className="text-gray-400 text-sm">Technologies</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">∞</div>
                  <p className="text-gray-400 text-sm">Learning</p>
                </div>
              </div>

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">📚 Education</h3>
              <p className="text-gray-400">Certified HTML and CSS Developer with continuous learning in web development and AI technologies. Always exploring new frameworks and best practices.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">🎯 Focus</h3>
              <p className="text-gray-400">Building user-centric applications with modern frameworks. Specialized in MCP server development, RAG systems, and AI-powered web experiences.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">🌟 Values</h3>
              <p className="text-gray-400">Clean code, continuous improvement, and creating meaningful digital experiences. Passionate about open-source and knowledge sharing.</p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">My Journey</h3>
            <div className="space-y-4 text-gray-400">
              <p>
                I started my journey as a web developer with a focus on creating responsive, user-friendly interfaces. Over time, I've expanded my expertise to include full-stack development, covering both frontend and backend technologies.
              </p>
              <p>
                Recently, I've been diving deep into AI integration, particularly with MCP (Model Context Protocol) servers and RAG (Retrieval-Augmented Generation) systems. This led me to create the Digital Twin project - an intelligent assistant that can answer questions about my professional background.
              </p>
              <p>
                I'm passionate about exploring the intersection of AI and web development, and I'm always looking for innovative ways to solve problems and create better user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">Frontend</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Frameworks & Libraries</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Styling</p>
                  <div className="flex flex-wrap gap-2">
                    {['Tailwind CSS', 'CSS3', 'PostCSS'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Core Web</p>
                  <div className="flex flex-wrap gap-2">
                    {['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-purple-400 mb-6">Backend & AI</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Runtime & Servers</p>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express', 'REST APIs'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">AI & MCP</p>
                  <div className="flex flex-wrap gap-2">
                    {['MCP Server', 'Groq API', 'RAG Systems'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Other Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'LLMs', 'Vector Databases'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-green-400 mb-4">Tools & Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {['Git', 'GitHub', 'VS Code', 'npm', 'ESLint', 'TypeScript'].map(tool => (
                  <span key={tool} className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-orange-400 mb-4">Databases & APIs</h4>
              <div className="flex flex-wrap gap-2">
                {['REST APIs', 'Vector DB', 'Upstash', 'JSONRPC'].map(tool => (
                  <span key={tool} className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-pink-400 mb-4">Best Practices</h4>
              <div className="flex flex-wrap gap-2">
                {['Clean Code', 'Testing', 'Documentation', 'Performance'].map(practice => (
                  <span key={practice} className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">
                    {practice}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Digital Twin MCP Server */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition group">
              <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 text-4xl">🤖</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Digital Twin MCP Server</h3>
                <p className="text-gray-400 mb-4 text-sm">An AI-powered Model Context Protocol server that answers questions about professional background using RAG and Groq API integration.</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {['Next.js', 'MCP', 'Groq', 'RAG', 'TypeScript'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="https://github.com/jedeee-ei/Digital-twin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View on GitHub <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Web Development Projects */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition group">
              <div className="h-40 bg-gradient-to-br from-purple-600 to-purple-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 text-4xl">💻</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Modern Web Applications</h3>
                <p className="text-gray-400 mb-4 text-sm">Building responsive, performant web applications with React, Next.js, and Tailwind CSS. Focus on user experience and clean code architecture.</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => setShowChat(true)} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium">
                  Learn More <MessageCircle size={14} />
                </button>
              </div>
            </div>

            {/* AI Agent Development */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-green-500/50 transition group">
              <div className="h-40 bg-gradient-to-br from-green-600 to-green-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 text-4xl">🧠</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">AI Agent Development</h3>
                <p className="text-gray-400 mb-4 text-sm">Developing intelligent AI agents using Model Context Protocol, Groq API, and RAG systems for conversational AI experiences.</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {['Python', 'Groq API', 'Vector DB', 'LLMs'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => setShowChat(true)} className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium">
                  Explore More <MessageCircle size={14} />
                </button>
              </div>
            </div>

            {/* Full Stack Web Development */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-orange-500/50 transition group">
              <div className="h-40 bg-gradient-to-br from-orange-600 to-orange-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 text-4xl">🔧</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Full Stack Solutions</h3>
                <p className="text-gray-400 mb-4 text-sm">End-to-end development solutions including frontend interfaces, backend APIs, and database integration for complete web applications.</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {['Node.js', 'REST APIs', 'Database', 'Deployment'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => setShowChat(true)} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-medium">
                  View Portfolio <MessageCircle size={14} />
                </button>
              </div>
            </div>

            {/* UI/UX Design Implementation */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-pink-500/50 transition group">
              <div className="h-40 bg-gradient-to-br from-pink-600 to-pink-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 text-4xl">🎨</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">UI/UX Implementation</h3>
                <p className="text-gray-400 mb-4 text-sm">Translating design concepts into pixel-perfect, accessible web interfaces. Creating stunning visual experiences with modern CSS techniques.</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {['Figma', 'CSS3', 'Accessibility', 'Responsive Design'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => setShowChat(true)} className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-medium">
                  See Designs <MessageCircle size={14} />
                </button>
              </div>
            </div>

            {/* Performance & Optimization */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition group">
              <div className="h-40 bg-gradient-to-br from-cyan-600 to-cyan-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 text-4xl">⚡</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Performance & Optimization</h3>
                <p className="text-gray-400 mb-4 text-sm">Optimizing applications for speed, scalability, and efficiency. Implementing best practices for performance monitoring and improvement.</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {['Performance', 'SEO', 'Caching', 'Optimization'].map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={() => setShowChat(true)} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                  Learn More <MessageCircle size={14} />
                </button>
              </div>
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
