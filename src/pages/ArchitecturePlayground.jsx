import React, { Suspense, lazy } from 'react'

// Lazy load playground components for optimal performance
const MonolithVsMicroservices = lazy(() => import('../components/playground/MonolithVsMicroservices'))
const CICDPipeline = lazy(() => import('../components/playground/CICDPipeline'))
const K3sFlow = lazy(() => import('../components/playground/K3sFlow'))
const DockerLifecycle = lazy(() => import('../components/playground/DockerLifecycle'))
const TerraformPlayground = lazy(() => import('../components/playground/TerraformPlayground'))
const MonitoringArchitecture = lazy(() => import('../components/playground/MonitoringArchitecture'))
const AWSProduction = lazy(() => import('../components/playground/AWSProduction'))
const InternetRequestJourney = lazy(() => import('../components/playground/InternetRequestJourney'))

// Loading fallback
function LoadingPlaceholder() {
  return (
    <div className="h-40 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg border border-slate-700 flex items-center justify-center">
      <div className="text-center">
        <div className="w-6 h-6 border-2 border-cyan-400/50 border-t-cyan-400 rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-slate-400">Loading interactive playground...</p>
      </div>
    </div>
  )
}

export default function ArchitecturePlayground(){
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Architecture Playground
        </h1>
        <p className="text-slate-400 mt-2">
          Explore interactive visualizations of modern cloud-native architectures. Learn DevOps, k3s, CI/CD, and AWS by interacting with real-world system designs.
        </p>
      </div>

      {/* Navigation Info */}
      <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
        <p className="text-sm text-blue-200">
          💡 <strong>Pro Tip:</strong> Click on each section to expand and explore. Try simulating failures, running pipelines, and deploying infrastructure!
        </p>
      </div>

      {/* Playground Sections */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <MonolithVsMicroservices />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CICDPipeline />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <K3sFlow />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <DockerLifecycle />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <TerraformPlayground />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <MonitoringArchitecture />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <AWSProduction />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <InternetRequestJourney />
      </Suspense>

      {/* Footer */}
      <div className="pt-8 border-t border-slate-700">
        <p className="text-sm text-slate-400 text-center">
          🚀 These interactive playgrounds are optimized for learning. Use them to understand cloud architecture concepts before diving into real deployments.
        </p>
      </div>
    </div>
  )
}
