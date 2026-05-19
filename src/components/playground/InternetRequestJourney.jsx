import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Play } from 'lucide-react'
import PlaygroundSection from './PlaygroundSection'
import InteractiveNode from './InteractiveNode'
import { RequestAnimation, MovingDotsAnimation } from './RequestAnimation'
import ActionButton from './ActionButton'
import TooltipCard from './TooltipCard'

export default function InternetRequestJourney() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStep, setCurrentStep] = useState(null)

  const requestJourney = [
    {
      step: 1,
      label: 'Browser',
      icon: '🌐',
      description: 'User clicks a button',
      details: 'Browser constructs HTTP request',
      timeMs: 0
    },
    {
      step: 2,
      label: 'DNS Resolution',
      icon: '🔍',
      description: 'Looks up domain IP address',
      details: 'example.com → 52.123.45.67',
      timeMs: 50
    },
    {
      step: 3,
      label: 'TCP Connection',
      icon: '🔗',
      description: 'Establishes connection to server',
      details: 'Three-way handshake (SYN, SYN-ACK, ACK)',
      timeMs: 100
    },
    {
      step: 4,
      label: 'TLS Handshake',
      icon: '🔐',
      description: 'Encrypts connection (HTTPS)',
      details: 'Negotiates cipher suite & certificates',
      timeMs: 150
    },
    {
      step: 5,
      label: 'Load Balancer',
      icon: '⚖️',
      description: 'Routes to healthy server',
      details: 'AWS ALB picks EC2 instance',
      timeMs: 180
    },
    {
      step: 6,
      label: 'Nginx',
      icon: '🚀',
      description: 'Reverse proxy & web server',
      details: 'Routes to application',
      timeMs: 200
    },
    {
      step: 7,
      label: 'Docker Container',
      icon: '🐳',
      description: 'Application runtime environment',
      details: 'Isolated process with dependencies',
      timeMs: 220
    },
    {
      step: 8,
      label: 'Application Code',
      icon: '⚡',
      description: 'Your Node.js/Python/Java app',
      details: 'Processes request logic',
      timeMs: 280
    },
    {
      step: 9,
      label: 'Database Query',
      icon: '🗄️',
      description: 'Fetches data from PostgreSQL',
      details: 'SELECT * FROM users WHERE id = 1',
      timeMs: 350
    },
    {
      step: 10,
      label: 'Response',
      icon: '📤',
      description: 'Sends data back to browser',
      details: 'HTTP 200 OK with JSON/HTML',
      timeMs: 450
    }
  ]

  const handleStartJourney = async () => {
    setIsAnimating(true)
    for (let i = 0; i < requestJourney.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400))
      setCurrentStep(i)
    }
    await new Promise(resolve => setTimeout(resolve, 800))
    setCurrentStep(null)
    setIsAnimating(false)
  }

  return (
    <PlaygroundSection
      title="Internet Request Journey"
      description="Trace the complete path of a user request from browser to database and back"
      icon={Zap}
    >
      <div className="space-y-6">
        {/* Journey Visualization */}
        <div className="space-y-3">
          {requestJourney.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <InteractiveNode
                title={`${item.step}. ${item.icon} ${item.label}`}
                description={item.description}
                status={
                  isAnimating && currentStep === idx ? 'active' :
                  isAnimating && currentStep > idx ? 'complete' :
                  'normal'
                }
                expandable={true}
              >
                <div className="space-y-2">
                  <p className="text-sm text-slate-300">{item.details}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">⏱️ Cumulative time:</span>
                    <span className="font-mono text-cyan-300">{item.timeMs}ms</span>
                  </div>
                </div>
              </InteractiveNode>

              {/* Arrow */}
              {idx < requestJourney.length - 1 && (
                <div className="flex justify-center py-2">
                  <motion.div
                    className="text-cyan-400 text-2xl"
                    animate={isAnimating && currentStep >= idx ? { y: [0, 5, 0] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    ↓
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Control */}
        <div className="pt-4 border-t border-slate-700 flex gap-2">
          <ActionButton
            label={isAnimating ? 'Journey in Progress...' : 'Start Request Journey'}
            icon={Play}
            onClick={handleStartJourney}
            disabled={isAnimating}
            loading={isAnimating}
          />
          <button
            onClick={() => {
              setIsAnimating(false)
              setCurrentStep(null)
            }}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold transition-colors text-sm"
          >
            Reset
          </button>
        </div>

        {/* Timeline View */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <h3 className="font-semibold text-cyan-300 mb-3">📊 Timeline</h3>
          <div className="space-y-2">
            {requestJourney.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 transition-colors ${
                      isAnimating && currentStep >= idx
                        ? 'border-cyan-400 bg-cyan-400'
                        : 'border-slate-600 bg-slate-700'
                    }`}
                    whileScale={{ scale: isAnimating && currentStep === idx ? 1.3 : 1 }}
                  />
                  {idx < requestJourney.length - 1 && (
                    <div className="w-0.5 h-8 bg-gradient-to-b from-slate-600 to-slate-700 my-1" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 py-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{item.label}</span>
                    <span className="text-xs font-mono text-slate-400">+{item.timeMs}ms</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total Time */}
          <div className="mt-4 p-3 bg-cyan-900/20 border border-cyan-600/30 rounded">
            <p className="text-sm text-slate-300">
              Total Round Trip Time: <span className="font-mono text-cyan-300 font-bold">~450ms</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              (In real-world, varies based on network latency, server load, etc.)
            </p>
          </div>
        </div>

        {/* Key Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'DNS Resolution',
              content: 'Converts domain name to IP address. Cached at multiple levels (browser, ISP, root nameservers).',
              icon: '🔍'
            },
            {
              title: 'TCP Handshake',
              content: 'Establishes connection with SYN → SYN-ACK → ACK. Ensures both sides ready to communicate.',
              icon: '🤝'
            },
            {
              title: 'TLS Encryption',
              content: 'Secures communication between browser and server. Public/private key cryptography.',
              icon: '🔐'
            },
            {
              title: 'Load Balancing',
              content: 'Distributes requests across servers. Ensures high availability and performance.',
              icon: '⚖️'
            },
            {
              title: 'Nginx Reverse Proxy',
              content: 'Forwards requests to application servers. Handles SSL termination and request routing.',
              icon: '🚀'
            },
            {
              title: 'Application Processing',
              content: 'Your code runs here. Database queries, business logic, data transformation.',
              icon: '⚡'
            }
          ].map((concept, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50"
            >
              <h4 className="font-semibold text-blue-300 mb-1 flex items-center gap-2">
                <span>{concept.icon}</span>
                {concept.title}
              </h4>
              <p className="text-sm text-slate-300">{concept.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Common Issues */}
        <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-lg p-4 border border-amber-600/30">
          <h3 className="font-semibold text-amber-300 mb-3">⚠️ Common Slowdowns</h3>
          <ul className="space-y-2 text-sm text-amber-100">
            <li className="flex gap-2">
              <span>🌍</span>
              <span><strong>DNS Resolution:</strong> Can take 50-100ms if not cached</span>
            </li>
            <li className="flex gap-2">
              <span>📡</span>
              <span><strong>Network Latency:</strong> Geography matters! US to Asia = 200ms+</span>
            </li>
            <li className="flex gap-2">
              <span>💾</span>
              <span><strong>Database Queries:</strong> Slow queries can add 500ms-2s</span>
            </li>
            <li className="flex gap-2">
              <span>🔗</span>
              <span><strong>TLS Handshake:</strong> Extra ~100ms for HTTPS setup</span>
            </li>
            <li className="flex gap-2">
              <span>⚡</span>
              <span><strong>Server Load:</strong> Overloaded server can queue requests</span>
            </li>
          </ul>
        </div>

        {/* Optimization Tips */}
        <TooltipCard
          title="How to Optimize?"
          content="Use CDN (CloudFront) for static content. Enable DNS caching. Optimize database queries with indexes. Implement caching layer (Redis). Use gzip compression. Minimize JavaScript/CSS. Deploy closer to users. Monitor with tools like CloudWatch or New Relic."
          type="info"
        />
      </div>
    </PlaygroundSection>
  )
}
