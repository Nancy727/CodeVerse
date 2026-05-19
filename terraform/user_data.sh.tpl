#!/bin/bash
# Lightweight startup script: install Docker, docker-compose, run the app and monitoring stack
set -e

# Update and install docker
apt-get update -y
apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io

# Allow running docker as ubuntu user if present
if id ubuntu &>/dev/null; then
  usermod -aG docker ubuntu
fi

# Start docker service
systemctl enable docker --now || true

# Run the frontend container
docker run -d --name cloudverse -p 80:80 --restart unless-stopped ${docker_image}

# Optional: start monitoring stack (Prometheus + Grafana) via docker-compose if /opt/monitoring exists
if [ -d /opt/monitoring ]; then
  cd /opt/monitoring
  if [ -f docker-compose.monitoring.yml ]; then
    docker-compose -f docker-compose.monitoring.yml up -d
  fi
fi
