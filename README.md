# CloudVerse — Frontend Cloud & DevOps Learning Playground

CloudVerse is a lightweight React + Vite single-page application that provides interactive learning content and visual playgrounds for cloud-native technologies (Docker, Kubernetes, CI/CD, Terraform, Prometheus/Grafana, etc.). It's intended as a demo site and learning reference you can run locally, in Docker, or deploy to Kubernetes.

## Features

- Interactive architecture playgrounds and animations
- Curated command examples and a searchable **Command Center**
- Code/command copy buttons throughout the UI for quick copying to clipboard
- Deployment assets for Docker, Kubernetes (`k8s/`), and Terraform (`terraform/`)

## Prerequisites

- Node 18+ and npm
- Docker (optional, for container builds)
- kubectl / a Kubernetes cluster (optional)
- Terraform (optional, when using `terraform/` assets)

## Quick development setup

1. Install dependencies

```bash
npm install
```

2. Run the dev server (Vite)

```bash
npm run dev
```

Open http://localhost:5173 (or the URL printed by Vite).

## Build for production

```bash
npm run build
```

The production build output will be in the `dist/` directory and can be served with any static server.

## Docker

Build and run the containerized app:

```bash
docker build -t cloudverse .
docker run -p 80:80 cloudverse
```

## Kubernetes

Example manifests are located in the `k8s/` folder. Apply them with:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Adjust image names, namespaces, and resource requests as needed for your cluster.

## Terraform

There is a small `terraform/` folder with example infrastructure (see `terraform/main.tf`). Use Terraform as you normally would:

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## Command Center — Copy buttons

The Command Center (in the UI) lists curated shell/cli commands and provides a Copy button next to each command. If you previously couldn't see the Copy action in the Command Center, that has been updated to use a white button with dark text for clearer visibility.

If you want to change the button style yourself, see [src/pages/CommandCenter.jsx](src/pages/CommandCenter.jsx#L1) and the reusable copy button at [src/components/CopyButton.jsx](src/components/CopyButton.jsx#L1).

## Data files

All command/data content is stored under `src/data/` as JSON files (e.g., `docker.json`, `kubernetes.json`). To add or update content, edit those JSON files and restart the dev server.

## Contributing

Contributions are welcome. Open an issue or submit a PR with a clear description of the change.

## License

MIT
