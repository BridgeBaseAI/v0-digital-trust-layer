'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Shield, Zap, Network, Users, TrendingUp, Lock, Eye, Code, CheckCircle, ArrowRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            {['Features', 'Use Cases', 'Security', 'Pricing', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-black border-t border-cyan-500/20 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
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
            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-lg">
              Get Started
            </button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo Animation */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-20 h-20 relative">
              <Image
                src="/logo.png"
                alt="Decentralized Forensics"
                width={80}
                height={80}
                className="w-full h-full drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))',
                }}
              />
            </div>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
            AI-Powered Digital{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Trust & Security
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto text-balance">
            Enterprise-grade blockchain forensics. Detect, prevent, and respond to threats with AI-powered analysis in real-time.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2 group">
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="px-8 py-4 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex justify-center gap-8 flex-wrap text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-cyan-400" />
              Enterprise Security
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-cyan-400" />
              Real-Time Analysis
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-cyan-400" />
              Zero-Knowledge Proof
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features for Modern Security</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              All the tools you need to maintain digital trust at scale
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Network className="w-6 h-6" />,
                title: 'Blockchain Analysis',
                description: 'Deep dive into transaction patterns and wallet behaviors with advanced analytics.',
              },
              {
                icon: <Eye className="w-6 h-6" />,
                title: 'Real-Time Monitoring',
                description: 'Monitor addresses and transactions 24/7 with instant alerts and notifications.',
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Instant Detection',
                description: 'AI identifies suspicious patterns before they become security incidents.',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Risk Assessment',
                description: 'Comprehensive risk scoring and threat level classification for all entities.',
              },
              {
                icon: <Code className="w-6 h-6" />,
                title: 'API Integration',
                description: 'Seamless integration with your existing security infrastructure.',
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Predictive Analytics',
                description: 'Machine learning models forecast emerging threats and vulnerabilities.',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="glass p-6 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 group cursor-pointer"
                whileHover={{ y: -8, boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)' }}
              >
                <div className="text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Built for Every Use Case</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From compliance to threat hunting, we have you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'AML/CFT Compliance',
                description: 'Meet regulatory requirements with comprehensive transaction monitoring and reporting.',
                icon: '📋',
              },
              {
                title: 'Fraud Investigation',
                description: 'Investigate suspicious transactions and recover stolen assets efficiently.',
                icon: '🔍',
              },
              {
                title: 'Risk Management',
                description: 'Identify and mitigate financial crimes before they impact your business.',
                icon: '⚠️',
              },
              {
                title: 'Threat Intelligence',
                description: 'Access actionable threat intelligence to stay ahead of emerging risks.',
                icon: '🛡️',
              },
            ].map((useCase, idx) => (
              <motion.div
                key={idx}
                className="glass-dark p-8 rounded-xl border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Enterprise-Grade Security</h2>
              <p className="text-gray-400 text-lg mb-6">
                Your data security is our top priority. We implement industry-leading encryption, zero-knowledge proofs, and compliance standards.
              </p>
              <ul className="space-y-4">
                {[
                  'End-to-end encryption for all data',
                  'Zero-knowledge proof architecture',
                  'SOC 2 Type II certified',
                  'GDPR & CCPA compliant',
                  'Regular security audits',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle className="text-cyan-400" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              className="relative h-96 rounded-xl overflow-hidden glass"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="text-cyan-400/50" size={120} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">
              Start free. Scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: 'Free',
                features: ['Basic monitoring', 'Up to 100 addresses', 'Email alerts', 'Community support'],
              },
              {
                name: 'Professional',
                price: '$299',
                period: '/month',
                features: ['Advanced analytics', 'Unlimited addresses', 'Priority alerts', 'API access', 'Email & chat support'],
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Custom integrations', 'Dedicated support', 'SLA guarantee', 'Advanced compliance', 'On-premise option'],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                className={`rounded-xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'glass border border-cyan-400 relative overflow-hidden shadow-2xl shadow-cyan-500/20'
                    : 'glass border border-cyan-500/20'
                }`}
                whileHover={{ y: -8 }}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-cyan-400">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle size={16} className="text-cyan-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:shadow-lg hover:shadow-cyan-500/50'
                      : 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Decentralized Forensics has transformed how we detect financial crimes. The AI insights are invaluable.",
                author: 'Sarah Chen',
                role: 'Head of Compliance, Global Bank',
              },
              {
                quote: 'The real-time monitoring saved us from a major fraud attempt. Highly recommended.',
                author: 'Michael Rodriguez',
                role: 'CTO, Crypto Exchange',
              },
              {
                quote: 'Enterprise support is exceptional. They truly understand our compliance needs.',
                author: 'Lisa Watson',
                role: 'Risk Officer, Financial Institution',
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="glass p-6 rounded-xl"
                whileHover={{ y: -4 }}
              >
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How quickly can I get started?',
                a: 'You can create an account and start analyzing transactions within minutes. Our onboarding is designed to be quick and intuitive.',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. We use end-to-end encryption, zero-knowledge proofs, and comply with SOC 2 Type II standards. Your data is never sold or shared.',
              },
              {
                q: 'Do you offer API access?',
                a: 'Yes. Professional and Enterprise plans include full API access with comprehensive documentation and SDKs.',
              },
              {
                q: 'What blockchains do you support?',
                a: 'We support all major blockchains including Bitcoin, Ethereum, and many Layer 2 solutions. Contact us for specific chain support.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="glass p-6 rounded-xl"
                whileHover={{ y: -2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Secure Your Digital Assets?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of security-conscious organizations. Start with our free plan today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2 group">
              Start Free Trial
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="px-8 py-4 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#security" className="hover:text-cyan-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Follow</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cyan-500/20 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Decentralized Forensics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
