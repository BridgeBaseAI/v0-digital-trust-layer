'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Shield, Zap, Network, Users, TrendingUp, Lock, Eye, Code, CheckCircle, ArrowRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

// Counter component for animated numbers
function Counter({ target, duration = 2 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)
      if (progress < 1) {
        setCount(Math.floor(progress * target))
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    requestAnimationFrame(animate)
  }, [target, duration])

  return <span>{count.toLocaleString()}+</span>
}

// Particle network background component
function ParticleNetwork() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 20 + Math.random() * 10,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-cyan-400/30 rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Connection lines between particles */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {particles.slice(0, 10).map((p1, i) => {
          const p2 = particles[(i + 1) % particles.length]
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${p1.x}%`}
              y1={`${p1.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke="rgba(0, 255, 255, 0.1)"
              strokeWidth="1"
              animate={{
                strokeOpacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Stagger container variants for page load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const cardHoverVariants = {
    rest: { y: 0, boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)' },
    hover: { 
      y: -8,
      boxShadow: '0 20px 40px rgba(0, 255, 255, 0.3)',
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 relative">
              <Image
                src="/logo.png"
                alt="Decentralized Forensics"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className="text-white font-bold">Forensics</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {['Features', 'Use Cases', 'Security', 'Pricing', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button 
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-black border-t border-cyan-500/20 p-4"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {['Features', 'Use Cases', 'Security', 'Pricing', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-400 hover:text-cyan-400 py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <motion.button 
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Particle Network Background */}
        <ParticleNetwork />

        {/* Animated background elements with parallax */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
        >
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 255, 0.6)' }}
            >
              <span className="text-cyan-400 text-sm font-semibold">🚀 Enterprise-Grade Forensics</span>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Detect threats with{' '}
            <motion.span
              className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              AI-Powered Analysis
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Decentralized Forensics provides enterprise-grade blockchain analysis and digital trust solutions. Detect, prevent, and respond to threats in real-time.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
              <ChevronRight className="inline ml-2" size={20} />
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:border-cyan-400 hover:bg-cyan-500/10"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Trust badges with animation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center text-gray-400 text-sm"
          >
            {['🔒 Bank-Level Security', '⚡ Real-Time Analysis', '🌍 Global Coverage'].map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, color: '#00ffff' }}
                transition={{ duration: 0.3 }}
              >
                {badge}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated logo in hero */}
        <motion.div
          className="relative z-10 w-64 h-64 mx-auto mt-16"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <Image
            src="/logo.png"
            alt="Decentralized Forensics"
            width={256}
            height={256}
            className="w-full h-full drop-shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Stats Section with Counters */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-cyan-500/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Transactions Analyzed', value: 100 },
            { label: 'Active Users', value: 50 },
            { label: 'Threats Detected', value: 99 },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-8 glass rounded-xl"
              variants={scrollVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                <Counter target={stat.value} />
                <span>M</span>
              </motion.div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need for advanced forensics</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Blockchain Analysis', desc: 'Deep analysis of blockchain transactions' },
              { icon: Zap, title: 'Real-Time Monitoring', desc: 'Instant threat detection and alerts' },
              { icon: Network, title: 'Network Mapping', desc: 'Visualize complex transaction networks' },
              { icon: Lock, title: 'Secure Storage', desc: 'Enterprise-grade data protection' },
              { icon: Eye, title: 'Pattern Recognition', desc: 'AI-powered anomaly detection' },
              { icon: TrendingUp, title: 'Advanced Analytics', desc: 'Comprehensive threat intelligence' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-8 glass rounded-xl border border-cyan-500/20"
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ 
                    backgroundColor: 'rgba(0, 255, 255, 0.3)',
                    rotate: 5,
                  }}
                >
                  <feature.icon className="text-cyan-400" size={24} />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Use Cases Section */}
      <motion.section
        id="usecases"
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-500/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Use Cases</h2>
            <p className="text-gray-400 text-lg">Trusted by enterprises worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'AML/CFT Compliance', desc: 'Meet regulatory requirements with automated monitoring' },
              { title: 'Fraud Investigation', desc: 'Quickly identify and investigate suspicious activities' },
              { title: 'Risk Management', desc: 'Proactive threat detection and assessment' },
              { title: 'Digital Assets Protection', desc: 'Safeguard crypto holdings and transactions' },
            ].map((useCase, idx) => (
              <motion.div
                key={idx}
                className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20"
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="text-cyan-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                </div>
                <p className="text-gray-400">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section
        id="security"
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Enterprise-Grade Security</h2>
              <ul className="space-y-4">
                {[
                  'End-to-end encryption',
                  'Multi-factor authentication',
                  'Compliance certifications (SOC 2, ISO 27001)',
                  'Regular security audits',
                  'GDPR & data privacy compliant',
                ].map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-3 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <CheckCircle className="text-cyan-400 flex-shrink-0" size={20} />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="relative h-96 rounded-xl overflow-hidden glass"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)' }}
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Lock className="text-cyan-400" size={80} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-cyan-500/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-gray-400 text-lg">Choose the perfect plan for your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: 'Free', desc: 'For individuals', features: ['Basic analysis', 'Limited queries', '7-day data retention'] },
              { name: 'Professional', price: '$299', desc: 'For growing teams', features: ['Advanced analysis', 'Unlimited queries', '90-day data retention', 'Priority support'], popular: true },
              { name: 'Enterprise', price: 'Custom', desc: 'For large organizations', features: ['Custom solutions', 'Dedicated support', 'Unlimited data retention', 'SLA guarantee'] },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                className={`relative p-8 rounded-xl transition-all ${
                  plan.popular
                    ? 'glass border-2 border-cyan-400 shadow-2xl'
                    : 'glass border border-cyan-500/20'
                }`}
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-sm font-semibold rounded-full"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    Popular
                  </motion.div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.desc}</p>
                <div className="text-4xl font-bold text-cyan-400 mb-6">
                  {plan.price}
                  {plan.price !== 'Custom' && <span className="text-lg text-gray-400">/mo</span>}
                </div>
                <motion.button
                  className={`w-full py-2 rounded-lg font-semibold mb-6 transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black'
                      : 'border-2 border-cyan-500/50 text-cyan-400 hover:border-cyan-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <motion.li
                      key={fIdx}
                      className="flex items-center gap-2 text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fIdx * 0.05 }}
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <CheckCircle size={18} className="text-cyan-400 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: 'Decentralized Forensics transformed our compliance process.', author: 'Sarah Chen, CEO' },
              { quote: 'Real-time threat detection has been invaluable for our security team.', author: 'James Wilson, CISO' },
              { quote: 'Best forensics platform on the market. Highly recommended!', author: 'Maria Garcia, CTO' },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="p-8 glass rounded-xl border border-cyan-500/20"
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  backgroundColor: 'rgba(0, 255, 255, 0.05)',
                  borderColor: 'rgba(0, 255, 255, 0.3)',
                }}
              >
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-cyan-400 font-semibold">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-500/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'What is blockchain forensics?', a: 'Blockchain forensics analyzes transactions on public blockchains to identify patterns, trace funds, and detect fraudulent activity.' },
              { q: 'How does real-time monitoring work?', a: 'Our AI continuously monitors blockchain networks for suspicious activities and alerts you instantly when threats are detected.' },
              { q: 'Is my data secure?', a: 'Yes, we use bank-level encryption and comply with SOC 2, ISO 27001, and GDPR requirements.' },
              { q: 'What support do you provide?', a: 'Professional and Enterprise plans include priority support with guaranteed response times.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 glass rounded-xl border border-cyan-500/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ backgroundColor: 'rgba(0, 255, 255, 0.05)' }}
              >
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={20} className="text-cyan-400" />
                  </motion.div>
                  {item.q}
                </h3>
                <p className="text-gray-400 ml-8">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Ready to secure your digital assets?
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg mb-8"
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
          >
            Join thousands of enterprises using Decentralized Forensics
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold text-lg rounded-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Trial
              <ArrowRight className="inline ml-2" size={24} />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="border-t border-cyan-500/20 py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'Security', 'Roadmap'] },
              { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Resources', items: ['Docs', 'API', 'Community', 'Support'] },
              { title: 'Legal', items: ['Privacy', 'Terms', 'Compliance', 'Cookies'] },
            ].map((column, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h4 className="font-semibold text-white mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-cyan-500/20 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p>&copy; 2024 Decentralized Forensics. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
