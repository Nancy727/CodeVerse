import React, { useState } from 'react'
import { Copy, ChevronDown } from 'lucide-react'
import CopyButton from './CopyButton'

export default function CommandCard({ command }) {
  const [expanded, setExpanded] = useState(false)
  const summary = command.description || command.explanation || command.use_case || ''
  const details = command.whatItDoes || command.realUseCase || ''
  const example = command.example || command.example_output || ''

  return (
    <div className="glass-card p-4 border border-cyan-400/20 hover:border-cyan-300/50 transition mb-3">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start justify-between text-left hover:bg-white/5 p-2 rounded transition"
      >
        <div className="flex-1">
          <h3 className="font-mono text-cyan-300 text-sm font-bold">{command.cmd}</h3>
          <p className="text-xs text-slate-400 mt-1">{command.description}</p>
        </div>
        <ChevronDown
          size={20}
          className="flex-shrink-0 text-slate-400 transition"
          style={{ transform: expanded ? 'rotate(180deg)' : '' }}
        />
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          {summary && (
            <div>
              <h4 className="text-sm font-semibold text-cyan-300">Description</h4>
              <p className="text-xs text-slate-300 mt-1">{summary}</p>
            </div>
          )}

          {command.realUseCase && (
            <div className="bg-blue-500/10 p-3 rounded border border-blue-400/30">
              <h4 className="text-sm font-semibold text-blue-300">💡 Why it is used</h4>
              <p className="text-sm text-slate-200 mt-1 font-medium">{command.realUseCase}</p>
            </div>
          )}

          {details && (
            <div>
              <h4 className="text-sm font-semibold text-green-300">✅ What it does</h4>
              <p className="text-xs text-slate-300 mt-1">{details}</p>
            </div>
          )}

          {example && (
            <div>
              <h4 className="text-sm font-semibold text-purple-300">💻 Example</h4>
              <pre className="mt-1 text-xs bg-black/40 p-2 rounded border border-white/5 text-green-300 overflow-x-auto">
                {example}
              </pre>
            </div>
          )}

          {command.commonMistake && (
            <div className="bg-red-500/10 p-2 rounded border border-red-400/20">
              <h4 className="text-sm font-semibold text-red-300">⚠️ Common mistake</h4>
              <p className="text-xs text-slate-300 mt-1">{command.commonMistake}</p>
            </div>
          )}

          {command.difficulty && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Difficulty:</span>
              <span className={`text-xs font-semibold ${
                command.difficulty === 'Beginner' ? 'text-green-400' :
                command.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {command.difficulty}
              </span>
            </div>
          )}

          {command.cmd && (
            <div className="pt-2 flex justify-end">
              <CopyButton text={command.cmd} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
