import React from 'react'

export default function ProgressTracker({percent=0}){
  const clamp = Math.max(0, Math.min(100, percent))
  return (
    <div className="w-full">
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="h-2 bg-cyan-500" style={{width: `${clamp}%`, boxShadow: '0 0 12px rgba(34,211,238,0.2)'}} />
      </div>
      <div className="text-xs text-slate-400 mt-1">Progress: {clamp}%</div>
    </div>
  )
}
