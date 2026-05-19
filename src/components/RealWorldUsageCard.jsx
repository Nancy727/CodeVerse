import React from 'react'
import { Building2 } from 'lucide-react'

export default function RealWorldUsageCard({ companies }) {
  if (!companies || companies.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">🏢 How Big Companies Use It</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company, i) => (
          <div key={i} className="glass-card p-4 border border-purple-400/20 hover:border-purple-300/50 transition">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{company.logo || '🏢'}</span>
              <div>
                <h3 className="font-bold text-purple-300">{company.name}</h3>
                <p className="text-xs text-slate-400">{company.industry}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{company.usage}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
