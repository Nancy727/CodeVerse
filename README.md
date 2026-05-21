# CloudVerse - Enterprise DevOps Platform

## Overview

CloudVerse is a cloud-native DevOps platform built to demonstrate how modern enterprise delivery flows are assembled in practice. The application combines containerization, orchestration, infrastructure automation, continuous delivery, and observability into one cohesive reference implementation.

This project is intentionally structured to reflect production-style operating patterns while remaining compact enough to study, run locally, and adapt for training or demonstrations.

---

## Architecture

```text
Developer
	|
	v
GitHub Repository
	|
	v
Jenkins CI/CD Pipeline
	|
	v
Docker Image Build
	|
	v
Container Registry
	|
	v
k3s Cluster on AWS EC2
	|
	+-- Application Pods
	|
	+-- Services
	|
	+-- Deployments
	|
	+-- ReplicaSets
	|
	v
Monitoring Stack
	+-- Prometheus
	+-- Grafana
```

---

## Key Features

### DevOps Automation

- CI/CD workflow driven by Jenkins
- Infrastructure provisioning with Terraform
- Containerized deployment flow

### Containerization

- Docker-based application packaging
- Consistent runtime behavior
- Portable static frontend delivery through Nginx

### k3s Orchestration

- Declarative workload deployment
- Service exposure through Kubernetes resources
- Self-healing and scaling primitives available through the platform
- Designed for a lightweight Kubernetes runtime on EC2

### Monitoring and Observability

- Metrics collection through Prometheus
- Dashboard visualization through Grafana
- Host and container telemetry via node-exporter and cAdvisor

### AWS Deployment

- EC2-based infrastructure
- Terraform-driven provisioning
- SSH and HTTP access control through security groups

---

## Tech Stack

### Cloud Platform

- AWS EC2

### CI/CD

- Jenkins

### Containerization

- Docker
- Nginx

### Orchestration

- k3s

### Infrastructure as Code

- Terraform

### Monitoring

- Prometheus
- Grafana
- node-exporter
- cAdvisor

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS

### Pipeline and Configuration

- YAML
- Shell scripting

---

## Project Objectives

The objective of CloudVerse is to provide a practical reference for:

- Automating application delivery
- Reducing manual infrastructure operations
- Demonstrating a repeatable deployment architecture
- Improving release reliability
- Centralizing monitoring and visibility
- Simulating enterprise-grade DevOps workflows on AWS

---

## Infrastructure Components

### 1. Docker

Docker is used to package the frontend and its runtime dependencies into a portable image.

Responsibilities:

- Image creation
- Dependency packaging
- Runtime consistency
- Application isolation

Core artifacts:

- `Dockerfile`
- Docker images
- Docker containers
- Docker engine

### 2. k3s

k3s is used as the lightweight Kubernetes runtime for orchestrating the application on EC2.

Responsibilities:

- Deployment management
- Service discovery
- Self-healing
- Declarative workload control
- Networking and exposure of the frontend

Kubernetes resources used:

- Deployments
- Pods
- Services
- ReplicaSets
- Ingress

### 3. Jenkins

Jenkins drives the delivery workflow and provides a simple CI/CD control plane.

Responsibilities:

- Checking source connectivity
- Validating Docker availability
- Verifying container runtime state
- Exercising deployment reachability

Pipeline stages:

1. Source code checkout
2. Environment validation
3. Docker image build
4. Deployment verification
5. Success confirmation

### 4. Terraform

Terraform provisions the AWS foundation used by the platform.

Responsibilities:

- EC2 provisioning
- Security group management
- Infrastructure consistency
- Environment reproducibility

Benefits:

- Declarative infrastructure
- Version-controlled changes
- Repeatable provisioning
- Lower configuration drift

### 5. Prometheus

Prometheus collects time-series metrics for infrastructure and application visibility.

Metrics monitored:

- CPU usage
- Memory consumption
- Network traffic
- Pod health
- Container performance

### 6. Grafana

Grafana visualizes the metrics collected by Prometheus.

Dashboard features:

- Real-time graphs
- Resource monitoring
- Alert visualization
- Infrastructure insights

---

## CI/CD Workflow

### Step 1 - Source Code Management

Developers push code changes to the GitHub repository.

### Step 2 - Jenkins Pipeline Trigger

Jenkins detects repository activity and starts the pipeline.

### Step 3 - Docker Build

The application is packaged into a Docker image.

### Step 4 - k3s Deployment

The container is deployed to the k3s cluster running on AWS EC2.

### Step 5 - Monitoring

Prometheus collects metrics and Grafana visualizes the system state.

---

## Kubernetes Deployment Workflow

```text
Deployment YAML
		|
		v
k3s API Server
		|
		v
Scheduler
		|
		v
Worker Nodes
		|
		v
Pods Running Application Containers
```

---

## Repository Structure

```text
CloudVerse/
|
|-- src/
|   |-- application source code
|
|-- k3s/
|   |-- deployment.yaml
|   |-- service.yaml
|   |-- ingress.yaml
|
|-- terraform/
|   |-- main.tf
|   |-- variables.tf
|   |-- outputs.tf
|
|-- monitoring/
|   |-- docker-compose.monitoring.yml
|   |-- prometheus.yml
|   |-- grafana/
|
|-- scripts/
|   |-- content generation utilities
|
|-- Dockerfile
|-- Jenkinsfile
|-- README.md
```

---

## Deployment Guide

### Prerequisites

Install the following tools before deploying the platform:

- Docker
- k3s or a compatible Kubernetes runtime
- kubectl
- Jenkins
- Terraform
- AWS CLI

### Step 1 - Clone the Repository

```bash
git clone <repository-url>
cd CloudVerse
```

### Step 2 - Build the Docker Image

```bash
docker build -t cloudverse .
```

### Step 3 - Run the Container Locally

```bash
docker run -p 80:80 cloudverse
```

### Step 4 - Deploy to k3s

```bash
kubectl apply -f k3s/deployment.yaml
kubectl apply -f k3s/service.yaml
kubectl apply -f k3s/ingress.yaml
```

### Step 5 - Verify Deployment

```bash
kubectl get pods
kubectl get services
kubectl get ingress
```

### Step 6 - Start Monitoring

```bash
cd monitoring
docker compose -f docker-compose.monitoring.yml up -d
```

---

## Terraform Infrastructure Deployment

### Initialize Terraform

```bash
cd terraform
terraform init
```

### Validate Configuration

```bash
terraform validate
```

### Preview Infrastructure

```bash
terraform plan
```

### Provision Infrastructure

```bash
terraform apply
```

The Terraform configuration provisions an EC2 instance, a security group for SSH and HTTP access, and bootstraps the host with Docker and the application image defined in `variables.tf`.

---

## Monitoring Stack

### Prometheus Responsibilities

- Metrics collection
- Time-series storage
- Target scraping
- Service monitoring

### Grafana Responsibilities

- Dashboard rendering
- Data visualization
- Alert integration
- Performance analysis

---

## Security Considerations

The platform follows standard DevOps security practices including:

- Containerized isolation
- Declarative infrastructure
- Controlled access through AWS security groups
- Separate delivery and runtime concerns
- Kubernetes-based workload segregation

Planned improvements may include:

- Secrets management
- RBAC hardening
- TLS termination
- Kubernetes network policies

---

## Challenges Faced During Development

### Infrastructure Resource Constraints

Managing deployments under limited EC2 resources and cost-conscious sizing.

### k3s Networking

Handling service exposure, ingress routing, and pod-to-pod communication on a lightweight Kubernetes runtime.

### CI/CD Integration

Keeping Jenkins, Docker, and k3s aligned across build and deployment stages.

### Monitoring Configuration

Wiring Prometheus targets and Grafana dashboards cleanly for a small but realistic stack.

---

## Performance Benefits

- Faster deployments
- Reduced downtime
- Improved scalability
- Better infrastructure consistency
- Stronger observability
- Automated workflows

---

## Future Enhancements

Planned improvements include:

- Horizontal Pod Autoscaling
- Helm chart packaging
- GitOps workflow
- Argo CD integration
- Centralized logging
- Alertmanager integration
- Stronger security policy enforcement
- Automated release promotion

---

## Learning Outcomes

This project demonstrates the practical application of:

- Containerization
- Orchestration with k3s
- CI/CD automation
- Infrastructure as Code
- Monitoring and observability
- AWS-based deployment patterns
- Kubernetes service exposure
- DevOps workflow automation

---

## Conclusion

CloudVerse demonstrates how a small frontend platform can be packaged, automated, deployed, and monitored using a production-minded DevOps approach.

The repository reflects the operating style of enterprise infrastructure work: versioned configuration, repeatable builds, lightweight Kubernetes orchestration on EC2, and observability from the start.

It is a practical reference for teams that want a concise example of how Jenkins, Docker, Terraform, k3s, Prometheus, Grafana, and AWS EC2 can be assembled into a coherent delivery system.
