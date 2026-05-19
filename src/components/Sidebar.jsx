import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Command, Layers } from 'lucide-react'

const items = [
  {to:'/', label:'Home', icon: Home},
  {to:'/commands', label:'Command Center', icon: Command},
  {to:'/roadmap', label:'Roadmap', icon: Layers},
  {to:'/playground', label:'Playground', icon: Layers}
]

export default function Sidebar(){
  const loc = useLocation()
  return (
    <aside className="w-64 p-4 h-screen sticky top-0 glass-card border-r border-white/6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">CloudVerse</h1>
        <p className="text-sm text-slate-400">Learn Cloud & DevOps</p>
      </div>
      <nav className="flex flex-col gap-2">
        {items.map(i=>{
          const Icon = i.icon
          const active = loc.pathname === i.to
          return (
            <Link key={i.to} to={i.to} className={`flex items-center gap-3 p-2 rounded ${active? 'bg-blue-600/20':'hover:bg-white/3'}`}>
              <Icon size={16} />
              <span>{i.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-6 text-sm text-slate-400">Techs: Docker · Kubernetes · Terraform · AWS</div>
    </aside>
  )
}
