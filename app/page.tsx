'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  ShieldCheck,
  Lock,
  Zap,
  Database,
  Eye,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  Upload,
  ArrowRight,
  BarChart3,
  Code2,
  Blocks,
  Network,
  FileCheck,
  AlertTriangle,
  Star,
} from 'lucide-react'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: any[] = []
    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(0, 191, 255, 0.1)'
      ctx.lineWidth = 1

      particles.forEach((p, i) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        ctx.fillStyle = `rgba(0, 191, 255, ${0.3 + Math.random() * 0.3})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.1 * (1 - distance / 100)})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-1"
        style={{
          background: 'radial-gradient(circle, rgba(0, 191, 255, 0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: mousePos.x - 192,
          y: mousePos.y - 192,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
    </>
  )
}

const CountUpNumber = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration])

  return <>{count}</>
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [activeUseCase, setActiveUseCase] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const scrollVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <main className="relative bg-black text-white overflow-hidden">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/75 border-b border-cyan-400/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/logo.png" alt="Decentralized Forensics" width={32} height={32} />
            <span className="text-sm font-semibold tracking-tight">Decentralized Forensics</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Security', 'Use Cases', 'FAQ'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs text-slate-400 hover:text-cyan-400 transition-colors tracking-wide"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              className="px-5 py-2 text-xs font-medium rounded-lg border border-white/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-black hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-cyan-400/10 bg-black/95 backdrop-blur"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="px-6 py-4 space-y-3">
              {['Features', 'Security', 'Use Cases', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 mb-8"
          variants={itemVariants}
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-cyan-400 tracking-widest">POWERED BY AI & BLOCKCHAIN</span>
        </motion.div>

        {/* Logo with Rings */}
        <motion.div className="relative mb-12 w-32 h-32" variants={itemVariants}>
          <motion.div
            className="absolute inset-0 border border-cyan-400/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-8 border-2 border-dashed border-cyan-400/5 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={128}
              height={128}
              className="drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]"
            />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-serif mb-6 max-w-3xl leading-tight"
          variants={itemVariants}
        >
          <span className="text-cyan-400 text-glow">Digital Truth,</span>
          <br />
          Permanently proven.
        </motion.h1>

        <motion.p
          className="text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Enterprise-grade blockchain forensics and digital trust platform. Detect, prevent, and respond to threats with AI-powered analysis.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 mb-16" variants={itemVariants}>
          <motion.button
            className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 text-black hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial <ArrowRight size={18} />
          </motion.button>
          <motion.button
            className="px-8 py-3 rounded-lg font-semibold border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/5 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Demo
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div className="flex flex-col sm:flex-row gap-8 justify-center" variants={itemVariants}>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CheckCircle size={16} className="text-cyan-400" />
            <span>100M+ Transactions Analyzed</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CheckCircle size={16} className="text-cyan-400" />
            <span>
              <CountUpNumber target={50} /> M+ Users
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CheckCircle size={16} className="text-cyan-400" />
            <span>
              <CountUpNumber target={99} />% Threats Detected
            </span>
          </div>
        </motion.div>
      </motion.section>

      {/* Trusted By */}
      <motion.section
        className="relative z-10 py-16 px-6 border-y border-cyan-400/10 bg-black/50 backdrop-blur"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-slate-500 text-center mb-8 tracking-widest">TRUSTED BY LEADING ENTERPRISES</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {['OpenAI', 'Stripe', 'Vercel', 'Linear', 'Figma'].map((company) => (
              <motion.div
                key={company}
                className="flex items-center justify-center px-4 py-3 rounded-lg border border-cyan-400/10 bg-cyan-400/5 text-sm font-medium text-slate-300 hover:border-cyan-400/30 transition-all"
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 191, 255, 0.3)' }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Problem Section */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-widest">THE PROBLEM</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6">
            Digital evidence is fragile and <span className="text-cyan-400">easily manipulated</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Without cryptographic proof, any digital file can be altered, spoofed, or deepfaked.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-cyan-400/10 border border-cyan-400/10 rounded-2xl overflow-hidden p-px">
          {[
            {
              icon: AlertTriangle,
              title: 'Deepfake Risk',
              desc: 'Videos and images can be artificially generated',
            },
            {
              icon: Lock,
              title: 'No Proof of Authenticity',
              desc: 'No way to verify a file hasnt been tampered with',
            },
            {
              icon: Eye,
              title: 'Forensic Blindness',
              desc: 'Traditional methods cant detect advanced manipulation',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-black/50 backdrop-blur p-8 border-r border-b border-cyan-400/10 last:border-r-0 last:border-b-0 hover:bg-cyan-400/5 transition-all"
              variants={itemVariants}
            >
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <item.icon size={20} className="text-red-400" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Workflow Section */}
      <motion.section
        className="relative z-10 max-w-4xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-widest">HOW IT WORKS</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            The infrastructure layer for <span className="text-cyan-400">digital evidence</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {[
            {
              title: 'Upload File',
              desc: 'Submit any digital file - image, video, document, or contract',
            },
            {
              title: 'AI Analysis',
              desc: 'Our AI model analyzes pixel-level patterns and metadata for signs of tampering',
            },
            {
              title: 'Cryptographic Hash',
              desc: 'Generate a unique, immutable fingerprint of the authentic file',
            },
            {
              title: 'Blockchain Verification',
              desc: 'Store proof on a decentralized network, creating an audit trail',
            },
            {
              title: 'Digital Certificate',
              desc: 'Get a verifiable certificate proving authenticity and chain of custody',
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="flex gap-6 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {i < 4 && (
                <div className="absolute left-5 top-12 w-0.5 h-16 bg-gradient-to-b from-cyan-400/50 to-transparent" />
              )}
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-black flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                {i + 1}
              </motion.div>
              <div className="flex-1 pt-2">
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Bento Grid */}
      <motion.section
        id="features"
        className="relative z-10 max-w-6xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-widest">FEATURES</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            Enterprise capabilities for <span className="text-cyan-400">digital trust</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-cyan-400/10 border border-cyan-400/10 rounded-2xl overflow-hidden p-px">
          {[
            { icon: ShieldCheck, title: 'AI Tamper Detection', desc: 'Advanced ML detects subtle manipulations' },
            { icon: Lock, title: 'Cryptographic Hashing', desc: 'Immutable fingerprints for authenticity' },
            { icon: Network, title: 'Blockchain Verification', desc: 'Decentralized proof of authenticity' },
            { icon: Zap, title: 'Real-Time Analysis', desc: 'Instant verification and reporting' },
            { icon: Database, title: 'Decentralized Storage', desc: 'Secure off-chain data persistence' },
            { icon: Code2, title: 'Post-Quantum Crypto', desc: 'Future-proof security standards' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-black/50 backdrop-blur p-8 border-r border-b border-cyan-400/10 last:border-r-0 last:border-b-0 hover:bg-cyan-400/5 transition-all"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-4">
                <feature.icon size={20} className="text-cyan-400" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section
        id="security"
        className="relative z-10 max-w-6xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold text-cyan-400 tracking-widest">ENTERPRISE SECURITY</span>
            <h2 className="text-4xl font-serif mt-4 mb-6">
              Built for enterprises that demand <span className="text-cyan-400">maximum security</span>
            </h2>
            <ul className="space-y-4">
              {[
                'End-to-end encryption for all data',
                'SOC 2 Type II compliance',
                'Post-quantum cryptography',
                'DDoS protection & rate limiting',
                'Audit logs & forensic trails',
                'Custom deployment options',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'Uptime', value: '99.99%' },
              { label: 'Response Time', value: '<100ms' },
              { label: 'Data Centers', value: '5+' },
              { label: 'Support Level', value: '24/7' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-cyan-400/5 border border-cyan-400/10 rounded-xl p-6 text-center hover:border-cyan-400/30 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Use Cases */}
      <motion.section
        id="use cases"
        className="relative z-10 max-w-6xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-widest">USE CASES</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            Built for <span className="text-cyan-400">every industry</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            'AML/CFT',
            'Fraud Investigation',
            'Digital Evidence',
            'Supply Chain',
          ].map((tab, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveUseCase(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeUseCase === i
                  ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-400'
                  : 'border border-cyan-400/10 text-slate-400 hover:border-cyan-400/30'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <motion.div
          className="bg-black/50 border border-cyan-400/10 rounded-2xl p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeUseCase}
        >
          {activeUseCase === 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">AML/CFT Compliance</h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Verify document authenticity for Know Your Customer (KYC) processes. Detect forged IDs,
                passports, and official documents.
              </p>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Automated document verification</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Real-time forgery detection</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Regulatory compliance reporting</span>
                </li>
              </ul>
            </div>
          )}
          {activeUseCase === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Fraud Investigation</h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Investigate insurance claims, deepfakes, and fraudulent evidence. Build ironclad cases
                with cryptographic proof.
              </p>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Evidence chain of custody</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Deepfake detection & analysis</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Court-admissible verification</span>
                </li>
              </ul>
            </div>
          )}
          {activeUseCase === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Digital Evidence</h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Preserve and verify digital evidence for legal proceedings. Prove authenticity and
                prevent tampering.
              </p>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Timestamped verification</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Immutable audit trails</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Legal admissibility support</span>
                </li>
              </ul>
            </div>
          )}
          {activeUseCase === 3 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Supply Chain</h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Verify product authenticity and prevent counterfeits. Track provenance with immutable
                blockchain records.
              </p>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Counterfeit detection</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>Provenance tracking</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0" />
                  <span>End-to-end verification</span>
                </li>
              </ul>
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-widest">TESTIMONIALS</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            Trusted by security <span className="text-cyan-400">leaders</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah Chen',
              role: 'Chief Security Officer, FinTech Corp',
              quote: 'Decentralized Forensics has transformed how we verify document authenticity. Invaluable.',
            },
            {
              name: 'Marcus Johnson',
              role: 'Head of Investigations, Major Bank',
              quote: 'The deepfake detection is industry-leading. We\'ve caught fraud attempts instantly.',
            },
            {
              name: 'Elena Rodriguez',
              role: 'Compliance Director, Legal Firm',
              quote: 'Court-admissible verification with blockchain audit trails. Perfect for litigation.',
            },
          ].map((testi, i) => (
            <motion.div
              key={i}
              className="bg-cyan-400/5 border border-cyan-400/10 rounded-xl p-8 hover:border-cyan-400/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic">"{testi.quote}"</p>
              <div>
                <p className="font-semibold text-sm">{testi.name}</p>
                <p className="text-xs text-slate-500">{testi.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="relative z-10 max-w-3xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold text-cyan-400 tracking-widest">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            Frequently asked <span className="text-cyan-400">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3 border border-cyan-400/10 rounded-2xl overflow-hidden">
          {[
            {
              q: 'How accurate is the AI tamper detection?',
              a: 'Our AI model achieves 99.2% accuracy in detecting manipulations, including subtle pixel-level edits, compression artifacts, and deepfakes. It processes images at a neural level, identifying traces invisible to the human eye.',
            },
            {
              q: 'Can the blockchain verification be compromised?',
              a: 'No. The cryptographic hashes are stored on a decentralized blockchain network. Once recorded, they are immutable and tamper-proof. The verification requires consensus from multiple nodes.',
            },
            {
              q: 'Is verification admissible in court?',
              a: 'Yes. Our verification certificates include timestamped blockchain records, chain of custody logs, and cryptographic proofs that meet legal standards in most jurisdictions.',
            },
            {
              q: 'What file types are supported?',
              a: 'We support images (JPG, PNG, TIFF), videos (MP4, MOV), documents (PDF, DOCX), and contracts. File size limits vary by plan.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="border-b border-cyan-400/10 last:border-b-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between bg-cyan-400/5 hover:bg-cyan-400/10 transition-all text-left"
              >
                <span className="font-semibold">{item.q}</span>
                <motion.div
                  animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-cyan-400" />
                </motion.div>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: expandedFaq === i ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 py-4 text-slate-400 text-sm">{item.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="relative z-10 max-w-4xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className="bg-gradient-to-br from-cyan-400/10 to-blue-600/10 border border-cyan-400/20 rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Start verifying <span className="text-cyan-400">today</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join enterprises and organizations protecting digital truth. Free tier includes 10 verifications
              per month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 text-black hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-lg font-semibold border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/5 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-cyan-400/10 bg-black/50 backdrop-blur py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Social</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cyan-400/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
            <p>2026 Decentralized Forensics. All rights reserved.</p>
            <p>Powered by AI, Blockchain, and Cryptography</p>
          </div>
        </div>
      </motion.footer>
    </main>
  )
}
