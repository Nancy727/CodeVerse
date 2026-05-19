import React from 'react'
import { useParams } from 'react-router-dom'

// Import new interactive components
import HeroSection from '../components/HeroSection'
import StorytellingSection from '../components/StorytellingSection'
import ArchitectureFlow from '../components/ArchitectureFlow'
import LearningPath from '../components/LearningPath'
import CommandCard from '../components/CommandCard'
import BeginnerMistakeCard from '../components/BeginnerMistakeCard'
import ComparisonCard from '../components/ComparisonCard'
import LabCard from '../components/LabCard'
import RealWorldUsageCard from '../components/RealWorldUsageCard'
import InterviewQA from '../components/InterviewQA'
import CheatsheetCard from '../components/CheatsheetCard'

// Import data

import docker from '../data/docker.json'
import k8s from '../data/kubernetes.json'
import aws from '../data/aws.json'
import terraform from '../data/terraform.json'
import jenkins from '../data/jenkins.json'
import grafana from '../data/grafana.json'
import prometheus from '../data/prometheus.json'

const map = { docker, kubernetes: k8s, aws, terraform, jenkins, grafana, prometheus }
export default function Technology() {
  const { id } = useParams()
  const data = map[id] || docker

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <HeroSection hero={data.hero} />

      {/* Storytelling Section */}
      <StorytellingSection storytelling={data.storytelling} />

      {/* Architecture Flow */}
      <ArchitectureFlow steps={data.architectureFlow} />

      {/* Learning Path */}
      <LearningPath learningPath={data.learningPath} />

      {/* Commands */}
      {data.commands && data.commands.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-cyan-300">⚙️ Essential Commands</h2>
          <div className="space-y-2">
            {data.commands.map((cmd, i) => (
              <CommandCard key={i} command={cmd} />
            ))}
          </div>
        </div>
      )}

      {/* Comparisons */}
      <ComparisonCard comparisons={data.comparisons} />

      {/* Beginner Mistakes */}
      <BeginnerMistakeCard mistakes={data.beginnerMistakes} />

      {/* Real World Usage */}
      <RealWorldUsageCard companies={data.realWorldUsage} />

      {/* Production Section */}
      {data.productionSection && (
        <div className="mb-8 glass-card p-6 border border-purple-400/20">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">🚀 Production Engineering</h2>
          {data.productionSection.scaling && (
            <div className="mb-4">
              <h3 className="font-semibold text-purple-200 mb-2">Scaling Strategies</h3>
              <p className="text-slate-300 text-sm">{data.productionSection.scaling}</p>
            </div>
          )}
          {data.productionSection.security && (
            <div className="mb-4">
              <h3 className="font-semibold text-purple-200 mb-2">Security Best Practices</h3>
              <p className="text-slate-300 text-sm">{data.productionSection.security}</p>
            </div>
          )}
          {data.productionSection.monitoring && (
            <div className="mb-4">
              <h3 className="font-semibold text-purple-200 mb-2">Monitoring & Observability</h3>
              <p className="text-slate-300 text-sm">{data.productionSection.monitoring}</p>
            </div>
          )}
          {data.productionSection.cicd && (
            <div>
              <h3 className="font-semibold text-purple-200 mb-2">CI/CD Integration</h3>
              <p className="text-slate-300 text-sm">{data.productionSection.cicd}</p>
            </div>
          )}
        </div>
      )}

      {/* Labs */}
      <LabCard labs={data.labs} />

      {/* Interview Q&A */}
      <InterviewQA questions={data.interviewQuestions} />

      {/* Cheatsheet */}
      <CheatsheetCard cheatsheet={data.cheatsheet} />
    </div>
  )
}
