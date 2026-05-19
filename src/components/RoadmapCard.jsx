import React from 'react'
import RoadmapNode from './RoadmapNode'
import ExpandableSection from './ExpandableSection'
import ProgressTracker from './ProgressTracker'

export default function RoadmapCard({data}){
  return (
    <div className="p-4 rounded-xl glass-card border border-white/5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100">{data.title}</h2>
          <p className="text-sm text-slate-400 mt-1">{data.subtitle}</p>
        </div>
        <div className="text-sm text-slate-400">Estimated: {data.estimated || 'Varies'}</div>
      </div>

      <div className="grid gap-3">
        <ExpandableSection title="Beginner" defaultOpen={true}>
          <div className="space-y-3">
            {data.beginner.map((n,i)=> <RoadmapNode key={i} node={n} />)}
          </div>
        </ExpandableSection>

        <ExpandableSection title="Intermediate">
          <div className="space-y-3">
            {data.intermediate.map((n,i)=> <RoadmapNode key={i} node={n} />)}
          </div>
        </ExpandableSection>

        <ExpandableSection title="Advanced">
          <div className="space-y-3">
            {data.advanced.map((n,i)=> <RoadmapNode key={i} node={n} />)}
          </div>
        </ExpandableSection>

        <ExpandableSection title="Production">
          <div className="space-y-3">
            {data.production.map((n,i)=> <RoadmapNode key={i} node={n} />)}
          </div>
        </ExpandableSection>
      </div>

      <div className="mt-4">
        <ProgressTracker percent={data.progress || 0} />
      </div>
    </div>
  )
}
