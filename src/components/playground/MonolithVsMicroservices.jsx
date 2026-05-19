import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, AlertCircle, Zap } from 'lucide-react'
import PlaygroundSection from './PlaygroundSection'
import InteractiveNode from './InteractiveNode'
import ActionButton from './ActionButton'
import TooltipCard, { HoverTooltip } from './TooltipCard'
import { FlowConnector } from './FlowConnector'

export default function MonolithVsMicroservices() {
  const [monolithFailed, setMonolithFailed] = useState(false)
  const [failedService, setFailedService] = useState(null)
  const [scaledServices, setScaledServices] = useState({})

  const handleMonolithFailure = () => {
    setMonolithFailed(!monolithFailed)
  }

  const handleMicroserviceFailure = (service) => {
    setFailedService(failedService === service ? null : service)
  }

  const handleScaleService = (service) => {
    setScaledServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }))
  }

  const monolithServices = ['Frontend', 'Backend', 'Database']
  const microservices = [
    { name: 'Auth Service', color: 'from-blue-600 to-blue-700' },
    { name: 'Payment Service', color: 'from-purple-600 to-purple-700' },
    { name: 'Notification Service', color: 'from-pink-600 to-pink-700' }
  ]

  return (
    <PlaygroundSection
      title="Monolith vs Microservices"
      description="Understand the architectural differences and how independent services scale"
      icon={Database}
    >
      <div className="space-y-6">
        {/* Architecture Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monolith Architecture */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
              <span className="text-xl">🏢</span> Monolithic Architecture
            </h3>

            <div className="space-y-3">
              {monolithServices.map((service, idx) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <InteractiveNode
                    title={service}
                    description={service === 'Backend' ? 'All business logic in one place' : 'Single point of deployment'}
                    status={monolithFailed ? 'failed' : 'normal'}
                    isClickable={false}
                  />
                </motion.div>
              ))}
            </div>

            {/* Info card */}
            <TooltipCard
              title="Monolith Challenge"
              content="If one part fails, the entire system crashes. Scaling requires deploying the whole application."
              type="warning"
            />

            <ActionButton
              label={monolithFailed ? 'Restore System' : 'Simulate Failure'}
              onClick={handleMonolithFailure}
              variant={monolithFailed ? 'success' : 'danger'}
            />
          </div>

          {/* Microservices Architecture */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
              <span className="text-xl">🚀</span> Microservices Architecture
            </h3>

            <div className="space-y-3">
              {microservices.map((service, idx) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <InteractiveNode
                    title={service.name}
                    description="Independent service + dedicated database"
                    status={failedService === service.name ? 'failed' : 'active'}
                    onClick={() => handleMicroserviceFailure(service.name)}
                    expandable={true}
                  >
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-300">Service Details:</p>
                      <ul className="text-xs space-y-1 text-slate-400 list-disc list-inside">
                        <li>Independent codebase</li>
                        <li>Own database</li>
                        <li>Scales independently</li>
                      </ul>
                    </div>
                  </InteractiveNode>
                </motion.div>
              ))}

              {/* Shared Database Note */}
              <div className="flex items-center gap-2 text-xs text-slate-400 px-2 py-1">
                <Database size={14} /> Each service can have its own data store
              </div>
            </div>

            {/* Info card */}
            <TooltipCard
              title="Microservices Benefit"
              content="Other services continue running even if one fails. Scale only what's needed."
              type="success"
            />

            <div className="space-y-2">
              <ActionButton
                label="Scale Payment Service"
                icon={Zap}
                onClick={() => handleScaleService('Payment')}
                variant={scaledServices['Payment'] ? 'success' : 'primary'}
              />
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">📊 Key Differences</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { aspect: 'Failure Impact', monolith: 'Entire system down', micro: 'Isolated to one service' },
              { aspect: 'Scaling', monolith: 'Scale everything', micro: 'Scale individual services' },
              { aspect: 'Deployment', monolith: 'Deploy entire app', micro: 'Deploy single service' },
              { aspect: 'Technology', monolith: 'Same tech stack', micro: 'Different tech per service' }
            ].map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50"
              >
                <p className="text-xs font-semibold text-slate-300 mb-2">{comp.aspect}</p>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">
                    <span className="text-cyan-400">Monolith:</span> {comp.monolith}
                  </p>
                  <p className="text-xs text-slate-400">
                    <span className="text-purple-400">Microservices:</span> {comp.micro}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-world Example */}
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50">
          <h3 className="text-sm font-semibold text-blue-300 mb-2">💡 Real-World Example</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong>Netflix</strong> started as a monolith but transitioned to microservices. When they scale the video streaming service during peak hours, the payment service doesn't need to scale with it. This independent scaling saves infrastructure costs.
          </p>
        </div>
      </div>
    </PlaygroundSection>
  )
}
