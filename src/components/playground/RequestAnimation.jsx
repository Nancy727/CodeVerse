import React from 'react'
import { motion } from 'framer-motion'

/**
 * Animated request dots for visualizing data/request flow
 */
export function AnimatedRequestDot({ delay = 0, size = 'md' }) {
  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-4 h-4'
  }

  return (
    <motion.div
      className={`${sizes[size]} rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        delay
      }}
    />
  )
}

/**
 * Request animation with moving dots along a path
 */
export function RequestAnimation({
  pathSteps = [],
  stepDuration = 3,
  animated = true
}) {
  return (
    <div className="space-y-2">
      {pathSteps.map((step, idx) => (
        <motion.div
          key={idx}
          className="flex items-center gap-3 py-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          {/* Animated dot */}
          <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-cyan-500/10" />
            
            {animated && (
              <>
                <motion.div
                  className="absolute inset-1 rounded-full border border-cyan-400/50"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </>
            )}

            <AnimatedRequestDot size="sm" delay={idx * 0.2} />
          </div>

          {/* Step info */}
          <div className="flex-1">
            <h4 className="font-semibold text-white text-sm">{step.label}</h4>
            {step.description && (
              <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
            )}
          </div>

          {/* Arrow indicator */}
          {idx < pathSteps.length - 1 && (
            <div className="text-cyan-400/50 text-sm">→</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Moving dots animation across a horizontal or vertical line
 */
export function MovingDotsAnimation({
  count = 3,
  direction = 'horizontal',
  duration = 4
}) {
  const containerClasses = direction === 'horizontal'
    ? 'flex items-center justify-between h-16'
    : 'flex flex-col items-center justify-between w-16 h-64'

  return (
    <div className={containerClasses}>
      {Array.from({ length: count }).map((_, idx) => (
        <motion.div
          key={idx}
          className="relative"
          initial={{ 
            x: direction === 'horizontal' ? -100 : 0,
            y: direction === 'vertical' ? -100 : 0
          }}
          animate={{
            x: direction === 'horizontal' ? 100 : 0,
            y: direction === 'vertical' ? 100 : 0
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay: idx * 0.3,
            ease: 'linear'
          }}
        >
          <AnimatedRequestDot size="md" />
        </motion.div>
      ))}
    </div>
  )
}

export default AnimatedRequestDot
