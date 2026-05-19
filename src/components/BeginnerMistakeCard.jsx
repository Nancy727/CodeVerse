import React from 'react'
import { AlertCircle } from 'lucide-react'

export default function BeginnerMistakeCard({ mistakes }) {
  if (!mistakes || mistakes.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-red-300">⚠️ Beginner Mistakes to Avoid</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {mistakes.map((mistake, i) => (
          <div key={i} className="glass-card p-4 border-l-4 border-red-400/50 bg-red-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold text-red-300 mb-1">{mistake.title}</h3>
                <p className="text-sm text-slate-300 mb-2">{mistake.description}</p>
                {mistake.howToFix && (
                  <p className="text-sm text-green-300">
                    <strong>✅ How to fix:</strong> {mistake.howToFix}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
