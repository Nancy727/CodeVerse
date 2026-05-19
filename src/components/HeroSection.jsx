import React from 'react'
import { Star, Clock, Zap } from 'lucide-react'

export default function HeroSection({ hero }) {
  if (!hero) return null

  return (
    <div className="relative overflow-hidden rounded-xl mb-8">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
      
      {/* Content */}
      <div className="relative p-8 md:p-12">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {hero.heading}
            </h1>
            <p className="text-xl text-slate-300 mb-4">{hero.subtitle}</p>
          </div>
          {hero.icon && <div className="text-6xl">{hero.icon}</div>}
        </div>

        {/* Why Learn Card */}
        {hero.whyLearn && (
          <div className="glass-card p-4 mb-6 border border-cyan-400/20">
            <div className="flex items-start gap-3">
              <Zap className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-cyan-300">Why learn this?</h3>
                <p className="text-slate-300 text-sm mt-1">{hero.whyLearn}</p>
              </div>
            </div>
          </div>
        )}

        {/* Meta badges */}
        <div className="flex flex-wrap gap-3">
          {hero.difficulty && (
            <div className="glass-card px-4 py-2 text-sm">
              <span className="text-slate-400">Difficulty:</span>
              <span className={`ml-2 font-semibold ${
                hero.difficulty === 'Beginner' ? 'text-green-400' :
                hero.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {hero.difficulty}
              </span>
            </div>
          )}
          {hero.timeToLearn && (
            <div className="glass-card px-4 py-2 text-sm flex items-center gap-2">
              <Clock size={16} className="text-purple-400" />
              <span className="text-slate-300">{hero.timeToLearn}</span>
            </div>
          )}
          {hero.keySkill && (
            <div className="glass-card px-4 py-2 text-sm flex items-center gap-2">
              <Star size={16} className="text-yellow-400" />
              <span className="text-slate-300">{hero.keySkill}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
