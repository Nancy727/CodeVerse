import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import Sidebar from './components/Sidebar'
import ErrorBoundary from './components/ErrorBoundary'

const Home = lazy(() => import('./pages/Home'))
const Technology = lazy(() => import('./pages/Technology'))
const CommandCenter = lazy(() => import('./pages/CommandCenter'))
const Roadmap = lazy(() => import('./pages/Roadmap'))
const ArchitecturePlayground = lazy(() => import('./pages/ArchitecturePlayground'))
const About = lazy(() => import('./pages/About'))

export default function App(){
  const [dark,setDark] = useState(true)
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
  },[dark])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-slate-900 text-slate-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-end gap-4 mb-4">
            <button onClick={() => setDark(d => !d)} className="p-2 rounded bg-white/5">
              {dark ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <Link to="/about" className="p-2 rounded bg-white/5">About</Link>
          </div>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/tech/:id" element={<Technology/>} />
              <Route path="/commands" element={<CommandCenter/>} />
              <Route path="/roadmap" element={<Roadmap/>} />
              <Route path="/playground" element={<ArchitecturePlayground/>} />
              <Route path="/about" element={<About/>} />
            </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
