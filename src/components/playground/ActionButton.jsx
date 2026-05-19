import React from 'react'
import { motion } from 'framer-motion'

/**
 * Interactive action button for playground interactions
 */
export default function ActionButton({
  label,
  icon: Icon,
  onClick = () => {},
  variant = 'primary', // 'primary' | 'danger' | 'success'
  disabled = false,
  loading = false,
  size = 'md'
}) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30'
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative rounded-lg font-semibold transition-all
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        flex items-center gap-2 whitespace-nowrap
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Icon */}
      {Icon && !loading && <Icon size={16} />}

      {/* Label */}
      <span>{label}</span>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
      />
    </motion.button>
  )
}
