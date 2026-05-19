import React, {useState} from 'react'
import docker from '../data/docker.json'
import k8s from '../data/kubernetes.json'
import CopyButton from '../components/CopyButton'

const all = [docker, k8s]

export default function CommandCenter(){
  const [q,setQ] = useState('')
  const cmds = all.flatMap(t=> t.commands.map(c=> ({...c, tech: t.title})))
  const filtered = cmds.filter(c => {
    const description = (c.description || c.explanation || c.use_case || '').toLowerCase()
    return c.cmd.includes(q) || description.includes(q.toLowerCase()) || c.tech.toLowerCase().includes(q.toLowerCase())
  })


  return (
    <div>
      <h1 className="text-2xl font-bold">Command Center</h1>
      <div className="mt-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search commands" className="p-2 rounded bg-white/5 w-full" />
      </div>
      <div className="mt-4 grid gap-2">
        {filtered.map((c,i)=> (
          <div key={i} className="glass-card p-3 flex justify-between items-center">
            <div>
              <div className="font-medium">{c.cmd}</div>
              <div className="text-sm text-slate-400">{c.description || c.explanation || c.use_case} · <span className="text-xs">{c.tech}</span></div>
            </div>
            <div>
              <CopyButton text={c.cmd} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
