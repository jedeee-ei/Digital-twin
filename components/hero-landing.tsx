'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Github, Linkedin, Mail, ExternalLink, Palette, Brush, Wrench, BookOpen, BarChart3, Zap, Code2, Layers, Award, Video, Download, Plus, Edit2, Trash2, CheckCircle, CheckCircle2 } from 'lucide-react'
import DigitalTwinChat from './digital-twin-chat'

declare global {
  interface Window {
    google: any;
  }
}

export default function HeroLanding() {
  const [showChat, setShowChat] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Instructor Login System',
      description: 'Secure authentication portal for instructors and faculty members. Provides credentials-based access to institutional resources and grade management.',
      image: '/spup-instructor-login.jpg',
      tags: ['Authentication', 'Security', 'Credentials'],
      color: 'blue'
    },
    {
      id: 2,
      title: 'Student Dashboard',
      description: 'Comprehensive student portal displaying academic status, scholarship tracking, and application forms. Centralized hub for student information and services.',
      image: '/spup-student-dashboard.jpg',
      tags: ['Dashboard', 'Scholarship', 'Forms'],
      color: 'green'
    },
    {
      id: 3,
      title: 'Office of the Registrar Portal',
      description: 'Official institutional portal showcasing student records management and registration services. Provides secure access to academic records and enrollment information.',
      image: '/spup-registrar-portal.jpg',
      tags: ['Portal', 'Records', 'Registration'],
      color: 'purple'
    }
  ])
  const [newProject, setNewProject] = useState({ title: '', sourceCodeLink: '', image: '', description: '', tags: '' })
  const [loadingTags, setLoadingTags] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  // Check if user is logged in via Google OAuth on component mount
  useEffect(() => {
    const checkGoogleAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        const data = await response.json()
        if (data.isLoggedIn && data.user) {
          setIsLoggedIn(true)
          setEmail(data.user.email)
          setShowLogin(false)
        }
      } catch (error) {
        console.log('Auth check failed:', error)
      }
    }
    checkGoogleAuth()
  }, [])

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id))
    setDeleteConfirmId(null)
  }

  const handleEditProject = (project: typeof projects[0]) => {
    setEditingProjectId(project.id)
    setNewProject({
      title: project.title,
      sourceCodeLink: '',
      image: project.image,
      description: project.description,
      tags: project.tags.join(', ')
    })
    setShowAddProject(true)
  }

  const extractGitHubInfo = async (link: string) => {
    try {
      // Support both GitHub and GitLab links
      const githubMatch = link.match(/github\.com\/([^\/]+)\/([^\/]+)/)
      const gitlabMatch = link.match(/gitlab\.com\/([^\/]+)\/([^\/]+)/)
      
      if (githubMatch) {
        const [, owner, repo] = githubMatch
        const cleanRepo = repo.replace(/\.git$/, '')
        
        // Fetch repo info from GitHub API
        const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`)
        const data = await response.json()
        
        // Generate comprehensive 3-sentence description with insights
        let description = ''
        
        if (data.description) {
          // Sentence 1: Main description
          description = data.description
          if (!description.endsWith('.')) description += '.'
          
          // Sentence 2: Technical insights
          const techInsights: string[] = []
          if (data.language) {
            techInsights.push(`Built with ${data.language}`)
          }
          if (data.topics && data.topics.length > 0) {
            techInsights.push(`focusing on ${data.topics.slice(0, 2).join(' and ')}`)
          }
          
          if (techInsights.length > 0) {
            description += ` ${techInsights.join(', ')}.`
          } else {
            description += ` Developed with modern best practices and clean code.`
          }
          
          // Sentence 3: Community and popularity
          const communityInsights: string[] = []
          if (data.stargazers_count > 0) {
            communityInsights.push(`${data.stargazers_count}+ stars`)
          }
          if (data.forks_count > 0) {
            communityInsights.push(`${data.forks_count}+ forks`)
          }
          if (data.watchers_count > 0) {
            communityInsights.push(`${data.watchers_count}+ watchers`)
          }
          
          if (communityInsights.length > 0) {
            description += ` Trusted by the community with ${communityInsights.join(', ')}.`
          } else {
            description += ` Join the community and start contributing today.`
          }
        } else {
          // Generate from repo name and topics if no description available
          const repoTitle = cleanRepo.replace(/-/g, ' ')
          const topics = data.topics && data.topics.length > 0 ? data.topics.slice(0, 2).join(' and ') : 'software development'
          
          // Sentence 1: Project title and purpose
          description = `${repoTitle.charAt(0).toUpperCase() + repoTitle.slice(1)} project focused on ${topics}.`
          
          // Sentence 2: Technical details
          if (data.language) {
            description += ` Implemented using ${data.language} with best practices and modern architecture.`
          } else {
            description += ` Designed with best practices and modern development standards.`
          }
          
          // Sentence 3: Community engagement
          if (data.stargazers_count > 0 || data.forks_count > 0) {
            const stats = []
            if (data.stargazers_count > 0) stats.push(`${data.stargazers_count}+ stars`)
            if (data.forks_count > 0) stats.push(`${data.forks_count}+ forks`)
            description += ` Experience the project with ${stats.join(' and ')}.`
          } else {
            description += ` Explore, learn, and contribute to this innovative project.`
          }
        }
        
        // Extract tags from topics or language
        const extractedTags: string[] = []
        if (data.language) extractedTags.push(data.language)
        if (data.topics && data.topics.length > 0) extractedTags.push(...data.topics.slice(0, 3))
        
        setNewProject(prev => ({
          ...prev,
          description: description,
          tags: extractedTags.join(', ')
        }))
      } else if (gitlabMatch) {
        const [, owner, repo] = gitlabMatch
        const cleanRepo = repo.replace(/\.git$/, '')
        
        // For GitLab, provide a comprehensive 3-sentence description
        const repoTitle = cleanRepo.replace(/-/g, ' ')
        const description = `${repoTitle.charAt(0).toUpperCase() + repoTitle.slice(1)} project from GitLab. A comprehensive solution designed for project management, collaboration, and modern development workflows. Built to streamline team workflows and enhance productivity across your development cycle.`
        const extractedTags = [cleanRepo.split('-').pop() || 'Project']
        
        setNewProject(prev => ({
          ...prev,
          description: description,
          tags: extractedTags.join(', ')
        }))
      }
    } catch (error) {
      console.log('Could not auto-fetch repo info:', error)
      // Set default description if API fails
      setNewProject(prev => ({
        ...prev,
        description: 'Interesting project. Check it out!',
        tags: 'Project'
      }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setNewProject(prev => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSourceCodeLinkChange = (link: string) => {
    setNewProject(prev => ({ ...prev, sourceCodeLink: link }))
    if (link.includes('github.com') || link.includes('gitlab.com')) {
      setLoadingTags(true)
      extractGitHubInfo(link).finally(() => setLoadingTags(false))
    }
  }

  const handleAddProject = () => {
    if (editingProjectId !== null) {
      // Update existing project
      const tagsArray = newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      setProjects(projects.map(p => 
        p.id === editingProjectId 
          ? { ...p, image: newProject.image, description: newProject.description, tags: tagsArray.length > 0 ? tagsArray : ['Project'] }
          : p
      ))
      setEditingProjectId(null)
      setNewProject({ title: '', sourceCodeLink: '', image: '', description: '', tags: '' })
      setShowAddProject(false)
    } else if (newProject.image && newProject.sourceCodeLink) {
      // Add new project
      const tagsArray = newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      const colors = ['blue', 'green', 'purple', 'pink', 'cyan', 'orange', 'red', 'indigo']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      
      // Extract project title from source code link
      const githubMatch = newProject.sourceCodeLink.match(/github\.com\/([^\/]+)\/([^\/]+)/)
      const gitlabMatch = newProject.sourceCodeLink.match(/gitlab\.com\/([^\/]+)\/([^\/]+)/)
      let projectTitle = 'New Project'
      
      if (githubMatch) {
        projectTitle = githubMatch[2].replace(/\.git$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      } else if (gitlabMatch) {
        projectTitle = gitlabMatch[2].replace(/\.git$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      }
      
      setProjects([...projects, {
        id: projects.length + 1,
        title: projectTitle,
        description: newProject.description || 'Amazing project',
        image: newProject.image,
        tags: tagsArray.length > 0 ? tagsArray : ['Project'],
        color: randomColor
      }])
      setNewProject({ title: '', sourceCodeLink: '', image: '', description: '', tags: '' })
      setShowAddProject(false)
    }
  }

  const generateResume = () => {
    // Dynamic import of html2pdf to avoid SSR issues
    import('html2pdf.js').then(() => {
      // Create a canvas-based profile image placeholder with initials
      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 200
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 200, 200)
        gradient.addColorStop(0, '#1e5f74')
        gradient.addColorStop(1, '#2a7f8f')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 200, 200)
        
        // Draw circle
        ctx.fillStyle = '#d4a574'
        ctx.beginPath()
        ctx.arc(100, 100, 95, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw initials
        ctx.fillStyle = '#1e5f74'
        ctx.font = 'bold 80px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('JD', 100, 100)
      }
      
      const profileImageData = canvas.toDataURL('image/png')

      const element = document.createElement('div')
      element.innerHTML = `
        <div style="font-family: 'Arial', sans-serif; width: 8.5in; height: 11in; margin: 0; padding: 0; display: flex; background: white; overflow: hidden;">
          <!-- Left Column -->
          <div style="width: 35%; background: linear-gradient(135deg, #1e5f74 0%, #2a7f8f 100%); color: white; padding: 0.2in 0.3in; box-sizing: border-box; display: flex; flex-direction: column; overflow-y: auto;">
            <!-- Profile Image -->
            <div style="width: 120px; height: 120px; margin: 0 auto 0.2in; border-radius: 50%; border: 3px solid #d4a574; background: #444; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
              <img src="${profileImageData}" alt="Jhon Danver" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
            </div>

            <!-- Name -->
            <h1 style="margin: 0 0 0.02in 0; font-size: 32px; font-weight: bold; text-align: center; line-height: 1.1; flex-shrink: 0;">Jhon</h1>
            <h1 style="margin: 0 0 0.04in 0; font-size: 32px; font-weight: bold; text-align: center; line-height: 1.1; flex-shrink: 0;">Danver</h1>
            <p style="margin: 0 0 0.08in 0; font-size: 14px; text-align: center; color: #d4a574; font-weight: bold; flex-shrink: 0;">Web Developer & Designer</p>

            <!-- Summary -->
            <div style="margin-bottom: 0.1in;">
              <h3 style="margin: 0 0 0.03in 0; font-size: 13px; font-weight: bold; color: #d4a574; border-bottom: 2px solid #d4a574; padding-bottom: 0.03in; text-transform: uppercase;">SUMMARY</h3>
              <p style="margin: 0; font-size: 11px; line-height: 1.35; text-align: justify; color: #e8f0f5;">Highly efficient and capable web designer with expertise in HTML, CSS, and graphic design. Passionate about creating responsive, user-centric solutions with 2 years of hands-on experience.</p>
            </div>

            <!-- Core Competencies -->
            <div style="margin-bottom: 0.08in;">
              <h3 style="margin: 0 0 0.03in 0; font-size: 13px; font-weight: bold; color: #d4a574; border-bottom: 2px solid #d4a574; padding-bottom: 0.03in; text-transform: uppercase;">CORE COMPETENCIES</h3>
              <div style="font-size: 10px; line-height: 1.5;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.06in;">
                  <span>HTML/CSS Design</span>
                  <span style="color: #d4a574; font-weight: bold;">10</span>
                </div>
                <div style="width: 100%; height: 5px; background: rgba(255,255,255,0.2); border-radius: 2px; margin-bottom: 0.08in;"><div style="width: 100%; height: 100%; background: #d4a574; border-radius: 2px;"></div></div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.06in;">
                  <span>UI/UX Design</span>
                  <span style="color: #d4a574; font-weight: bold;">9</span>
                </div>
                <div style="width: 100%; height: 5px; background: rgba(255,255,255,0.2); border-radius: 2px; margin-bottom: 0.08in;"><div style="width: 90%; height: 100%; background: #d4a574; border-radius: 2px;"></div></div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.06in;">
                  <span>Graphic Design</span>
                  <span style="color: #d4a574; font-weight: bold;">9</span>
                </div>
                <div style="width: 100%; height: 5px; background: rgba(255,255,255,0.2); border-radius: 2px; margin-bottom: 0.08in;"><div style="width: 90%; height: 100%; background: #d4a574; border-radius: 2px;"></div></div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.06in;">
                  <span>Problem-solving</span>
                  <span style="color: #d4a574; font-weight: bold;">10</span>
                </div>
                <div style="width: 100%; height: 5px; background: rgba(255,255,255,0.2); border-radius: 2px;"><div style="width: 100%; height: 100%; background: #d4a574; border-radius: 2px;"></div></div>
              </div>
            </div>

            <!-- Personal Information -->
            <div style="margin-bottom: 0.08in;">
              <h3 style="margin: 0 0 0.03in 0; font-size: 13px; font-weight: bold; color: #d4a574; border-bottom: 2px solid #d4a574; padding-bottom: 0.03in; text-transform: uppercase;">PERSONAL INFO</h3>
              <div style="font-size: 10px; line-height: 1.5; color: #e8f0f5;">
                <p style="margin: 0 0 0.02in 0;"><strong>Age:</strong> 20 years old</p>
                <p style="margin: 0 0 0.02in 0;"><strong>DOB:</strong> December 05, 2004</p>
                <p style="margin: 0 0 0.02in 0;"><strong>Languages:</strong> English, Filipino</p>
                <p style="margin: 0;"><strong>Citizenship:</strong> Filipino</p>
              </div>
            </div>

            <!-- Languages & Interests -->
            <div style="margin-bottom: 0.08in;">
              <h3 style="margin: 0 0 0.03in 0; font-size: 13px; font-weight: bold; color: #d4a574; border-bottom: 2px solid #d4a574; padding-bottom: 0.03in; text-transform: uppercase;">INTERESTS</h3>
              <p style="margin: 0; font-size: 10px; line-height: 1.4; color: #e8f0f5;">Web Design • UI/UX • Graphic Design • AI Technology • System Architecture • Digital Innovation</p>
            </div>

            <!-- Contact Info -->
            <div style="margin-top: auto; font-size: 11px; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.06in; color: #e8f0f5; flex-shrink: 0;">
              <p style="margin: 0; color: #d4a574; font-weight: bold;">📍 Philippines</p>
              <p style="margin: 0.01in 0 0 0; word-break: break-word;">📧 jhonabogado@spup.edu.ph</p>
              <p style="margin: 0.01in 0 0 0; word-break: break-word;">🔗 linkedin.com/in/jhon-danver-abogado</p>
              <p style="margin: 0.01in 0 0 0; word-break: break-word;">🐙 github.com/jedeee-ei</p>
            </div>
          </div>

          <!-- Right Column -->
          <div style="width: 65%; padding: 0.2in 0.3in; box-sizing: border-box; display: flex; flex-direction: column; overflow-y: auto; font-size: 11px;">
            <!-- Header -->
            <div style="margin-bottom: 0.08in; border-bottom: 2px solid #d4a574; padding-bottom: 0.06in; flex-shrink: 0;">
              <h2 style="margin: 0; font-size: 26px; font-weight: bold; color: #1e5f74;">Jhon Danver Abogado</h2>
              <p style="margin: 0.02in 0 0 0; font-size: 13px; color: #999;">Web Developer & Designer | 21 years old</p>
              <div style="font-size: 10px; color: #999; margin-top: 0.02in; line-height: 1.3;">
                <span style="color: #1e5f74;">■</span> Philippines | <span style="color: #0066cc;">●</span> jhonabogado@spup.edu.ph
              </div>
            </div>

            <!-- About Me -->
            <div style="margin-bottom: 0.06in;">
              <h3 style="margin: 0 0 0.02in 0; font-size: 13px; font-weight: bold; color: #1e5f74; border-bottom: 2px solid #d4a574; padding-bottom: 0.02in;">👤 ABOUT ME</h3>
              <p style="margin: 0; font-size: 10px; line-height: 1.3; color: #555;">A passionate web developer and designer combining technical expertise with artistic vision to create innovative digital solutions.</p>
            </div>

            <!-- Work Experience -->
            <div style="margin-bottom: 0.06in;">
              <h3 style="margin: 0 0 0.03in 0; font-size: 13px; font-weight: bold; color: #1e5f74; border-bottom: 2px solid #d4a574; padding-bottom: 0.02in;">📋 WORK EXPERIENCE</h3>
              
              <div style="margin-bottom: 0.04in;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.01in;">
                  <h4 style="margin: 0; font-size: 11px; font-weight: bold; color: #333;">Instructor Login System</h4>
                  <span style="font-size: 9px; color: #999;">2024 - Present</span>
                </div>
                <p style="margin: 0; font-size: 9px; color: #666; font-style: italic;">Saint Paul University Philippines</p>
                <p style="margin: 0.01in 0 0 0; font-size: 9px; color: #555; line-height: 1.3;">Contributed to secure authentication portal for instructors.</p>
              </div>

              <div style="margin-bottom: 0.04in;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.01in;">
                  <h4 style="margin: 0; font-size: 11px; font-weight: bold; color: #333;">Student Dashboard</h4>
                  <span style="font-size: 9px; color: #999;">2024 - Present</span>
                </div>
                <p style="margin: 0; font-size: 9px; color: #666; font-style: italic;">Saint Paul University Philippines</p>
                <p style="margin: 0.01in 0 0 0; font-size: 9px; color: #555; line-height: 1.3;">Developed comprehensive student portal with academic tracking.</p>
              </div>

              <div style="margin-bottom: 0.06in;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.01in;">
                  <h4 style="margin: 0; font-size: 11px; font-weight: bold; color: #333;">Registrar Portal</h4>
                  <span style="font-size: 9px; color: #999;">2024 - Present</span>
                </div>
                <p style="margin: 0; font-size: 9px; color: #666; font-style: italic;">Saint Paul University Philippines</p>
                <p style="margin: 0.01in 0 0 0; font-size: 9px; color: #555; line-height: 1.3;">Implemented secure student records management system.</p>
              </div>
            </div>

            <!-- Education -->
            <div style="margin-bottom: 0.04in;">
              <h3 style="margin: 0 0 0.02in 0; font-size: 13px; font-weight: bold; color: #1e5f74; border-bottom: 2px solid #d4a574; padding-bottom: 0.02in;">🎓 EDUCATION</h3>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.01in;">
                <h4 style="margin: 0; font-size: 11px; font-weight: bold; color: #333;">Bachelor of Science in IT</h4>
                <span style="font-size: 9px; color: #999;">In Progress</span>
              </div>
              <p style="margin: 0; font-size: 9px; color: #666;">Saint Paul University Philippines</p>
            </div>

            <!-- Skills -->
            <div>
              <h3 style="margin: 0 0 0.02in 0; font-size: 13px; font-weight: bold; color: #1e5f74; border-bottom: 2px solid #d4a574; padding-bottom: 0.02in;">💼 SKILLS</h3>
              <div style="font-size: 10px; line-height: 1.3;">
                <p style="margin: 0 0 0.02in 0;"><strong style="color: #1e5f74;">Web Design:</strong> HTML, CSS, UI/UX, Responsive Design</p>
                <p style="margin: 0 0 0.02in 0;"><strong style="color: #1e5f74;">Graphic Design:</strong> Figma, Photoshop, Illustrator, Canva</p>
                <p style="margin: 0;"><strong style="color: #1e5f74;">Certifications:</strong> Certified HTML & CSS Developer</p>
              </div>
            </div>
          </div>
        </div>
      `

      const opt = {
        margin: 0,
        filename: 'Jhon_Danver_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { format: 'letter', orientation: 'portrait' },
      }

      // Use html2pdf to generate PDF
      const html2pdf = (window as any).html2pdf
      if (html2pdf) {
        html2pdf().set(opt).from(element).save()
      }
    })
  }

  // Dummy account credentials
  const dummyCredentials = {
    email: 'admin@example.com',
    password: 'password123'
  }

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (email === dummyCredentials.email && password === dummyCredentials.password) {
      setIsLoggedIn(true)
      setShowLogin(false)
      setEmail('')
      setPassword('')
    } else {
      setLoginError('Invalid email or password. Try admin@example.com / password123')
    }
  }

  // Handle Google Sign In - OAuth flow
  const handleGoogleSignIn = () => {
    window.location.href = '/api/auth/google?action=signin'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Login Modal */}
      {showLogin && !isLoggedIn && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-6 max-w-md w-full border border-slate-700/50 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h1 className="text-2xl font-bold text-white text-center mb-1">Welcome Back</h1>
            <p className="text-gray-400 text-center text-sm mb-6">Sign in to access AI Chat and Projects</p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-3 mb-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-red-400 text-xs">
                  {loginError}
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 text-sm rounded-lg transition"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-700"></div>
              <span className="text-gray-400 text-xs">Or continue with</span>
              <div className="flex-1 h-px bg-slate-700"></div>
            </div>

            {/* Google Sign In - Redirect to Google */}
            <button 
              onClick={handleGoogleSignIn}
              className="w-full border border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 rounded-lg py-2 px-3 text-white font-semibold flex items-center justify-center gap-2 transition mb-4 text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-slate-700"></div>
              <span className="text-gray-400 text-xs">Why sign in?</span>
              <div className="flex-1 h-px bg-slate-700"></div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Access AI Chatbot</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Chat with my digital twin to get instant answers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Personalized Experience</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Your conversations are automatically saved.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Manage Projects</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">Add, edit, and showcase your own projects.</p>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <button
              onClick={() => setShowLogin(false)}
              className="w-full text-gray-400 hover:text-gray-300 transition text-xs py-1"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-6 max-w-sm w-full border border-slate-700/50 shadow-2xl">
            {/* Icon */}
            <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-xl">!</span>
              </div>
            </div>

            {/* Header */}
            <h2 className="text-xl font-bold text-white text-center mb-1">Confirm Logout</h2>
            <p className="text-gray-400 text-center text-sm mb-6">Are you sure you want to log out? You'll need to sign in again.</p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/auth/logout', { method: 'POST' })
                  } catch (error) {
                    console.error('Logout API call failed:', error)
                  }
                  setIsLoggedIn(false)
                  setShowLogoutConfirm(false)
                  setShowChat(false)
                  setEmail('')
                  setPassword('')
                }}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-sm rounded-lg transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Jhon Danver
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="#home" className="text-gray-300 hover:text-white transition">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#skills" className="text-gray-300 hover:text-white transition">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
            <button 
              onClick={() => {
                if (isLoggedIn) {
                  setShowLogoutConfirm(true)
                } else {
                  setShowLogin(true)
                }
              }} 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              {isLoggedIn ? 'Log Out' : 'Sign In'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Jhon Danver</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Certified HTML and CSS Developer | Web Designer | Student
                </p>
              </div>

              <p className="text-lg text-gray-400 leading-relaxed">
                I am a passionate web designer and student who enjoys designing responsive websites and creative visual content. With expertise in HTML, CSS, and graphic design, I specialize in UI/UX design and building systems that streamline complex processes.
              </p>

              <div className="grid grid-cols-3 gap-4 py-6">
                <div>
                  <div className="text-3xl font-bold text-blue-400">2</div>
                  <p className="text-gray-400 text-sm">Years HTML/CSS</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">3</div>
                  <p className="text-gray-400 text-sm">Major Projects</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">2</div>
                  <p className="text-gray-400 text-sm">Certifications</p>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowLogin(true);
                    } else {
                      setShowChat(true);
                    }
                  }}
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

          {/* Right Column - Profile Image */}
          <div className="relative h-fit flex justify-center lg:justify-end lg:pr-0">
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-96 h-96">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 blur-2xl"></div>
                
                {/* Outer Border Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border"></div>
                
                {/* Image Container with Inner Border */}
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-full p-2 overflow-hidden border-2 border-blue-400/50">
                  <img 
                    src="/profile.jpg" 
                    alt="Jhon Danver" 
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 rounded-full"></div>
                </div>

                {/* Badge */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg whitespace-nowrap">
                  Web Developer & Designer
                </div>
              </div>

              {/* Download Resume Button - Below Profile Picture */}
              <button
                onClick={generateResume}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition transform hover:scale-105 flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </button>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition">
              <Palette className="w-8 h-8 mb-3 text-blue-400" />
              <h3 className="text-xl font-semibold text-white mb-2">Web Design Expert</h3>
              <p className="text-gray-400">Certified in HTML and CSS with 2 years of expertise in responsive web design and UI/UX</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition">
              <Brush className="w-8 h-8 mb-3 text-purple-400" />
              <h3 className="text-xl font-semibold text-white mb-2">Graphic Designer</h3>
              <p className="text-gray-400">Creative visual design specializing in poster design, branding, and visual communication</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition">
              <Wrench className="w-8 h-8 mb-3 text-green-400" />
              <h3 className="text-xl font-semibold text-white mb-2">System Builder</h3>
              <p className="text-gray-400">Designing and developing comprehensive management and analytics systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
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
            <h3 className="text-2xl font-semibold text-white mb-4">My Journey</h3>
            <div className="space-y-4 text-gray-400">
              <p>
                I am a student at Saint Paul University Philippines, pursuing a Bachelor of Science in Information Technology. As a Certified HTML and CSS Developer with 2 years of hands-on experience, I've developed a strong foundation in web design and responsive development.
              </p>
              <p>
                Beyond web development, I'm passionate about graphic design and visual communication. I work with tools like Figma, Adobe Photoshop, and Adobe Illustrator to create compelling visual content. I also have beginner-level experience in video editing with tools like Adobe Premiere Pro and DaVinci Resolve.
              </p>
              <p>
                My goal is to become a lead UI/UX designer or front-end specialist in a creative and innovative company. I'm focused on learning modern web layout techniques, design systems, accessibility, and continuously improving my visual design skills. I believe in creating user-centric solutions that solve real-world problems.
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
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">Web Design</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Core Languages (Expert)</p>
                  <div className="flex flex-wrap gap-2">
                    {['HTML', 'CSS'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {['UI/UX Design', 'Responsive Design', 'Web Layout', 'Color Theory', 'Typography'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-purple-400 mb-6">Design & Creative</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Graphic Design (Advanced)</p>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">Graphic Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {['Poster Design', 'Branding', 'Visual Communication', 'Layout Design'].map(skill => (
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
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-green-400" />
                <h4 className="text-lg font-semibold text-green-400">Soft Skills</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Creativity', 'Attention to Detail', 'Visual Communication', 'Problem-solving', 'Collaborative Design'].map(tool => (
                  <span key={tool} className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-orange-400" />
                <h4 className="text-lg font-semibold text-orange-400">Certifications</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Certified HTML Developer', 'Certified CSS Developer'].map(tool => (
                  <span key={tool} className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-6 h-6 text-pink-400" />
                <h4 className="text-lg font-semibold text-pink-400">Video Editing (Beginner)</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Adobe Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Color Grading'].map(practice => (
                  <span key={practice} className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">
                    {practice}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - St. Paul University */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
            <p className="text-gray-400 max-w-2xl">Contributed to critical institutional systems and student services at St. Paul University Philippines</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => {
              const colorMap = {
                blue: { border: 'hover:border-blue-500/50', shadow: 'hover:shadow-blue-500/10', bg: 'from-blue-900', tags: 'bg-blue-500/20 text-blue-300' },
                green: { border: 'hover:border-green-500/50', shadow: 'hover:shadow-green-500/10', bg: 'from-green-900', tags: 'bg-green-500/20 text-green-300' },
                purple: { border: 'hover:border-purple-500/50', shadow: 'hover:shadow-purple-500/10', bg: 'from-purple-900', tags: 'bg-purple-500/20 text-purple-300' },
                pink: { border: 'hover:border-pink-500/50', shadow: 'hover:shadow-pink-500/10', bg: 'from-pink-900', tags: 'bg-pink-500/20 text-pink-300' },
                cyan: { border: 'hover:border-cyan-500/50', shadow: 'hover:shadow-cyan-500/10', bg: 'from-cyan-900', tags: 'bg-cyan-500/20 text-cyan-300' },
                orange: { border: 'hover:border-orange-500/50', shadow: 'hover:shadow-orange-500/10', bg: 'from-orange-900', tags: 'bg-orange-500/20 text-orange-300' },
                red: { border: 'hover:border-red-500/50', shadow: 'hover:shadow-red-500/10', bg: 'from-red-900', tags: 'bg-red-500/20 text-red-300' },
                indigo: { border: 'hover:border-indigo-500/50', shadow: 'hover:shadow-indigo-500/10', bg: 'from-indigo-900', tags: 'bg-indigo-500/20 text-indigo-300' }
              }
              const colors = colorMap[project.color as keyof typeof colorMap] || colorMap.blue
              
              return (
                <div key={project.id} className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden ${colors.border} transition group shadow-lg hover:shadow-xl ${colors.shadow} relative`}>
                  {/* Edit and Delete buttons */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition z-10">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 bg-slate-900/80 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition"
                      title="Edit project"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      className="p-2 bg-slate-900/80 hover:bg-red-600 text-gray-300 hover:text-white rounded-lg transition"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className={`h-48 bg-gradient-to-br ${colors.bg} to-gray-900 overflow-hidden relative`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 brightness-90 group-hover:brightness-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className={`px-2 py-1 text-xs ${colors.tags} rounded`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {/* Add Project Button */}
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setShowLogin(true);
                } else {
                  setShowAddProject(true);
                }
              }}
              className="bg-slate-800/50 backdrop-blur border border-dashed border-slate-600 rounded-xl overflow-hidden hover:border-slate-500 transition group shadow-lg hover:shadow-xl hover:shadow-slate-500/10 flex items-center justify-center min-h-96 cursor-pointer hover:bg-slate-800/70"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-600 transition">
                  <Plus size={48} className="text-gray-400 group-hover:text-gray-300 transition" />
                </div>
                <p className="text-gray-300 font-semibold text-lg">Add Project</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-slate-700/50 p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Delete Project?</h3>
              <p className="text-gray-400">Are you sure you want to delete this project? This action cannot be undone.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-white font-semibold rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(deleteConfirmId)}
                className="flex-1 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-slate-700/50 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h3>
              <button
                onClick={() => {
                  setShowAddProject(false)
                  setEditingProjectId(null)
                  setNewProject({ title: '', sourceCodeLink: '', image: '', description: '', tags: '' })
                }}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2\">Project Image * (Upload)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-800/30 hover:bg-slate-800/50 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {newProject.image ? (
                        <>
                          <img src={newProject.image} alt="preview" className="w-20 h-20 object-cover rounded mb-2" />
                          <p className="text-xs text-gray-400">Click to change image</p>
                        </>
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <p className="text-sm text-gray-400">Click to upload image</p>
                        </>
                      )}
                    </div>
                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Source Code Link (GitHub/GitLab)</label>
                <input
                  type="text"
                  placeholder="https://github.com/username/repository"
                  value={newProject.sourceCodeLink}
                  onChange={(e) => handleSourceCodeLinkChange(e.target.value)}
                  disabled={loadingTags}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 transition disabled:opacity-50"
                />
                {loadingTags && <p className="text-xs text-blue-400 mt-1">Fetching repository information...</p>}
              </div>

              {newProject.description && (
                <div>
                  <div className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-gray-300 resize-none">
                    <p className="text-sm leading-relaxed">{newProject.description}</p>
                  </div>
                </div>
              )}

              {newProject.tags && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tags (Auto-extracted)</label>
                  <div className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {newProject.tags.split(',').map((tag, idx) => (
                        <span key={idx} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-md text-xs font-medium border border-green-500/30">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddProject}
                  className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition transform hover:scale-105"
                >
                  {editingProjectId ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  onClick={() => setShowAddProject(false)}
                  className="flex-1 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-white font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                I'm always excited to discuss AI projects, robotics innovations, or potential collaborations. Whether you're looking for an AI developer, data analyst, or just want to chat about technology, feel free to reach out!
              </p>

              <div className="space-y-4">
                {/* Email */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-purple-500/50 transition">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <a href="mailto:jhonabogado@spup.edu.ph" className="text-gray-300 hover:text-purple-400 transition">
                        jhonabogado@spup.edu.ph
                      </a>
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-purple-500/50 transition">
                  <div className="flex items-start gap-4">
                    <Linkedin className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">LinkedIn</h3>
                      <a href="https://www.linkedin.com/in/jhon-danver-abogado-abb196396/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                        www.linkedin.com/in/jhon-danver-abogado <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* GitHub */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-purple-500/50 transition">
                  <div className="flex items-start gap-4">
                    <Github className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-white mb-1">GitHub</h3>
                      <a href="https://github.com/jedeee-ei" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2">
                        github.com/jedeee-ei <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-xl p-8 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Send Message
                </button>
              </form>
            </div>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end p-4">
          <div className="w-full max-w-md md:max-w-lg h-[600px] md:h-[650px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col overflow-hidden hover:border-slate-600/50 transition">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-5 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Virtual Jhon Danver</h3>
                  <p className="text-sm text-blue-100">Ask me anything about my background</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition transform hover:scale-110"
                aria-label="Close chat"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden bg-gradient-to-b from-slate-900/50 to-slate-950/50">
              <DigitalTwinChat />
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => {
            if (!isLoggedIn) {
              setShowLogin(true);
            } else {
              setShowChat(true);
            }
          }}
          className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-out"
          aria-label="Open chat"
        >
          <MessageCircle size={32} className="text-white" />
        </button>
      )}
    </div>
  )
}
