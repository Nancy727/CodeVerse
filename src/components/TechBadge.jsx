import React from 'react'

export default function TechBadge({level}){
  const color = level === 'Beginner' ? 'bg-cyan-600' : level === 'Intermediate' ? 'bg-blue-600' : level === 'Advanced' ? 'bg-purple-600' : 'bg-slate-600'
  return (
    <span className={`${color} text-xs px-2 py-1 rounded-full text-white/95`}>{level}</span>
  )
}
