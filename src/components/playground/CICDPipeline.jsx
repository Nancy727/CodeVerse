import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, CheckCircle, AlertCircle } from 'lucide-react'
import PlaygroundSection from './PlaygroundSection'
import InteractiveNode from './InteractiveNode'
import { LargeFlowArrow } from './FlowConnector'
import TooltipCard from './TooltipCard'
import ActionButton from './ActionButton'

export default function CICDPipelinePlayground() {
  const [activeStep, setActiveStep] = useState(null)
  const [pipelineRunning, setPipelineRunning] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([])

  const pipelineSteps = [
    {
      id: 'developer',
      label: 'Developer',
      icon: '👨‍💻',
      description: 'Pushes code to repository',
      command: 'git push origin main',
      purpose: 'Source code management',
      realWorld: 'Developer commits changes to GitHub/GitLab'
    },
    {
      id: 'github',
      label: 'GitHub/GitLab',
      icon: '📦',
      description: 'Webhook triggers pipeline',
      command: 'Webhook event',
      purpose: 'Central repository',
      realWorld: 'Stores code and triggers CI/CD'
    },
    {
      id: 'jenkins',
      label: 'Jenkins/CI Server',
      icon: '⚙️',
      description: 'Runs tests and builds',
      command: 'npm run test && npm run build',
      purpose: 'Continuous Integration',
      realWorld: 'Automates testing and compilation'
    },
    {
      id: 'docker',
      label: 'Docker Build',
      icon: '🐳',
      description: 'Creates container image',
      command: 'docker build -t myapp:v1.0 .',
      purpose: 'Containerization',
      realWorld: 'Packages app with all dependencies'
    },
    {
      id: 'registry',
      label: 'Docker Hub',
      icon: '💾',
      description: 'Stores container images',
      command: 'docker push myapp:v1.0',
      purpose: 'Image registry',
      realWorld: 'Central repository for containers'
    },
    {
      id: 'k8s',
      label: 'Kubernetes',
      icon: '☸️',
      description: 'Deploys containers',
      command: 'kubectl apply -f deployment.yaml',
      purpose: 'Orchestration',
      realWorld: 'Manages container deployment & scaling'
    },
    {
      id: 'grafana',
      label: 'Monitoring',
      icon: '📊',
      description: 'Tracks performance',
      command: 'Prometheus scrapes metrics',
      purpose: 'Observability',
      realWorld: 'Visualizes system health'
    }
  ]

  const handleRunPipeline = async () => {
    setPipelineRunning(true)
    setCompletedSteps([])
    setActiveStep(pipelineSteps[0].id)

    for (let i = 0; i < pipelineSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setCompletedSteps(prev => [...prev, pipelineSteps[i].id])
      if (i < pipelineSteps.length - 1) {
        setActiveStep(pipelineSteps[i + 1].id)
      }
    }

    setPipelineRunning(false)
    setActiveStep(null)
  }

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'complete'
    if (activeStep === stepId) return 'active'
    return 'pending'
  }

  return (
    <PlaygroundSection
      title="CI/CD Pipeline Playground"
      description="Visualize the automated deployment workflow from code to production"
      icon={GitBranch}
    >
      <div className="space-y-6">
        {/* Pipeline Flow */}
        <div className="space-y-3">
          {pipelineSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Step */}
              <InteractiveNode
                title={`${step.icon} ${step.label}`}
                description={step.description}
                status={
                  getStepStatus(step.id) === 'complete' ? 'active' :
                  getStepStatus(step.id) === 'active' ? 'active' :
                  'normal'
                }
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                expandable={true}
              >
                <div className="space-y-3">
                  {/* Command */}
                  <div>
                    <p className="text-xs font-semibold text-slate-300 mb-1">Command:</p>
                    <code className="text-xs bg-black/50 text-green-300 p-2 rounded block font-mono break-all">
                      {step.command}
                    </code>
                  </div>

                  {/* Purpose */}
                  <div>
                    <p className="text-xs font-semibold text-slate-300 mb-1">Purpose:</p>
                    <p className="text-xs text-slate-400">{step.purpose}</p>
                  </div>

                  {/* Real-world use */}
                  <div className="bg-blue-900/20 border border-blue-600/30 rounded p-2">
                    <p className="text-xs font-semibold text-blue-300 mb-1">📋 Production Use:</p>
                    <p className="text-xs text-blue-200">{step.realWorld}</p>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center gap-2">
                    {getStepStatus(step.id) === 'complete' && (
                      <>
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-xs text-green-400">Completed</span>
                      </>
                    )}
                    {getStepStatus(step.id) === 'active' && (
                      <>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-yellow-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <span className="text-xs text-yellow-400">Processing...</span>
                      </>
                    )}
                    {getStepStatus(step.id) === 'pending' && (
                      <>
                        <div className="w-3 h-3 rounded-full border border-slate-500" />
                        <span className="text-xs text-slate-500">Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </InteractiveNode>

              {/* Arrow between steps */}
              {idx < pipelineSteps.length - 1 && (
                <div className="flex justify-center py-1">
                  <LargeFlowArrow
                    isActive={getStepStatus(step.id) === 'active'}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="pt-4 border-t border-slate-700 flex flex-col gap-3">
          <ActionButton
            label={pipelineRunning ? 'Pipeline Running...' : 'Run CI/CD Pipeline'}
            onClick={handleRunPipeline}
            disabled={pipelineRunning}
            loading={pipelineRunning}
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                setCompletedSteps([])
                setActiveStep(null)
                setPipelineRunning(false)
              }}
              className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
            >
              Reset
            </button>
            <div className="flex-1 flex items-center justify-center text-xs text-slate-400 bg-slate-800/50 rounded-lg">
              {completedSteps.length} / {pipelineSteps.length} steps completed
            </div>
          </div>
        </div>

        {/* Insights */}
        <TooltipCard
          title="Why Automate?"
          content="Automation ensures consistent deployments, faster releases, and early detection of bugs. Your code goes from local machine to production in minutes!"
          type="info"
        />

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Time Saved', value: '~90%' },
            { label: 'Error Rate', value: '-80%' },
            { label: 'Deploy Speed', value: '10x' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-lg p-3 border border-cyan-600/30 text-center"
            >
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="text-lg font-bold text-cyan-300">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PlaygroundSection>
  )
}
