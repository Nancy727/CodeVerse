import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertCircle } from 'lucide-react'
import PlaygroundSection from './PlaygroundSection'
import InteractiveNode from './InteractiveNode'
import { RequestAnimation, AnimatedRequestDot, MovingDotsAnimation } from './RequestAnimation'
import ActionButton from './ActionButton'
import TooltipCard from './TooltipCard'

export default function MonitoringArchitecture() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [metricsLevel, setMetricsLevel] = useState(50)
  const [alertActive, setAlertActive] = useState(false)

  const monitoringFlow = [
    {
      label: 'Application',
      description: 'Generates metrics (CPU, memory, requests)',
      icon: '⚡',
      details: 'Exposes /metrics endpoint'
    },
    {
      label: 'Prometheus',
      description: 'Scrapes metrics every 15 seconds',
      icon: '📊',
      details: 'Time-series database'
    },
    {
      label: 'Alertmanager',
      description: 'Evaluates alerting rules',
      icon: '🔔',
      details: 'Triggers when thresholds exceeded'
    },
    {
      label: 'Grafana',
      description: 'Visualizes metrics in dashboards',
      icon: '📈',
      details: 'Beautiful graphs and alerts'
    }
  ]

  const metrics = [
    {
      name: 'CPU Usage',
      value: metricsLevel,
      unit: '%',
      threshold: 80,
      icon: '💻'
    },
    {
      name: 'Memory Usage',
      value: Math.floor(metricsLevel * 0.8),
      unit: '%',
      threshold: 85,
      icon: '🧠'
    },
    {
      name: 'Request Latency',
      value: Math.floor(metricsLevel * 2),
      unit: 'ms',
      threshold: 200,
      icon: '⏱️'
    },
    {
      name: 'Error Rate',
      value: Math.floor(metricsLevel * 0.1),
      unit: '%',
      threshold: 5,
      icon: '❌'
    }
  ]

  const handleUpdateMetrics = (delta) => {
    setMetricsLevel(prev => Math.max(0, Math.min(100, prev + delta)))
  }

  const isAlertThreshold = metrics.some(m => m.value > m.threshold)

  return (
    <PlaygroundSection
      title="Monitoring Architecture"
      description="Visualize how metrics flow through a monitoring stack"
      icon={Activity}
    >
      <div className="space-y-6">
        {/* Main Monitoring Flow */}
        <div className="space-y-3">
          {monitoringFlow.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <InteractiveNode
                title={`${item.icon} ${item.label}`}
                description={item.description}
                status={isAnimating ? 'active' : 'normal'}
                expandable={true}
              >
                <p className="text-sm text-slate-300">{item.details}</p>
              </InteractiveNode>

              {/* Arrow */}
              {idx < monitoringFlow.length - 1 && (
                <div className="flex justify-center py-2">
                  <motion.div
                    className="text-cyan-400 text-2xl"
                    animate={isAnimating ? { y: [0, 5, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    ↓
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Control */}
        <div className="pt-4 border-t border-slate-700">
          <ActionButton
            label={isAnimating ? 'Stop Monitoring' : 'Start Monitoring'}
            onClick={() => setIsAnimating(!isAnimating)}
            variant={isAnimating ? 'danger' : 'success'}
          />
        </div>

        {/* Metrics Dashboard */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg p-4 border border-cyan-600/30">
          <h3 className="font-semibold text-cyan-300 mb-4 flex items-center gap-2">
            <Activity size={18} />
            Live Metrics
          </h3>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-lg p-3 border text-center transition-colors ${
                  metric.value > metric.threshold
                    ? 'border-red-500/50 bg-red-900/20'
                    : 'border-green-500/30 bg-green-900/10'
                }`}
              >
                <div className="text-2xl mb-1">{metric.icon}</div>
                <p className="text-xs text-slate-400 mb-1">{metric.name}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-lg font-bold ${
                    metric.value > metric.threshold ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {metric.value}
                  </span>
                  <span className="text-xs text-slate-400">{metric.unit}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Threshold: {metric.threshold}</p>
              </motion.div>
            ))}
          </div>

          {/* Metric Level Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-semibold text-slate-300">System Load</label>
              <span className="text-sm text-cyan-300 font-mono">{metricsLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={metricsLevel}
              onChange={(e) => setMetricsLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex gap-2">
              <ActionButton
                label="↓ Decrease"
                onClick={() => handleUpdateMetrics(-10)}
                variant="primary"
                size="sm"
              />
              <ActionButton
                label="↑ Increase"
                onClick={() => handleUpdateMetrics(10)}
                variant="primary"
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Alert System */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-lg p-4 border ${
            isAlertThreshold
              ? 'border-red-500/60 bg-red-900/20'
              : 'border-green-500/30 bg-green-900/10'
          }`}
        >
          <div className="flex items-center gap-3">
            {isAlertThreshold && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <AlertCircle className="text-red-400" size={24} />
              </motion.div>
            )}
            <div>
              <h4 className={`font-semibold ${isAlertThreshold ? 'text-red-300' : 'text-green-300'}`}>
                {isAlertThreshold ? '⚠️ ALERT: Thresholds Exceeded' : '✓ System Healthy'}
              </h4>
              <p className="text-sm text-slate-400 mt-1">
                {isAlertThreshold
                  ? `${metrics.filter(m => m.value > m.threshold).length} metric(s) exceeded threshold`
                  : 'All metrics within normal parameters'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Explained */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Scraping',
              content: 'Prometheus actively pulls metrics from /metrics endpoint. Default interval: 15 seconds.',
              icon: '📡'
            },
            {
              title: 'Alerting Rules',
              content: 'Define thresholds in Prometheus config. Triggered when condition is met for duration.',
              icon: '📋'
            },
            {
              title: 'Dashboards',
              content: 'Grafana visualizes data with graphs, tables, gauges. Custom queries with PromQL.',
              icon: '📊'
            },
            {
              title: 'Notifications',
              content: 'Alertmanager sends to Slack, Email, PagerDuty when alerts fire.',
              icon: '🔔'
            }
          ].map((concept, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50"
            >
              <h4 className="font-semibold text-blue-300 mb-1 flex items-center gap-2">
                <span>{concept.icon}</span>
                {concept.title}
              </h4>
              <p className="text-sm text-slate-300">{concept.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Common Metrics */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <h3 className="font-semibold text-purple-300 mb-3">📊 Common Metrics to Monitor</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'CPU Usage',
              'Memory Usage',
              'Disk I/O',
              'Network Latency',
              'Error Rate',
              'Request Count',
              'Database Queries',
              'Cache Hit Ratio',
              'Response Time'
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-900/50 rounded px-3 py-2 text-xs border border-slate-600/30 text-slate-300"
              >
                • {metric}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-world Scenario */}
        <TooltipCard
          title="Real-World Scenario"
          content="3 AM: Your application starts using more CPU (metric spike). Prometheus detects it after 15 seconds. Alertmanager evaluates the rule. If threshold exceeded for 5+ minutes, it fires an alert to your phone via PagerDuty. You wake up and investigate!"
          type="warning"
        />
      </div>
    </PlaygroundSection>
  )
}
