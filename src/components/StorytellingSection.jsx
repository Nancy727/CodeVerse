import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function StorytellingSection({ storytelling }) {
  if (!storytelling) return null
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="glass-card p-6 mb-8 border-l-4 border-cyan-400/50">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">📖 The Story Behind It</h2>
      
      <div className="space-y-4">
        {storytelling.problem && (
          <div className="p-4 bg-red-500/5 rounded-lg border border-red-400/20">
            <h3 className="font-semibold text-red-300 mb-2">❌ The Problem</h3>
            <p className="text-slate-300">{storytelling.problem}</p>
          </div>
        )}

        {storytelling.solution && (
          <div className="p-4 bg-green-500/5 rounded-lg border border-green-400/20">
            <h3 className="font-semibold text-green-300 mb-2">✅ The Solution</h3>
            <p className="text-slate-300">{storytelling.solution}</p>
          </div>
        )}

        {storytelling.analogy && (
          <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-400/20">
            <h3 className="font-semibold text-purple-300 mb-2">💡 Easy Analogy</h3>
            <p className="text-slate-300">{storytelling.analogy}</p>
          </div>
        )}

        {storytelling.realWorldExample && (
          <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-400/20">
            <h3 className="font-semibold text-blue-300 mb-2">🌍 Real-World Example</h3>
            <p className="text-slate-300">{storytelling.realWorldExample}</p>
          </div>
        )}
      </div>

      {storytelling.deepDive && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition"
        >
          <ChevronDown size={20} style={{ transform: expanded ? 'rotate(180deg)' : '' }} />
          <span>Want to dive deeper?</span>
        </button>
      )}
      
      {expanded && storytelling.deepDive && (
        <div className="mt-4 p-4 bg-slate-800/50 rounded-lg text-slate-300">
          {storytelling.deepDive}
        </div>
      )}
    </div>
  )
}
