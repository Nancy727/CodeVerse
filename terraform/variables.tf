variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type (t2.micro or t3.micro)"
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "AMI ID to use for the instance (Ubuntu LTS recommended)"
  type        = string
  default     = "ami-0c02fb55956c7d316"
}

variable "ssh_key_name" {
  description = "Existing AWS key pair name for SSH access"
  type        = string
  default     = ""
}

variable "allowed_cidr" {
  description = "CIDR range allowed for SSH (use your IP)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "docker_image" {
  description = "Docker image to run on the instance"
  type        = string
  default     = "your-docker-repo/cloudverse:latest"
}
