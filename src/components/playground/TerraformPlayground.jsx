import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, CheckCircle, AlertCircle } from 'lucide-react'
import PlaygroundSection from './PlaygroundSection'
import InteractiveNode from './InteractiveNode'
import { LargeFlowArrow } from './FlowConnector'
import ActionButton from './ActionButton'
import TooltipCard from './TooltipCard'

export default function TerraformPlayground() {
  const [currentStep, setCurrentStep] = useState(null)
  const [completedSteps, setCompletedSteps] = useState([])
  const [createdResources, setCreatedResources] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const terraformSteps = [
    {
      id: 'init',
      label: 'terraform init',
      description: 'Initialize Terraform working directory',
      command: 'terraform init',
      output: 'Initialized Terraform working directory',
      resources: []
    },
    {
      id: 'plan',
      label: 'terraform plan',
      description: 'Show what will be created',
      command: 'terraform plan',
      output: 'Plan: 4 to add, 0 to change, 0 to destroy',
      resources: []
    },
    {
      id: 'apply',
      label: 'terraform apply',
      description: 'Create infrastructure in AWS',
      command: 'terraform apply -auto-approve',
      output: 'Apply complete! Resources: 4 added',
      resources: ['ec2', 'vpc', 'sg', 'lb']
    }
  ]

  const awsResources = [
    {
      id: 'ec2',
      name: 'EC2 Instance',
      icon: '💻',
      description: 'Virtual machine (t3.micro)',
      config: 'instance_type = "t3.micro"'
    },
    {
      id: 'vpc',
      name: 'VPC',
      icon: '🌐',
      description: 'Virtual Private Cloud',
      config: 'cidr_block = "10.0.0.0/16"'
    },
    {
      id: 'sg',
      name: 'Security Group',
      icon: '🔐',
      description: 'Firewall rules',
      config: 'ingress_rules: HTTP, HTTPS, SSH'
    },
    {
      id: 'lb',
      name: 'Load Balancer',
      icon: '⚖️',
      description: 'Distribute traffic',
      config: 'type = "application"'
    },
    {
      id: 'rds',
      name: 'RDS Database',
      icon: '🗄️',
      description: 'Managed database',
      config: 'engine = "postgres"'
    }
  ]

  const handleRunTerraform = async () => {
    setIsRunning(true)
    setCompletedSteps([])
    setCreatedResources([])
    setCurrentStep(terraformSteps[0].id)

    for (let i = 0; i < terraformSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200))
      setCompletedSteps(prev => [...prev, terraformSteps[i].id])
      
      if (terraformSteps[i].resources.length > 0) {
        // Simulate resource creation
        for (const resource of terraformSteps[i].resources) {
          await new Promise(resolve => setTimeout(resolve, 200))
          setCreatedResources(prev => [...prev, resource])
        }
      }

      if (i < terraformSteps.length - 1) {
        setCurrentStep(terraformSteps[i + 1].id)
      }
    }

    setCurrentStep(null)
    setIsRunning(false)
  }

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'complete'
    if (currentStep === stepId) return 'active'
    return 'pending'
  }

  const isResourceCreated = (resourceId) => {
    return createdResources.includes(resourceId)
  }

  return (
    <PlaygroundSection
      title="Terraform Infrastructure Playground"
      description="Visualize Infrastructure as Code and cloud resource creation"
      icon={Cloud}
    >
      <div className="space-y-6">
        {/* Terraform Workflow */}
        <div className="space-y-3">
          {terraformSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <InteractiveNode
                title={step.label}
                description={step.description}
                status={
                  getStepStatus(step.id) === 'complete' ? 'active' :
                  getStepStatus(step.id) === 'active' ? 'active' :
                  'normal'
                }
                expandable={true}
              >
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-300 mb-1">Command:</p>
                    <code className="text-xs bg-black/50 text-green-300 p-2 rounded block font-mono">
                      {step.command}
                    </code>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-300 mb-1">Output:</p>
                    <div className="text-xs bg-black/50 text-blue-300 p-2 rounded font-mono">
                      {step.output}
                    </div>
                  </div>
                </div>
              </InteractiveNode>

              {/* Arrow */}
              {idx < terraformSteps.length - 1 && (
                <div className="flex justify-center py-1">
                  <LargeFlowArrow
                    isActive={getStepStatus(step.id) === 'active'}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Control */}
        <div className="pt-4 border-t border-slate-700">
          <ActionButton
            label={isRunning ? 'Deploying...' : 'Deploy Infrastructure'}
            onClick={handleRunTerraform}
            disabled={isRunning}
            loading={isRunning}
          />

          {completedSteps.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-sm text-green-300">
              <CheckCircle size={16} />
              <span>Infrastructure created successfully!</span>
            </div>
          )}
        </div>

        {/* AWS Resources Created */}
        {createdResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 border-t border-slate-700"
          >
            <h3 className="text-lg font-semibold text-green-300 mb-4">☁️ AWS Infrastructure Created</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {awsResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isResourceCreated(resource.id) ? 1 : 0.3, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-lg p-3 border transition-all ${
                    isResourceCreated(resource.id)
                      ? 'border-green-500/60 bg-green-900/20'
                      : 'border-slate-600/30 bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span>{resource.icon}</span>
                        {resource.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">{resource.description}</p>
                      <code className="text-xs bg-black/60 text-blue-300 p-1 rounded block mt-1 font-mono">
                        {resource.config}
                      </code>
                    </div>
                    {isResourceCreated(resource.id) && (
                      <CheckCircle size={18} className="text-green-400 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Terraform Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'main.tf',
              content: 'Define your cloud infrastructure in code. Declarative language that describes desired state.',
              icon: '📝'
            },
            {
              title: 'State File',
              content: 'Tracks current infrastructure state. Essential for Terraform to manage resources.',
              icon: '📊'
            },
            {
              title: 'Variables',
              content: 'Parameterize configurations. Reuse code for different environments.',
              icon: '🔧'
            },
            {
              title: 'Modules',
              content: 'Reusable infrastructure components. DRY principle for IaC.',
              icon: '📦'
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

        {/* Example Code */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <h3 className="font-semibold text-cyan-300 mb-2">📝 Example Terraform Code</h3>
          <code className="text-xs text-slate-200 leading-relaxed block font-mono bg-black/60 p-3 rounded overflow-x-auto">
            {`resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  tags = {
    Name = "web-server"
  }
}

resource "aws_security_group" "allow_web" {
  name = "allow_web"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}
          </code>
        </div>

        {/* Benefits */}
        <TooltipCard
          title="Why Use Terraform?"
          content="Version control for infrastructure, reproducible deployments, multi-cloud support, and easy disaster recovery. Deploy the same infrastructure across dev/staging/production consistently."
          type="success"
        />
      </div>
    </PlaygroundSection>
  )
}
