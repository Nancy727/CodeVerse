import React, { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function LabCard({ labs }) {
  if (!labs || labs.length === 0) return null
  const [completedSteps, setCompletedSteps] = useState({})

  const toggleStep = (labIdx, stepIdx) => {
    const key = `${labIdx}-${stepIdx}`
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">🧪 Hands-On Labs</h2>
      
      <div className="space-y-6">
        {labs.map((lab, labIdx) => (
          <div key={labIdx} className="glass-card p-6 border border-cyan-400/20">
            <h3 className="text-xl font-bold text-cyan-300 mb-2">{lab.title}</h3>
            <p className="text-sm text-slate-300 mb-4">{lab.description}</p>
            <p className="text-xs text-slate-400 mb-4">⏱️ Estimated time: {lab.estimatedTime}</p>

            <div className="space-y-2">
              {lab.steps && lab.steps.map((step, stepIdx) => {
                const key = `${labIdx}-${stepIdx}`
                const isCompleted = completedSteps[key]

                return (
                  <button
                    key={stepIdx}
                    onClick={() => toggleStep(labIdx, stepIdx)}
                    className={`w-full text-left p-3 rounded-lg border transition ${
                      isCompleted
                        ? 'bg-green-500/10 border-green-400/30'
                        : 'bg-slate-800/30 border-cyan-400/20 hover:border-cyan-300/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        size={20}
                        className={`flex-shrink-0 mt-1 transition ${
                          isCompleted ? 'text-green-400' : 'text-slate-500'
                        }`}
                      />
                      <div className="flex-1">
                        <h4 className={`font-semibold ${isCompleted ? 'text-green-300 line-through' : 'text-cyan-300'}`}>
                          Step {stepIdx + 1}: {step.title}
                        </h4>
                        <p className="text-sm text-slate-400 mt-1">{step.instruction}</p>
                        {step.command && (
                          <pre className="mt-2 text-xs bg-black/40 p-2 rounded border border-white/5 text-green-300 overflow-x-auto">
                            {step.command}
                          </pre>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {lab.expectedOutput && (
              <div className="mt-4 p-3 bg-blue-500/5 border border-blue-400/20 rounded-lg">
                <p className="text-xs font-semibold text-blue-300 mb-1">Expected output:</p>
                <pre className="text-xs text-slate-300 overflow-x-auto">{lab.expectedOutput}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
