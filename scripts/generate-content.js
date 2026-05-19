// Generate comprehensive student-friendly content for all batch 1 technologies
// This file generates the JSON data for Docker, Kubernetes, Terraform, Jenkins, Grafana

const generateDocker = () => ({
  hero: {
    heading: "🐳 Docker - Ship Your Code Anywhere",
    subtitle: "Package your application with everything it needs. Build once, run everywhere without surprises.",
    difficulty: "Beginner",
    timeToLearn: "3-4 hours",
    keySkill: "Essential for DevOps",
    whyLearn: "Docker is used by Netflix, Uber, Spotify, and Amazon. It solves the 'works on my machine but fails in production' problem once and for all.",
    icon: "🐳"
  },
  storytelling: {
    problem: "You built an app on your Windows laptop. It works perfectly. You send it to your friend who uses Mac, and it breaks. You push it to the Linux server in production, and it crashes again. Why? Because different systems have different libraries, versions, and configurations.",
    solution: "Docker packages your entire application—code, libraries, dependencies, and configuration—into a lightweight, portable container. This container runs identically on your laptop, your friend's Mac, or a production server in the cloud.",
    analogy: "Think of Docker like shipping cargo. Instead of putting your app in a box and hoping the destination has the right tools to open it (they probably don't), Docker is like a sealed shipping container that contains everything inside—the app AND all the tools needed to run it. When it arrives, everything works immediately.",
    realWorldExample: "Netflix streams to millions of users. Every time they update their service, they use Docker to package the update, test it, and deploy it to thousands of servers worldwide—all identically. No surprises, no crashes.",
    deepDive: "Under the hood, Docker uses Linux containers (LXC) to isolate applications. Unlike virtual machines that simulate an entire OS (heavy!), containers share the host OS kernel but isolate the filesystem and processes (light!). This makes Docker fast, efficient, and perfect for microservices."
  },
  architectureFlow: [
    {
      icon: "📝",
      title: "Write Dockerfile",
      description: "Create a recipe for your app (what base image, what to install, how to run it)",
      details: "A Dockerfile is like a blueprint. It defines the base OS, installs dependencies, copies your code, and specifies the startup command."
    },
    {
      icon: "🏗️",
      title: "Build Image",
      description: "Docker reads the Dockerfile and creates a reusable image (a snapshot of your app with everything)",
      details: "The image is a read-only template. It's not running yet—it's just a package ready to be deployed."
    },
    {
      icon: "🚀",
      title: "Push to Registry",
      description: "Upload your image to Docker Hub or a private registry (like GitHub Packages or Amazon ECR)",
      details: "The registry is like a library. Anyone can pull your image and run it instantly, anywhere in the world."
    },
    {
      icon: "▶️",
      title: "Run Container",
      description: "Docker spins up a running instance of your image (that's a container). Your app is now live!",
      details: "A container is a live instance of an image. You can run multiple containers from the same image, and they're all isolated."
    }
  ],
  learningPath: {
    beginner: [
      { topic: "Images vs Containers", description: "Images are blueprints; containers are running instances. Like a class and an object in programming." },
      { topic: "Dockerfile Basics", description: "FROM, RUN, COPY, WORKDIR, EXPOSE, CMD—the essential commands to write a Dockerfile." },
      { topic: "Docker CLI Essentials", description: "docker build, docker run, docker ps, docker logs—commands you'll use 80% of the time." },
      { topic: "Port Mapping", description: "How to expose your container's port to the host so you can access your app." },
      { topic: "Volumes & Persistence", description: "How to mount directories so your data survives when containers are deleted." }
    ],
    intermediate: [
      { topic: "Docker Compose", description: "Run multi-container apps (frontend + database) with a single docker-compose.yml file." },
      { topic: "Networking", description: "Connect multiple containers so they can talk to each other (e.g., app container talking to database container)." },
      { topic: "Image Layers & Optimization", description: "Understand layer caching to speed up builds and reduce image size." },
      { topic: "Environment Variables", description: "Pass configuration to containers without hardcoding secrets." },
      { topic: "Docker Networks", description: "Bridge, host, overlay networks—how containers communicate." }
    ],
    advanced: [
      { topic: "Multi-Stage Builds", description: "Create lightweight production images by separating build and runtime stages." },
      { topic: "BuildKit", description: "Faster, smarter image building with parallel stages and caching." },
      { topic: "Rootless Containers", description: "Run containers without root privileges for better security." },
      { topic: "Registry Security", description: "Sign images, scan for vulnerabilities, manage access control." },
      { topic: "Performance Tuning", description: "Resource limits, CPU/memory optimization, monitoring container performance." }
    ]
  },
  commands: [
    {
      cmd: "docker build -t myapp:1.0 .",
      description: "Build a Docker image from a Dockerfile in the current directory",
      whatItDoes: "Reads the Dockerfile, executes each instruction, and creates a reusable image",
      realUseCase: "After writing your Dockerfile, you run this to create an image of your application",
      example: "docker build -t hello-world:latest .\n# Output:\nSending build context to Docker daemon  2.048kB\nStep 1/4 : FROM python:3.9-slim\n ---> a123b456c789\nStep 2/4 : WORKDIR /app\n ---> Running in abcdef123456\n ---> New layer: 1234567890ab\nStep 3/4 : COPY . .\n ---> Successfully built 1234567890ab\nSuccessfully tagged hello-world:latest",
      commonMistake: "Forgetting to include .dockerignore, leading to huge images with unnecessary files (like node_modules or .git)",
      difficulty: "Beginner"
    },
    {
      cmd: "docker run -d -p 8080:3000 -e NODE_ENV=production myapp:1.0",
      description: "Run a container from an image in detached mode with port mapping and environment variables",
      whatItDoes: "Launches a new container based on your image, runs it in the background, maps port 8080 on your computer to port 3000 in the container",
      realUseCase: "After building your image, you run this to start your app. Users can access it at localhost:8080",
      example: "docker run -d -p 8080:3000 nginx\n# Output:\n3a2b1c0d9e8f\n\n# Now visit http://localhost:8080 and you'll see the Nginx welcome page",
      commonMistake: "Forgetting -d flag, and your terminal gets stuck watching container logs. Use Ctrl+C to exit, but the container keeps running.",
      difficulty: "Beginner"
    },
    {
      cmd: "docker ps",
      description: "List all running containers",
      whatItDoes: "Shows all active containers with their ID, image, status, ports, and names",
      realUseCase: "Check what containers are currently running on your system",
      example: "docker ps\n# Output:\nCONTAINER ID   IMAGE       COMMAND                 STATUS           PORTS\nabc123def456   nginx       \"/docker-entrypoint…\"   Up 2 minutes     0.0.0.0:8080->80/tcp\nxyz789pqr012   postgres    \"docker-entrypoint…\"   Up 5 minutes     5432/tcp",
      commonMistake: "Forgetting to use 'docker ps -a' when looking for stopped containers. By default, ps only shows running containers.",
      difficulty: "Beginner"
    }
  ],
  comparisons: [
    {
      title: "Docker vs Virtual Machines",
      left: {
        name: "🐳 Docker Containers",
        points: ["Lightweight—shares host OS kernel", "Starts in milliseconds", "Minimal disk space (MB to low GB)", "Perfect for microservices", "Easy to scale horizontally"]
      },
      right: {
        name: "💻 Virtual Machines",
        points: ["Heavy—includes full OS for each VM", "Takes seconds to minutes to boot", "Large disk space (GB to TB per VM)", "More isolated, but overkill for apps", "Harder to scale (requires more resources)"]
      },
      whenToUse: "Use Docker for 99% of cloud-native applications. Use VMs only for running multiple different OSes on the same machine or very strict isolation requirements."
    }
  ],
  beginnerMistakes: [
    {
      title: "Huge Image Sizes",
      description: "Including unnecessary files (node_modules, .git, test files) in your Docker image makes it bloated (2GB+ instead of 100MB)",
      howToFix: "Create a .dockerignore file (like .gitignore) to exclude unnecessary files. Use multi-stage builds to separate build and runtime dependencies."
    },
    {
      title: "Running as Root",
      description: "If a container is compromised, an attacker has root access to your system",
      howToFix: "Use the USER instruction in Dockerfile to run as a non-root user. Example: USER appuser"
    }
  ],
  realWorldUsage: [
    {
      name: "Netflix",
      logo: "🎬",
      industry: "Streaming",
      usage: "Netflix uses Docker extensively for microservices architecture. Each microservice (user auth, video recommendations, billing, etc.) runs in a Docker container. When they deploy updates, they use Docker to ensure consistency across thousands of servers worldwide."
    },
    {
      name: "Uber",
      logo: "🚗",
      industry: "Ride-Sharing",
      usage: "Uber's entire platform runs on containerized microservices. Drivers, riders, payments, routing—all separate services in Docker containers, orchestrated with Kubernetes. Docker enables them to deploy updates and scale services independently."
    }
  ],
  productionSection: {
    scaling: "Use Kubernetes or Docker Swarm to orchestrate multiple container instances. Set resource limits (CPU, memory) to prevent one container from starving others.",
    security: "Always run containers as non-root users. Scan images for vulnerabilities using tools like Trivy or Snyk. Use secrets management instead of hardcoding credentials.",
    monitoring: "Use Prometheus + Grafana to monitor container metrics (CPU, memory, network I/O). Collect logs with ELK Stack or CloudWatch.",
    cicd: "Integrate Docker with CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins). Build images on each commit, run tests in containers, push to registry on success."
  },
  labs: [
    {
      title: "🚀 Run Your First Container (Nginx)",
      description: "Get hands-on with Docker by running a web server",
      estimatedTime: "10 minutes",
      steps: [
        {
          title: "Pull an Image",
          instruction: "Download the official Nginx image from Docker Hub",
          command: "docker pull nginx"
        },
        {
          title: "Run a Container",
          instruction: "Start an Nginx container and map port 8080 on your computer to port 80 in the container",
          command: "docker run -d -p 8080:80 --name my-web nginx"
        },
        {
          title: "Access Your App",
          instruction: "Open your browser and visit http://localhost:8080. You should see the Nginx welcome page!"
        }
      ],
      expectedOutput: "Welcome to nginx!\nIf you see a web page that says 'Welcome to nginx!' you've successfully run your first container! 🎉"
    }
  ],
  interviewQuestions: [
    {
      question: "What's the difference between a Docker image and a container?",
      difficulty: "Easy",
      answer: "A Docker image is a blueprint or template—it's read-only and describes what your application needs to run. A container is a running instance of an image.",
      example: "docker build -t my-app:1.0 .  # Creates image\ndocker run -d my-app:1.0           # Creates container from image",
      followUp: "Can you explain what happens when we run 'docker build' and 'docker run' commands?",
      tips: ["Use an analogy: image = cookie cutter, container = baked cookies", "Mention that images are immutable (read-only)", "Explain that multiple containers can run from one image independently"]
    }
  ],
  cheatsheet: {
    basic_commands: [
      { cmd: "docker build -t name:tag .", description: "Build an image from Dockerfile" },
      { cmd: "docker run -d -p host:container name:tag", description: "Run a container from an image" },
      { cmd: "docker ps", description: "List running containers" },
      { cmd: "docker ps -a", description: "List all containers" }
    ],
    image_commands: [
      { cmd: "docker images", description: "List all images" },
      { cmd: "docker pull image:tag", description: "Download an image from registry" },
      { cmd: "docker push registry/image:tag", description: "Upload image to registry" }
    ]
  }
});

console.log(JSON.stringify(generateDocker(), null, 2));
