#!/bin/bash
# Script to generate all technology JSON files with comprehensive student-friendly content
# Run this to regenerate all technology content at once

cat > kubernetes.json << 'K8S_EOF'
{
  "hero": {
    "heading": "⚙️ Kubernetes - Orchestrate Containers at Scale",
    "subtitle": "Automatically manage, scale, and deploy containerized applications across multiple machines with zero downtime.",
    "difficulty": "Intermediate",
    "timeToLearn": "5-6 hours",
    "keySkill": "Essential for Production",
    "whyLearn": "K8s is the industry standard. Used by Google, Netflix, Airbnb. If you run containers in production, you need Kubernetes.",
    "icon": "⚙️"
  },
  "storytelling": {
    "problem": "You have 100 Docker containers. One crashes—manual restart takes 5 minutes and your app is down. Black Friday: you need 500 containers. How do you update without downtime? Route traffic intelligently?",
    "solution": "Kubernetes automatically manages this. It restarts crashed containers instantly. Scales to thousands with one command. Rolling updates with zero downtime. Intelligent traffic routing. It's like having a superhuman DevOps team 24/7.",
    "analogy": "Docker is a shipping container. Kubernetes is the entire port with cranes, scheduling, inventory, and self-healing. Container ship breaks? Port auto-reroutes. Demand up? Port builds more ships.",
    "realWorldExample": "Netflix runs millions of containers across regions using K8s. New feature deploy: 5% traffic, monitor, continue or rollback—zero user impact.",
    "deepDive": "Kubernetes is declarative. You describe desired state (I want 5 replicas). K8s continuously maintains that state. Master nodes decide, worker nodes execute."
  },
  "architectureFlow": [
    {"icon": "📦", "title": "Define Application", "description": "Write YAML files describing containers, resources, networking", "details": "Deployment, Service, ConfigMap describe everything your app needs."},
    {"icon": "🎯", "title": "Deploy to Cluster", "description": "Submit YAML to Kubernetes API (kubectl apply)", "details": "Control plane validates and schedules containers on nodes."},
    {"icon": "🔄", "title": "Auto-Healing & Scaling", "description": "Kubernetes monitors health, replaces failed pods, scales on demand", "details": "Crash? New pod starts. CPU high? Scales up. Network issues? Auto-restarts."},
    {"icon": "🌐", "title": "Service Discovery", "description": "Containers find each other using DNS, load balancing automatic", "details": "Apps use service names, not IPs. Services handle load balancing."}
  ],
  "learningPath": {
    "beginner": [
      {"topic": "Pods", "description": "Smallest unit. Wraps 1+ containers sharing network/storage."},
      {"topic": "Deployments", "description": "Manages replicas and rolling updates."},
      {"topic": "Services", "description": "Exposes pods internally/externally with DNS and load balancing."},
      {"topic": "kubectl Basics", "description": "CLI tool (apply, get, logs, delete)."},
      {"topic": "YAML Config", "description": "Declarative resource definition."}
    ],
    "intermediate": [
      {"topic": "ConfigMaps & Secrets", "description": "Store config/sensitive data separately."},
      {"topic": "Persistent Volumes", "description": "Storage surviving pod restarts."},
      {"topic": "Ingress", "description": "Route external HTTP(S) traffic based on hostnames/paths."},
      {"topic": "StatefulSets", "description": "Manage stateful apps with stable identity."},
      {"topic": "Namespaces", "description": "Logical isolation (dev/staging/prod)."}
    ],
    "advanced": [
      {"topic": "Custom Resources", "description": "Extend K8s with custom objects."},
      {"topic": "Helm Charts", "description": "Package K8s apps for reuse."},
      {"topic": "Network Policies", "description": "Control inter-pod traffic."},
      {"topic": "RBAC", "description": "Fine-grained access control."},
      {"topic": "Operators", "description": "Automate complex app management."}
    ]
  },
  "commands": [
    {"cmd": "kubectl cluster-info", "explanation": "Display cluster master and services", "whatItDoes": "Shows API server endpoint and services", "realUseCase": "Verify cluster accessibility before deploying", "example": "kubectl cluster-info\nKubernetes control plane is running at https://192.168.1.100:6443", "commonMistake": "Running without kubeconfig set gets 'connection refused' errors"},
    {"cmd": "kubectl get nodes", "explanation": "List all worker nodes", "whatItDoes": "Shows node status, roles, resource usage", "realUseCase": "Verify all nodes healthy before deploying. Identify NotReady nodes.", "example": "kubectl get nodes\nNAME  STATUS  ROLES   VERSION\nnode1 Ready   worker  v1.27.0", "commonMistake": "Ignoring NotReady status—always investigate unhealthy nodes"},
    {"cmd": "kubectl apply -f deployment.yaml", "explanation": "Deploy application using YAML", "whatItDoes": "Creates/updates Deployment, Service, ConfigMap from YAML", "realUseCase": "Primary way to deploy apps to Kubernetes. Used in CI/CD pipelines.", "example": "kubectl apply -f deployment.yaml\ndeployment.apps/my-app created", "commonMistake": "Forgetting to apply after editing YAML—changes won't take effect"},
    {"cmd": "kubectl get pods -n production", "explanation": "List pods in specific namespace", "whatItDoes": "Shows running/pending/failed pods with restart count", "realUseCase": "Check if app pods running and healthy. Monitor pod status.", "example": "kubectl get pods -n production\nNAME        READY STATUS  RESTARTS AGE\nmy-app-xxx  1/1   Running 0        2d", "commonMistake": "Not using -n defaults to 'default'—miss issues in other namespaces"},
    {"cmd": "kubectl logs pod-name", "explanation": "View pod logs", "whatItDoes": "Streams stdout/stderr from container", "realUseCase": "Debug app errors. Essential for troubleshooting.", "example": "kubectl logs my-app-5d4f7\n[INFO] Server started on port 8080", "commonMistake": "Pod logs are ephemeral—use centralized logging for production"},
    {"cmd": "kubectl describe pod pod-name", "explanation": "Detailed pod information", "whatItDoes": "Shows events, resource requests/limits, env vars, status", "realUseCase": "Understand why pod failed/stuck pending. Great for debugging.", "example": "kubectl describe pod my-app-xxx\nEvents:\n  Warning FailedScheduling: 0/3 nodes available", "commonMistake": "Missing Events section when troubleshooting failures"},
    {"cmd": "kubectl exec -it pod-name -- /bin/bash", "explanation": "Interactive shell in pod", "whatItDoes": "Execute command inside running pod for debugging", "realUseCase": "Debug app state, inspect filesystem, check processes", "example": "kubectl exec -it my-app-xxx -- /bin/bash\nroot@my-app-xxx:/#", "commonMistake": "Over-using exec instead of improving observability and logging"},
    {"cmd": "kubectl scale deployment my-app --replicas=5", "explanation": "Scale deployment to N replicas", "whatItDoes": "Creates/removes replicas to match desired count", "realUseCase": "Increase during spikes, decrease to save costs", "example": "kubectl scale deployment my-app --replicas=5\ndeployment.apps/my-app scaled", "commonMistake": "Manual scaling is temporary—use HPA for auto-scaling"},
    {"cmd": "kubectl rollout status deployment/my-app", "explanation": "Check deployment rollout progress", "whatItDoes": "Shows if deployment successfully rolling or stuck", "realUseCase": "Verify deployment before declaring success in CI/CD", "example": "deployment 'my-app' successfully rolled out", "commonMistake": "Not waiting for rollout to complete"},
    {"cmd": "kubectl rollout undo deployment/my-app", "explanation": "Rollback to previous version", "whatItDoes": "Reverts to previously running pod spec", "realUseCase": "Emergency rollback if new version has critical bugs", "example": "kubectl rollout undo deployment/my-app\ndeployment.apps/my-app rolled back", "commonMistake": "Rolling back without investigating root cause"}
  ],
  "comparisons": [
    {
      "title": "Kubernetes vs Docker Swarm",
      "left": {"name": "⚙️ Kubernetes", "points": ["Industry standard, huge ecosystem", "Complex but powerful", "Self-healing, auto-scaling built-in", "Multi-cloud support"]},
      "right": {"name": "🐳 Docker Swarm", "points": ["Simpler, easier to learn", "Built into Docker", "Limited features", "Small deployments only"]},
      "whenToUse": "Use K8s for production at any scale. Use Swarm for small hobby projects."
    }
  ],
  "beginnerMistakes": [
    {"title": "No Resource Requests/Limits", "description": "Pods with no limits consume all cluster resources, crashing others", "howToFix": "Always set requests (minimum) and limits (maximum) in pod spec"},
    {"title": "Using 'latest' Tag", "description": "Never know what version runs. Unpredictable rollbacks.", "howToFix": "Always use immutable tags like v1.2.3 or git SHA"}
  ],
  "realWorldUsage": [
    {"name": "Google", "logo": "🔍", "industry": "Search & Cloud", "usage": "Created Kubernetes. Runs billions of containers. Offers GKE."},
    {"name": "Netflix", "logo": "🎬", "industry": "Streaming", "usage": "Millions of containers across regions with auto-failover."},
    {"name": "Airbnb", "logo": "🏠", "industry": "Travel", "usage": "Massive-scale deployments with hundreds of microservices."}
  ],
  "productionSection": {
    "scaling": "Use HPA to auto-scale based on metrics. VPA for right-sizing. Cluster Autoscaler for nodes.",
    "security": "Use Network Policies for pod isolation. RBAC for access control. Pod Security Standards.",
    "monitoring": "Prometheus for metrics. Grafana for visualization. AlertManager for alerts.",
    "cicd": "Integrate kubectl with CI/CD. Use GitOps (ArgoCD) for declarative deployments."
  },
  "labs": [
    {
      "title": "Deploy Your First App",
      "description": "Deploy Nginx to Kubernetes",
      "estimatedTime": "15 minutes",
      "steps": [
        {"title": "Create Deployment", "instruction": "Create deployment.yaml", "command": "kubectl apply -f deployment.yaml"},
        {"title": "Deploy", "instruction": "Apply to cluster", "command": "kubectl apply -f deployment.yaml"},
        {"title": "Verify", "instruction": "Check pods running", "command": "kubectl get pods"}
      ],
      "expectedOutput": "All pods should show Running status"
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is a pod?",
      "difficulty": "Easy",
      "answer": "Smallest deployable unit in K8s. Can contain 1+ containers sharing network/storage. Usually 1 container per pod, but sidecars are common.",
      "example": "Most pods: 1 container. Some have helper containers (logging sidecar).",
      "followUp": "Why multiple containers in one pod?",
      "tips": ["Sidecar pattern for logging/monitoring", "Shared networking", "Init containers"]
    }
  ],
  "cheatsheet": {
    "cluster": [
      {"cmd": "kubectl cluster-info", "description": "Cluster info"},
      {"cmd": "kubectl get nodes", "description": "List nodes"}
    ],
    "pods": [
      {"cmd": "kubectl get pods", "description": "List pods"},
      {"cmd": "kubectl logs <pod>", "description": "Pod logs"},
      {"cmd": "kubectl exec -it <pod> -- bash", "description": "Shell into pod"}
    ],
    "deployments": [
      {"cmd": "kubectl apply -f deploy.yaml", "description": "Deploy"},
      {"cmd": "kubectl scale deployment <name> --replicas=5", "description": "Scale"},
      {"cmd": "kubectl rollout undo deployment/<name>", "description": "Rollback"}
    ]
  }
}
K8S_EOF

echo "Kubernetes content generated"
