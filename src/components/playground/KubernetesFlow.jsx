import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Network, Play } from 'lucide-react'
import PlaygroundSection from './PlaygroundSection'
import InteractiveNode from './InteractiveNode'
import { RequestAnimation, MovingDotsAnimation } from './RequestAnimation'
import TooltipCard, { HoverTooltip } from './TooltipCard'
import ActionButton from './ActionButton'

export default function KubernetesRequestFlow() {
  const [isAnimating, setIsAnimating] = useState(false)

  const requestPath = [
    {
      label: 'User Browser',
      description: 'Initiates HTTP request',
      icon: '🌐',
      explanation: 'User clicks a button and browser sends HTTP request'
    },
    {
      label: 'Ingress Controller',
      description: 'Routes incoming traffic',
      icon: '🚪',
      explanation: 'Acts as entry point, routes traffic based on URL/hostname'
    },
    {
      label: 'Kubernetes Service',
      description: 'Load balancer & service discovery',
      icon: '⚖️',
      explanation: 'Works like a receptionist - directs requests to available pods'
    },
    {
      label: 'Pod (Replica 1)',
      description: 'Container instance',
      icon: '📦',
      explanation: 'Smallest deployable unit containing your Docker container'
    },
    {
      label: 'Application',
      description: 'Your actual code running',
      icon: '⚡',
      explanation: 'Processes the request and sends response back'
    }
  ]

  return (
    <PlaygroundSection
      title="Kubernetes Request Flow"
      description="Visualize how a user request travels through a Kubernetes cluster"
      icon={Network}
    >
      <div className="space-y-6">
        {/* Main Request Flow Animation */}
        <div className="relative">
          {/* Animated path visualization */}
          <div className="absolute inset-0 pointer-events-none">
            {isAnimating && (
              <MovingDotsAnimation count={3} direction="horizontal" duration={4} />
            )}
          </div>

          {/* Request path steps */}
          <div className="space-y-4 py-12">
            {requestPath.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <InteractiveNode
                  title={`${step.icon} ${step.label}`}
                  description={step.description}
                  status={isAnimating ? 'active' : 'normal'}
                  expandable={true}
                >
                  <div className="space-y-2">
                    <p className="text-sm text-slate-300">{step.explanation}</p>
                    {idx === 3 && (
                      <div className="mt-2 p-2 bg-green-900/20 border border-green-600/30 rounded">
                        <p className="text-xs text-green-300 font-semibold">Pod Details:</p>
                        <ul className="text-xs text-green-200 mt-1 space-y-1 list-disc list-inside">
                          <li>Running container image</li>
                          <li>IP address: 10.0.2.45</li>
                          <li>Port: 3000</li>
                          <li>CPU: 100m, Memory: 256Mi</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </InteractiveNode>

                {/* Arrow */}
                {idx < requestPath.length - 1 && (
                  <div className="flex justify-center py-2">
                    <motion.div
                      className="text-cyan-400 text-2xl"
                      animate={isAnimating ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ↓
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Control */}
        <div className="pt-4 border-t border-slate-700">
          <ActionButton
            label={isAnimating ? 'Stop Animation' : 'Start Request Animation'}
            icon={Play}
            onClick={() => setIsAnimating(!isAnimating)}
            variant={isAnimating ? 'danger' : 'success'}
          />
        </div>

        {/* Key Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Ingress Controller',
              content: 'Entry point for external traffic. Routes requests based on hostnames and paths.',
              icon: '🚪'
            },
            {
              title: 'Service',
              content: 'Provides stable IP and DNS name. Load balances across pods automatically.',
              icon: '⚖️'
            },
            {
              title: 'Pod',
              content: 'Smallest Kubernetes unit. Usually contains one container with your application.',
              icon: '📦'
            },
            {
              title: 'Load Balancing',
              content: 'Service distributes requests across all healthy pods. If one pod crashes, others handle traffic.',
              icon: '📊'
            }
          ].map((concept, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
            >
              <h4 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                <span>{concept.icon}</span>
                {concept.title}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">{concept.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Real-world scenario */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-600/30">
          <h3 className="font-semibold text-purple-300 mb-2">🎯 Real-World Scenario</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            You have 3 replicas of your web app running. A user clicks a button:
          </p>
          <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
            <li>Request hits Ingress Controller</li>
            <li>Routed to Service (kubernetes.default.svc.cluster.local)</li>
            <li>Service picks healthy pod (round-robin)</li>
            <li>Request processed and response sent back</li>
            <li>If one pod crashes, remaining 2 handle traffic automatically</li>
          </ol>
        </div>

        {/* Advanced Features */}
        <TooltipCard
          title="Advanced K8s Features"
          content="Kubernetes also handles: Self-healing (restarts failed pods), Rolling updates (zero downtime), Auto-scaling (scale based on CPU/memory), DNS resolution, Network policies, Persistent volumes, and more!"
          type="info"
        />
      </div>
    </PlaygroundSection>
  )
}
