import React from 'react'
import TechBadge from './TechBadge'

export default function RoadmapNode({node}){
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-white/2 via-white/1 to-white/2 border border-white/5 glass-card hover:scale-[1.01] transition-transform">
      <div className="flex-shrink-0 w-3 h-3 mt-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(14,165,233,0.25)]" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-slate-100">{node.title}</h4>
          <TechBadge level={node.difficulty} />
        </div>
        <p className="text-slate-300 text-sm mt-2">{node.description}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Time: {node.time}</span>
          <span>Use: {node.useCase}</span>
        </div>
        {node.project && <div className="mt-3 text-sm text-slate-200 bg-black/10 p-2 rounded">Project: {node.project}</div>}
      </div>
    </div>
  )
}
