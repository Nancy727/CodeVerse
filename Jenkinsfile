pipeline {
  agent any
  environment {
    DOCKER_REGISTRY = credentials('DOCKER_REGISTRY')
    DOCKER_REPO     = "${DOCKER_REGISTRY}/cloudverse"
    SSH_CREDENTIALS = 'EC2_SSH' // configure Jenkins credential with private key
  }
  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Docker Build & Push') {
      steps {
        sh 'docker build -t ${DOCKER_REPO}:latest .'
        sh 'echo "Pushing image to registry"'
        sh 'docker push ${DOCKER_REPO}:latest'
      }
    }
    stage('Deploy to EC2') {
      steps {
        script {
          // Uses SSH credentials configured in Jenkins to run remote deploy commands
          sshagent (credentials: [env.SSH_CREDENTIALS]) {
            sh "ssh -o StrictHostKeyChecking=no ubuntu@${params.DEPLOY_HOST} 'docker pull ${DOCKER_REPO}:latest && docker stop cloudverse || true && docker rm cloudverse || true && docker run -d --name cloudverse -p 80:80 --restart unless-stopped ${DOCKER_REPO}:latest'"
          }
        }
      }
    }
  }
  parameters {
    string(name: 'DEPLOY_HOST', defaultValue: '', description: 'EC2 public IP or hostname to deploy to')
  }
}
