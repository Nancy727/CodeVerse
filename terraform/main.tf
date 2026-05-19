provider "aws" {
  region = var.aws_region
}

data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "ssh_http" {
  name        = "cloudverse-ssh-http"
  description = "Allow SSH and HTTP"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_cidr]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "cloudverse" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.ssh_http.id]
  key_name               = length(var.ssh_key_name) > 0 ? var.ssh_key_name : null

  user_data = templatefile("${path.module}/user_data.sh.tpl", { docker_image = var.docker_image })

  tags = {
    Name = "cloudverse-frontend"
  }
}

output "instance_public_ip" {
  value = aws_instance.cloudverse.public_ip
}
provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "cloudverse" {
  ami           = var.ami_id
  instance_type = "t3.micro"
  tags = { Name = "cloudverse-frontend" }
}

variable "aws_region" { default = "us-east-1" }
variable "ami_id" { default = "ami-0c02fb55956c7d316" }
