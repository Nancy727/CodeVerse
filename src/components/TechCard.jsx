import React from 'react'
import { Link } from 'react-router-dom'

function Icon({id}){
  const common = { width: 20, height: 20, className: 'inline-block mr-3 flex-shrink-0' }
  switch((id||'').toLowerCase()){
    case 'docker':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11h4v2H3zM8 9h3v2H8zM12 9h3v2h-3zM3 14h18v2H3z" fill="#2496ED" />
          <path d="M5 7h14v2H5z" fill="#2496ED" opacity="0.9" />
        </svg>
      )
    case 'k3s':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#326CE5">
          <path d="M12 2l3 5 6 2-5 4 1 6-5-3-5 3 1-6-5-4 6-2 3-5z" />
        </svg>
      )
    case 'terraform':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#7B42F6">
          <path d="M6 3h12v2H6zM9 7h6v10H9zM7 19h10v2H7z" />
        </svg>
      )
    case 'jenkins':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#D24939">
          <path d="M12 2c3 0 5 1 6 3 1 1 1 3 1 3s-2 1-3 0c-1-1-3-1-4-1s-3 0-4 1c-1 1-3 0-3 0s0-2 1-3c1-2 3-3 6-3z" />
        </svg>
      )
    case 'grafana':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#F37021">
          <path d="M12 2C8 2 4 5 4 9s4 7 8 11c4-4 8-7 8-11s-4-7-8-7z" />
        </svg>
      )
    case 'prometheus':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#E24E1B">
          <path d="M12 2s4 3 4 7-4 9-4 9-4-5-4-9 4-7 4-7z" />
        </svg>
      )
    case 'aws':
      return (
        <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FF9900">
          <path d="M4 12c0-3 4-6 8-6s8 3 8 6" stroke="#FF9900" strokeWidth="0" />
          <path d="M2 18h20v2H2z" fill="#FF9900"/>
        </svg>
      )
    default:
      return (
        <svg {...common} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
  }
}

export default function TechCard({tech}){
  return (
    <Link to={`/tech/${tech.id}`} className="block p-4 rounded-lg glass-card hover:scale-[1.02] transition-transform">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon id={tech.id} />
          <h3 className="text-lg font-semibold">{tech.title}</h3>
        </div>
        <span className="text-sm text-slate-400">{tech.level || 'Beginner'}</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{tech.summary}</p>
    </Link>
  )
}
