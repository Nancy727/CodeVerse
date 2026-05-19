import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, HardDrive } from 'lucide-react'
import PlaygroundSection from './PlaygroundSection'
import InteractiveNode from './InteractiveNode'
import TooltipCard from './TooltipCard'

export default function AWSProductionArchitecture() {
  const [selectedService, setSelectedService] = useState(null)

  const awsServices = [
    {
      id: 'route53',
      name: 'Route 53',
      icon: '🌍',
      layer: 'DNS',
      description: 'Domain registration & DNS routing',
      purpose: 'Routes users to nearest CloudFront edge',
      realWorld: 'Your domain name points here. Manages traffic routing.',
      cost: '$0.50/million queries'
    },
    {
      id: 'cloudfront',
      name: 'CloudFront',
      icon: '🚀',
      layer: 'CDN',
      description: 'Content distribution network',
      purpose: 'Caches content at edge locations globally',
      realWorld: 'Users in Tokyo download from Tokyo server, not US.',
      cost: '$0.085/GB transferred'
    },
    {
      id: 'alb',
      name: 'Application Load Balancer',
      icon: '⚖️',
      layer: 'Load Balancing',
      description: 'Distributes traffic across instances',
      purpose: 'Route requests to healthy EC2 instances',
      realWorld: 'If one server is slow, requests go to faster one.',
      cost: '$0.0225/hour + data charges'
    },
    {
      id: 'ec2',
      name: 'EC2 (t3.micro)',
      icon: '💻',
      layer: 'Compute',
      description: 'Virtual machine instances',
      purpose: 'Runs your application code',
      realWorld: 'Your Node.js/React app runs here.',
      cost: '$0.0104/hour for t3.micro'
    },
    {
      id: 'docker',
      name: 'Docker Containers',
      icon: '🐳',
      layer: 'Container',
      description: 'Containerized application',
      purpose: 'Packages app with dependencies',
      realWorld: 'Same app runs identically on any machine.',
      cost: 'Included in EC2'
    },
    {
      id: 'k8s',
      name: 'Kubernetes (EKS)',
      icon: '☸️',
      layer: 'Orchestration',
      description: 'Container orchestration',
      purpose: 'Manages container deployment & scaling',
      realWorld: 'Auto-restart failed containers, scale up during traffic spikes.',
      cost: '$0.10/hour per cluster + EC2'
    },
    {
      id: 'rds',
      name: 'RDS (PostgreSQL)',
      icon: '🗄️',
      layer: 'Database',
      description: 'Managed relational database',
      purpose: 'Stores application data persistently',
      realWorld: 'User data, product info, transactions stored here.',
      cost: '$0.015/hour for db.t3.micro'
    },
    {
      id: 'elasticache',
      name: 'ElastiCache',
      icon: '⚡',
      layer: 'Cache',
      description: 'In-memory caching (Redis/Memcached)',
      purpose: 'Fast data access, reduces database load',
      realWorld: 'Cache frequently accessed data in memory.',
      cost: '$0.017/hour for cache.t3.micro'
    },
    {
      id: 'cloudwatch',
      name: 'CloudWatch',
      icon: '📊',
      layer: 'Monitoring',
      description: 'Logs, metrics, alarms',
      purpose: 'Monitor application health & performance',
      realWorld: 'Alert you when CPU spikes or error rate increases.',
      cost: '$0.30/million log ingestion'
    },
    {
      id: 's3',
      name: 'S3',
      icon: '🪣',
      layer: 'Storage',
      description: 'Object storage for files',
      purpose: 'Store images, videos, backups',
      realWorld: 'User uploads saved here, accessed via CloudFront.',
      cost: '$0.023/GB storage'
    }
  ]

  const architectureLayers = [
    {
      layer: 'DNS & CDN',
      services: ['route53', 'cloudfront'],
      color: 'from-blue-600 to-blue-700'
    },
    {
      layer: 'Load Balancing',
      services: ['alb'],
      color: 'from-purple-600 to-purple-700'
    },
    {
      layer: 'Compute & Containers',
      services: ['ec2', 'docker', 'k8s'],
      color: 'from-pink-600 to-pink-700'
    },
    {
      layer: 'Data & Cache',
      services: ['rds', 'elasticache', 's3'],
      color: 'from-green-600 to-green-700'
    },
    {
      layer: 'Monitoring',
      services: ['cloudwatch'],
      color: 'from-yellow-600 to-yellow-700'
    }
  ]

  return (
    <PlaygroundSection
      title="AWS Production Architecture"
      description="Explore a complete AWS infrastructure for scalable cloud applications"
      icon={Globe}
    >
      <div className="space-y-6">
        {/* Architecture Layers */}
        <div className="space-y-4">
          {architectureLayers.map((layerGroup, layerIdx) => (
            <motion.div
              key={layerGroup.layer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: layerIdx * 0.1 }}
              className="space-y-2"
            >
              {/* Layer header */}
              <div className={`text-xs font-bold px-3 py-1 rounded w-fit bg-gradient-to-r ${layerGroup.color} text-white`}>
                {layerGroup.layer}
              </div>

              {/* Services in this layer */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-2">
                {layerGroup.services.map((serviceId) => {
                  const service = awsServices.find(s => s.id === serviceId)
                  return (
                    <motion.div
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    >
                      <InteractiveNode
                        title={`${service.icon} ${service.name}`}
                        description={service.description}
                        status={selectedService === service.id ? 'active' : 'normal'}
                        onClick={() => {}}
                        expandable={true}
                      >
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-semibold text-slate-300">Purpose:</p>
                            <p className="text-sm text-slate-400">{service.purpose}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-300">Real-World:</p>
                            <p className="text-sm text-slate-400">{service.realWorld}</p>
                          </div>
                          <div className="bg-green-900/20 border border-green-600/30 rounded p-2">
                            <p className="text-xs font-semibold text-green-300">💰 Cost:</p>
                            <p className="text-xs text-green-200">{service.cost}</p>
                          </div>
                        </div>
                      </InteractiveNode>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow Diagram */}
        <div className="pt-4 border-t border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">🔄 Request Flow</h3>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="px-3 py-1 bg-blue-900/50 border border-blue-600/30 rounded">🌍 User</span>
              <span className="text-cyan-400">→</span>
              <span className="px-3 py-1 bg-blue-900/50 border border-blue-600/30 rounded">Route 53</span>
              <span className="text-cyan-400">→</span>
              <span className="px-3 py-1 bg-blue-900/50 border border-blue-600/30 rounded">CloudFront</span>
              <span className="text-cyan-400">→</span>
              <span className="px-3 py-1 bg-purple-900/50 border border-purple-600/30 rounded">ALB</span>
              <span className="text-cyan-400">→</span>
              <span className="px-3 py-1 bg-pink-900/50 border border-pink-600/30 rounded">EC2/K8s</span>
              <span className="text-cyan-400">→</span>
              <span className="px-3 py-1 bg-green-900/50 border border-green-600/30 rounded">RDS</span>
            </div>
          </div>
        </div>

        {/* Cost Calculator */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <h3 className="font-semibold text-yellow-300 mb-3">💰 Monthly Cost Estimate</h3>
          <div className="space-y-2 text-sm">
            {[
              { service: 'EC2 (t3.micro)', cost: '$7.50' },
              { service: 'RDS (db.t3.micro)', cost: '$10.80' },
              { service: 'ALB', cost: '$16.20' },
              { service: 'CloudWatch', cost: '$1.00' },
              { service: 'Data Transfer', cost: '$5.00' },
              { service: 'S3 Storage', cost: '$5.00' }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between text-slate-300">
                <span>{item.service}</span>
                <span className="text-cyan-300 font-mono">{item.cost}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-600 flex justify-between font-semibold">
              <span>Total (Approximate)</span>
              <span className="text-green-300 font-mono">$45.50/month</span>
            </div>
          </div>
        </div>

        {/* Scaling Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Vertical Scaling',
              content: 'Use larger instance type (t3.micro → t3.small). Restart required.',
              icon: '📈'
            },
            {
              title: 'Horizontal Scaling',
              content: 'Add more EC2 instances behind load balancer. Zero downtime.',
              icon: '🔢'
            },
            {
              title: 'Auto Scaling',
              content: 'AWS automatically adds/removes instances based on demand.',
              icon: '🤖'
            },
            {
              title: 'Database Scaling',
              content: 'Read replicas for read-heavy workloads. RDS handles writes.',
              icon: '💾'
            }
          ].map((pattern, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50"
            >
              <h4 className="font-semibold text-blue-300 mb-1 flex items-center gap-2">
                <span>{pattern.icon}</span>
                {pattern.title}
              </h4>
              <p className="text-sm text-slate-300">{pattern.content}</p>
            </motion.div>
          ))}
        </div>

        {/* High Availability */}
        <TooltipCard
          title="High Availability Setup"
          content="Deploy across multiple availability zones. ALB health checks ensure traffic only goes to healthy instances. RDS automatic backup and failover. CloudFront caches content for fast delivery. If one AZ fails, traffic automatically routes to another."
          type="success"
        />

        {/* Security Note */}
        <TooltipCard
          title="Security Best Practices"
          content="Use Security Groups to whitelist traffic. Deploy in private subnets with NAT Gateway. Enable CloudWatch for monitoring. Use IAM roles for EC2. RDS encryption at rest & in transit. VPC endpoint for S3."
          type="info"
        />
      </div>
    </PlaygroundSection>
  )
}
