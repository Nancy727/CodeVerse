import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function LearningPath({ learningPath }) {
  if (!learningPath) return null
  const [expanded, setExpanded] = useState({})

  const levels = [
    { key: 'beginner', label: '🟢 Beginner Concepts', color: 'green' },
    { key: 'intermediate', label: '🟡 Intermediate Concepts', color: 'yellow' },
    { key: 'advanced', label: '🔴 Advanced Concepts', color: 'red' }
  ]

  const toggleExpand = (level) => {
    setExpanded(prev => ({ ...prev, [level]: !prev[level] }))
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">📚 Your Learning Path</h2>
      
      <div className="space-y-3">
        {levels.map(({ key, label, color }) => {
          const concepts = learningPath[key]
          if (!concepts || concepts.length === 0) return null

          const colorMap = {
            green: 'border-green-400/30 hover:border-green-300/60',
            yellow: 'border-yellow-400/30 hover:border-yellow-300/60',
            red: 'border-red-400/30 hover:border-red-300/60'
          }

          return (
            <div key={key} className={`glass-card border ${colorMap[color]} transition`}>
              <button
                onClick={() => toggleExpand(key)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
              >
                <h3 className="font-bold text-lg">{label}</h3>
                <ChevronDown
                  size={20}
                  style={{ transform: expanded[key] ? 'rotate(180deg)' : '' }}
                  className="transition"
                />
              </button>

              {expanded[key] && (
                <div className="px-4 pb-4 border-t border-white/10">
                  <ul className="mt-4 space-y-2">
                    {concepts.map((concept, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-cyan-400 font-bold flex-shrink-0">•</span>
                        <span className="text-slate-300">
                          {typeof concept === 'string' ? (
                            concept
                          ) : (
                            <>
                              <strong className="text-cyan-300">{concept.topic}:</strong>
                              <span className="text-slate-400"> {concept.description}</span>
                            </>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
