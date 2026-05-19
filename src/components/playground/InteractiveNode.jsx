import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Interactive node/card for architecture components
 * Supports hover explanations and click interactions
 */
export default function InteractiveNode({
  title,
  description,
  icon: Icon,
  onClick = () => {},
  status = 'normal', // 'normal' | 'active' | 'failed'
  isClickable = true,
  children,
  expandable = true
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusColors = {
    normal: 'border-cyan-500/30 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:border-cyan-400',
    active: 'border-green-500 bg-gradient-to-br from-green-900/30 to-slate-900/80 shadow-lg shadow-green-500/20',
    failed: 'border-red-500 bg-gradient-to-br from-red-900/30 to-slate-900/80 shadow-lg shadow-red-500/20'
  }

  const statusGlow = {
    normal: 'group-hover:shadow-lg group-hover:shadow-cyan-500/20',
    active: 'shadow-lg shadow-green-500/30',
    failed: 'shadow-lg shadow-red-500/30'
  }

  const handleClick = () => {
    if (expandable) {
      setIsExpanded(!isExpanded)
    }
    onClick()
  }

  return (
    <motion.div
      className={`group relative rounded-lg border p-4 transition-all cursor-pointer ${statusColors[status]} ${statusGlow[status]}`}
      onClick={handleClick}
      whileHover={{ scale: isClickable ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect behind */}
      <div
        className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
        ${status === 'normal' ? 'bg-gradient-to-br from-cyan-500/0 to-blue-500/0' : ''}
        ${status === 'active' ? 'bg-gradient-to-br from-green-500/10 to-green-500/5' : ''}
        ${status === 'failed' ? 'bg-gradient-to-br from-red-500/10 to-red-500/5' : ''}
      `}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {Icon && (
              <Icon
                size={20}
                className={`flex-shrink-0
                ${status === 'normal' ? 'text-cyan-400' : ''}
                ${status === 'active' ? 'text-green-400' : ''}
                ${status === 'failed' ? 'text-red-400' : ''}
              `}
              />
            )}
            <h3 className="font-semibold text-white">{title}</h3>
          </div>

          {expandable && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-slate-400" />
            </motion.div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed">{description}</p>

        {/* Status indicator */}
        <div className="mt-2 flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full
            ${status === 'normal' ? 'bg-cyan-400' : ''}
            ${status === 'active' ? 'bg-green-400 animate-pulse' : ''}
            ${status === 'failed' ? 'bg-red-400' : ''}
          `}
          />
          <span className="text-xs text-slate-400">
            {status === 'normal' && 'Ready'}
            {status === 'active' && 'Active'}
            {status === 'failed' && 'Failed'}
          </span>
        </div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 mt-4 border-t border-slate-600/50 pt-4"
          >
            {children && (
              <div className="text-sm text-slate-300">
                {children}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
