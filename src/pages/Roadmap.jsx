import React, {useState, useMemo} from 'react'
import RoadmapCard from '../components/RoadmapCard'
import docker from '../data/roadmaps/docker.json'
import kubernetes from '../data/roadmaps/kubernetes.json'
import terraform from '../data/roadmaps/terraform.json'
import aws from '../data/roadmaps/aws.json'
import grafana from '../data/roadmaps/grafana.json'
import prometheus from '../data/roadmaps/prometheus.json'

const ALL = [docker, kubernetes, terraform, aws, grafana, prometheus]

export default function Roadmap(){
  const [query,setQuery] = useState('')
  const [filterLevel,setFilterLevel] = useState('')

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    return ALL.map(card=>{
      if(!q && !filterLevel) return card
      const matches = (stage)=> stage.filter(n=> n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q))
      const out = {
        ...card,
        beginner: matches(card.beginner),
        intermediate: matches(card.intermediate),
        advanced: matches(card.advanced),
        production: matches(card.production)
      }
      // if filterLevel is set, only keep nodes matching that level
      if(filterLevel){
        const lvl = filterLevel
        out.beginner = out.beginner.filter(n=> n.difficulty === lvl)
        out.intermediate = out.intermediate.filter(n=> n.difficulty === lvl)
        out.advanced = out.advanced.filter(n=> n.difficulty === lvl)
        out.production = out.production.filter(n=> n.difficulty === lvl)
      }
      return out
    }).filter(c => (c.beginner.length + c.intermediate.length + c.advanced.length + c.production.length) > 0)
  },[query,filterLevel])

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Roadmaps</h1>
        <div className="flex items-center gap-3">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search topics..." className="px-3 py-2 rounded bg-white/3 text-slate-100 placeholder:text-slate-400" />
          <select value={filterLevel} onChange={e=>setFilterLevel(e.target.value)} className="px-3 py-2 rounded bg-white/3 text-slate-100">
            <option value="">All levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Production">Production</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        <nav className="w-56 sticky top-24 hidden md:block">
          <div className="glass-card p-4 space-y-2">
            <h4 className="font-semibold">Jump to</h4>
            {ALL.map((c,i)=> (
              <a key={i} href={`#${c.title.replace(/\s+/g,'-').toLowerCase()}`} className="block text-slate-300 hover:text-white">{c.title}</a>
            ))}
          </div>
        </nav>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((card,idx)=> (
            <section key={idx} id={card.title.replace(/\s+/g,'-').toLowerCase()}>
              <RoadmapCard data={card} />
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
