import React from 'react'

/**
 * Reusable wrapper for each playground section
 * Handles consistent styling and layout
 */
export default function PlaygroundSection({ 
  title, 
  description, 
  children, 
  icon: Icon 
}) {
  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-6 w-6 text-cyan-400" />}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
