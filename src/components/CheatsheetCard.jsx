import React, { useState } from 'react'
import CopyButton from './CopyButton'

export default function CheatsheetCard({ cheatsheet }) {
  if (!cheatsheet) return null
  const [search, setSearch] = useState('')

  const sections = Object.entries(cheatsheet).filter(([title, items]) => {
    if (!items || items.length === 0) return false
    return title.toLowerCase().includes(search.toLowerCase()) ||
      items.some(item => {
        const str = typeof item === 'string' ? item : JSON.stringify(item)
        return str.toLowerCase().includes(search.toLowerCase())
      })
  })

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">📋 Cheatsheet</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search cheatsheet..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-300/60"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(([title, items]) => (
          <div key={title} className="glass-card p-4 border border-cyan-400/20">
            <h3 className="font-bold text-cyan-300 mb-3 capitalize">{title.replace(/_/g, ' ')}</h3>
            
            <div className="space-y-2">
              {items.map((item, i) => {
                if (typeof item === 'string') {
                  return (
                    <div key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </div>
                  )
                }

                return (
                  <div key={i} className="p-2 bg-slate-800/30 rounded border border-white/5">
                    {item.cmd && (
                      <>
                        <div className="font-mono text-xs text-green-300 flex items-center justify-between">
                          <span>{item.cmd}</span>
                          <CopyButton text={item.cmd} />
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                        )}
                      </>
                    )}
                    {item.title && (
                      <>
                        <h4 className="text-sm font-semibold text-cyan-300">{item.title}</h4>
                        {item.description && (
                          <p className="text-xs text-slate-300 mt-1">{item.description}</p>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="text-center text-slate-400 py-8">
          No results found for "{search}"
        </div>
      )}
    </div>
  )
}
