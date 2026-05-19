import React from 'react'

export default function ComparisonCard({ comparisons }) {
  if (!comparisons || comparisons.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">⚖️ Comparisons</h2>
      
      <div className="space-y-6">
        {comparisons.map((comp, i) => (
          <div key={i} className="glass-card p-6 border border-cyan-400/20">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">{comp.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left side */}
              <div className="p-4 bg-blue-500/5 border border-blue-400/20 rounded-lg">
                <h4 className="font-bold text-blue-300 mb-3">{comp.left.name}</h4>
                <ul className="space-y-2">
                  {comp.left.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-blue-400 font-bold flex-shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right side */}
              <div className="p-4 bg-purple-500/5 border border-purple-400/20 rounded-lg">
                <h4 className="font-bold text-purple-300 mb-3">{comp.right.name}</h4>
                <ul className="space-y-2">
                  {comp.right.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-purple-400 font-bold flex-shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {comp.whenToUse && (
              <div className="mt-4 p-3 bg-yellow-500/5 border border-yellow-400/20 rounded-lg">
                <p className="text-sm text-yellow-300">
                  <strong>💡 When to use:</strong> {comp.whenToUse}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
