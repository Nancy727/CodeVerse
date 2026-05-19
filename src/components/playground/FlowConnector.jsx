import React from 'react'
import { motion } from 'framer-motion'

/**
 * Animated flow connector with glowing arrows
 * Supports horizontal and vertical layouts
 */
export function FlowConnector({ 
  isActive = true, 
  direction = 'right', 
  animated = true,
  label = '',
  onClick = () => {}
}) {
  const directions = {
    right: {
      path: 'M 0 0 L 60 0',
      arrowPoints: '70 0 60 -5 60 5'
    },
    down: {
      path: 'M 0 0 L 0 60',
      arrowPoints: '0 70 -5 60 5 60'
    },
    up: {
      path: 'M 0 0 L 0 -60',
      arrowPoints: '0 -70 -5 -60 5 -60'
    }
  }

  const config = directions[direction] || directions.right

  const lineVariants = {
    inactive: {
      stroke: 'rgba(100, 116, 139, 0.5)',
      strokeWidth: 2
    },
    active: {
      stroke: 'rgba(34, 211, 238, 0.8)',
      strokeWidth: 3,
      boxShadow: '0 0 10px rgba(34, 211, 238, 0.6)'
    }
  }

  const pulseVariants = {
    animate: {
      strokeDasharray: [0, 120],
      transition: { duration: 1.5, repeat: Infinity }
    }
  }

  return (
    <svg 
      width="80" 
      height="80" 
      viewBox="-10 -40 100 100"
      onClick={onClick}
      className="cursor-pointer"
      style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))' : 'none' }}
    >
      {/* Animated line */}
      <motion.path
        d={config.path}
        fill="none"
        variants={lineVariants}
        initial="inactive"
        animate={isActive ? 'active' : 'inactive'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow head */}
      <motion.polygon
        points={config.arrowPoints}
        fill={isActive ? 'rgba(34, 211, 238, 0.8)' : 'rgba(100, 116, 139, 0.5)'}
        animate={isActive && animated ? 'animate' : {}}
        variants={pulseVariants}
      />

      {/* Label */}
      {label && (
        <text
          x="30"
          y="-15"
          textAnchor="middle"
          className="fill-cyan-400 text-xs font-semibold"
          style={{ filter: 'drop-shadow(0 0 2px rgba(34, 211, 238, 0.8))' }}
        >
          {label}
        </text>
      )}
    </svg>
  )
}

/**
 * Larger SVG-based flow arrow for pipeline steps
 */
export function LargeFlowArrow({ isActive = true, label = '' }) {
  return (
    <div className="relative">
      <svg
        width="100%"
        height="60"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        className="w-full"
      >
        {/* Glow effect background */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Line */}
        <motion.line
          x1="10"
          y1="30"
          x2="180"
          y2="30"
          stroke={isActive ? 'rgba(34, 211, 238, 0.8)' : 'rgba(100, 116, 139, 0.3)'}
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Arrow head */}
        <motion.polygon
          points="190,30 180,24 180,36"
          fill={isActive ? 'rgba(34, 211, 238, 0.9)' : 'rgba(100, 116, 139, 0.3)'}
        />

        {/* Animated dash effect */}
        {isActive && (
          <motion.line
            x1="10"
            y1="30"
            x2="40"
            y2="30"
            stroke="rgba(6, 182, 212, 0.6)"
            strokeWidth="4"
            strokeDasharray="20"
            strokeLinecap="round"
            animate={{ x1: [10, 180], x2: [40, 210] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </svg>

      {label && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-semibold text-cyan-300 bg-black/60 px-2 py-1 rounded">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

export default FlowConnector
