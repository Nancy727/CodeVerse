import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function ArchitectureFlow({ steps }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">🏗️ How It Works: Step by Step</h2>
      
      <div className="relative">
        {/* Desktop flow */}
        <div className="hidden md:flex gap-2 mb-8">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flex-1 glass-card p-4 border border-cyan-400/30 hover:border-cyan-300/60 transition group cursor-default">
                <div className="text-3xl mb-2">{step.icon}</div>
                <h3 className="font-bold text-cyan-300 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-400 mb-2">{step.description}</p>
                {step.details && (
                  <details className="text-xs text-slate-300 cursor-pointer">
                    <summary className="text-cyan-400 hover:text-cyan-300">More info</summary>
                    <p className="mt-2 text-slate-400">{step.details}</p>
                  </details>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition">
                  <ArrowRight size={24} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile flow - vertical */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => (
            <div key={i}>
              <div className="glass-card p-4 border border-cyan-400/30">
                <div className="text-2xl mb-2">{step.icon}</div>
                <h3 className="font-bold text-cyan-300 mb-1">Step {i + 1}: {step.title}</h3>
                <p className="text-sm text-slate-300 mb-2">{step.description}</p>
                {step.details && (
                  <details className="text-xs text-slate-400 cursor-pointer">
                    <summary className="text-cyan-400">More info</summary>
                    <p className="mt-2 text-slate-400">{step.details}</p>
                  </details>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center text-cyan-400 py-2">
                  <ArrowRight size={20} className="rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
