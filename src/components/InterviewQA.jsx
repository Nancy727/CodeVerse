import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function InterviewQA({ questions }) {
  if (!questions || questions.length === 0) return null
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (idx) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">🎯 Interview Preparation</h2>
      
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="glass-card border border-yellow-400/20 hover:border-yellow-300/50 transition overflow-hidden">
            <button
              onClick={() => toggleExpand(i)}
              className="w-full p-4 flex items-start justify-between text-left hover:bg-white/5 transition"
            >
              <div className="flex-1">
                <p className="font-bold text-yellow-300">{q.question}</p>
                {q.difficulty && (
                  <span className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                    q.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                    q.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {q.difficulty}
                  </span>
                )}
              </div>
              <ChevronDown
                size={20}
                className="flex-shrink-0 text-slate-400 transition"
                style={{ transform: expanded[i] ? 'rotate(180deg)' : '' }}
              />
            </button>

            {expanded[i] && (
              <div className="px-4 pb-4 border-t border-white/10 bg-black/20">
                {q.answer && (
                  <div className="mt-3">
                    <p className="text-sm text-slate-300 mb-3">{q.answer}</p>
                  </div>
                )}

                {q.example && (
                  <div className="mt-3 p-3 bg-slate-800/50 rounded border border-white/5">
                    <p className="text-xs font-semibold text-cyan-300 mb-2">💡 Example:</p>
                    <pre className="text-xs text-slate-300 overflow-x-auto">{q.example}</pre>
                  </div>
                )}

                {q.followUp && (
                  <div className="mt-3 p-3 bg-purple-500/10 rounded border border-purple-400/20">
                    <p className="text-xs font-semibold text-purple-300 mb-1">Follow-up question:</p>
                    <p className="text-xs text-slate-300">{q.followUp}</p>
                  </div>
                )}

                {q.tips && (
                  <div className="mt-3 p-3 bg-blue-500/10 rounded border border-blue-400/20">
                    <p className="text-xs font-semibold text-blue-300 mb-1">💬 Tips for answer:</p>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {q.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-blue-400 flex-shrink-0">→</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
