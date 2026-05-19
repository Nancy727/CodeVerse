import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'

/**
 * Tooltip/info card with rich content
 */
export default function TooltipCard({
  title,
  content,
  icon: Icon = Info,
  type = 'info', // 'info' | 'warning' | 'success' | 'error'
  dismissible = false,
  onDismiss = () => {}
}) {
  const [isVisible, setIsVisible] = useState(true)

  const typeClasses = {
    info: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-300',
    warning: 'border-yellow-500/40 bg-yellow-500/5 text-yellow-300',
    success: 'border-green-500/40 bg-green-500/5 text-green-300',
    error: 'border-red-500/40 bg-red-500/5 text-red-300'
  }

  const iconClasses = {
    info: 'text-cyan-400',
    warning: 'text-yellow-400',
    success: 'text-green-400',
    error: 'text-red-400'
  }

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`
            rounded-lg border p-4
            ${typeClasses[type]}
            flex gap-3 items-start
          `}
        >
          {/* Icon */}
          <Icon className={`flex-shrink-0 mt-0.5 ${iconClasses[type]}`} size={20} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="font-semibold mb-1">{title}</h4>
            )}
            {content && (
              <p className="text-sm opacity-90 leading-relaxed">
                {content}
              </p>
            )}
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <motion.button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Expandable tooltip that shows on hover or click
 */
export function HoverTooltip({ children, tooltip, side = 'top' }) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${positionClasses[side]} left-1/2 transform -translate-x-1/2 z-50 whitespace-nowrap`}
          >
            <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 shadow-lg">
              {tooltip}
              <div
                className={`absolute w-2 h-2 bg-slate-900 border border-slate-700 transform rotate-45
                ${side === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' : ''}
                ${side === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 mb-px' : ''}
              `}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

