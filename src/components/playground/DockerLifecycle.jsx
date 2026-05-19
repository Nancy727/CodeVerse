import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Copy, Trash2 } from 'lucide-react'
import PlaygroundSection from './PlaygroundSection'
import InteractiveNode from './InteractiveNode'
import ActionButton from './ActionButton'
import TooltipCard from './TooltipCard'

export default function DockerLifecycle() {
  const [containerState, setContainerState] = useState('built') // 'dockerfile' | 'built' | 'running' | 'stopped' | 'removed'
  const [showLogs, setShowLogs] = useState(false)
  const [showInspect, setShowInspect] = useState(false)

  const states = ['dockerfile', 'built', 'running', 'stopped', 'removed']
  const currentStateIdx = states.indexOf(containerState)

  const containerInfo = {
    id: 'a3f4e2c1b9d8',
    image: 'myapp:v1.0',
    name: 'myapp-container-prod',
    ports: '3000:3000',
    memory: '512MB',
    cpu: '0.5',
    created: '2024-05-19T10:30:00Z'
  }

  const mockLogs = [
    '[2024-05-19 10:30:15] App started on port 3000',
    '[2024-05-19 10:30:16] Connected to database',
    '[2024-05-19 10:30:17] Prometheus metrics enabled',
    '[2024-05-19 10:30:18] Ready to accept connections',
    '[2024-05-19 10:30:25] GET /health 200 OK',
    '[2024-05-19 10:30:32] POST /api/users 201 Created'
  ]

  const lifecycle = [
    {
      stage: 'Dockerfile',
      icon: '📄',
      description: 'Define build instructions',
      command: 'cat Dockerfile',
      explanation: 'Instructions for creating your image'
    },
    {
      stage: 'Build Image',
      icon: '🏗️',
      description: 'Create Docker image',
      command: 'docker build -t myapp:v1.0 .',
      explanation: 'Executes Dockerfile instructions'
    },
    {
      stage: 'Run Container',
      icon: '▶️',
      description: 'Start a container from image',
      command: 'docker run -p 3000:3000 myapp:v1.0',
      explanation: 'Creates running instance'
    },
    {
      stage: 'View Logs',
      icon: '📋',
      description: 'Check container output',
      command: 'docker logs <container-id>',
      explanation: 'Debug application inside container'
    },
    {
      stage: 'Stop Container',
      icon: '⏹️',
      description: 'Gracefully shutdown',
      command: 'docker stop <container-id>',
      explanation: 'Sends SIGTERM signal'
    },
    {
      stage: 'Remove Container',
      icon: '🗑️',
      description: 'Delete container instance',
      command: 'docker rm <container-id>',
      explanation: 'Frees up resources'
    }
  ]

  const getStageStatus = (stage) => {
    const stageIdx = lifecycle.findIndex(s => s.stage.replace(' ', '') === stage.replace(' ', ''))
    if (stageIdx < currentStateIdx) return 'complete'
    if (stageIdx === currentStateIdx) return 'active'
    return 'pending'
  }

  const handleBuild = () => {
    setContainerState('built')
    setShowLogs(false)
    setShowInspect(false)
  }

  const handleRun = () => {
    setContainerState('running')
    setShowLogs(false)
  }

  const handleStop = () => {
    setContainerState('stopped')
    setShowLogs(false)
  }

  const handleRemove = () => {
    setContainerState('removed')
    setShowLogs(false)
  }

  return (
    <PlaygroundSection
      title="Docker Lifecycle Playground"
      description="Learn the complete Docker workflow from Dockerfile to running container"
      icon={Container}
    >
      <div className="space-y-6">
        {/* Lifecycle Flow */}
        <div className="space-y-3">
          {lifecycle.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <InteractiveNode
                title={`${step.icon} ${step.stage}`}
                description={step.description}
                status={getStageStatus(step.stage)}
                expandable={true}
              >
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-300 mb-1">Command:</p>
                    <code className="text-xs bg-black/60 text-green-300 p-2 rounded block font-mono break-all">
                      {step.command}
                    </code>
                  </div>
                  <p className="text-sm text-slate-300">{step.explanation}</p>
                </div>
              </InteractiveNode>
            </motion.div>
          ))}
        </div>

        {/* Container Status */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <h3 className="font-semibold text-cyan-300 mb-3">📊 Container Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { label: 'State', value: containerState.toUpperCase() },
              { label: 'Image', value: containerInfo.image },
              { label: 'Port Mapping', value: containerInfo.ports },
              { label: 'Memory', value: containerInfo.memory },
              { label: 'Container ID', value: `${containerInfo.id}...` },
              { label: 'CPU Limit', value: containerInfo.cpu }
            ].map((info, idx) => (
              <div key={idx} className="text-xs">
                <p className="text-slate-400">{info.label}:</p>
                <p className="font-mono text-green-300">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <ActionButton
            label="Build"
            onClick={handleBuild}
            variant={containerState === 'built' ? 'success' : 'primary'}
            size="sm"
          />
          <ActionButton
            label="Run"
            onClick={handleRun}
            variant={containerState === 'running' ? 'success' : 'primary'}
            size="sm"
          />
          <ActionButton
            label="Stop"
            onClick={handleStop}
            variant={containerState === 'stopped' ? 'danger' : 'primary'}
            size="sm"
            disabled={containerState !== 'running'}
          />
          <ActionButton
            label="Remove"
            icon={Trash2}
            onClick={handleRemove}
            variant="danger"
            size="sm"
            disabled={containerState === 'removed' || containerState === 'running'}
          />
        </div>

        {/* Terminal Output */}
        {containerState === 'running' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {/* Logs Button */}
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left font-semibold text-slate-200 transition-colors flex items-center justify-between"
            >
              <span>📋 View Container Logs</span>
              <motion.div
                animate={{ rotate: showLogs ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.div>
            </button>

            {/* Logs Display */}
            {showLogs && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black rounded-lg p-3 border border-slate-700 font-mono text-xs text-green-300"
              >
                {mockLogs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {log}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Inspect Button */}
            <button
              onClick={() => setShowInspect(!showInspect)}
              className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left font-semibold text-slate-200 transition-colors flex items-center justify-between"
            >
              <span>🔍 Inspect Container</span>
              <motion.div
                animate={{ rotate: showInspect ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.div>
            </button>

            {/* Inspect Output */}
            {showInspect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black rounded-lg p-3 border border-slate-700 font-mono text-xs text-blue-300"
              >
                <p>Container ID: {containerInfo.id}</p>
                <p>Image: {containerInfo.image}</p>
                <p>Ports: {containerInfo.ports}</p>
                <p>Memory Limit: {containerInfo.memory}</p>
                <p>CPU Limit: {containerInfo.cpu}</p>
                <p>Created: {containerInfo.created}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Key Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Image',
              content: 'Template for containers. Immutable blueprint with all dependencies.',
              icon: '📸'
            },
            {
              title: 'Container',
              content: 'Running instance of an image. Isolated from host system.',
              icon: '📦'
            },
            {
              title: 'Dockerfile',
              content: 'Instructions to build an image. Like a recipe for your application.',
              icon: '📄'
            },
            {
              title: 'Registry',
              content: 'Central repository (Docker Hub) for storing and sharing images.',
              icon: '🏪'
            }
          ].map((concept, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50"
            >
              <h4 className="font-semibold text-purple-300 mb-1 flex items-center gap-2">
                <span>{concept.icon}</span>
                {concept.title}
              </h4>
              <p className="text-sm text-slate-300">{concept.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Dockerfile Example */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <h3 className="font-semibold text-blue-300 mb-2">📄 Example Dockerfile</h3>
          <code className="text-xs text-slate-200 leading-relaxed block font-mono bg-black/60 p-3 rounded">
            FROM node:18-alpine<br/>
            WORKDIR /app<br/>
            COPY . .<br/>
            RUN npm install<br/>
            EXPOSE 3000<br/>
            CMD ["npm", "start"]
          </code>
        </div>
      </div>
    </PlaygroundSection>
  )
}
