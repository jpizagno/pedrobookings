provider "aws" {
  version    = "~> 2.7"
  access_key = var.access_key # from variables.tf
  secret_key = var.secret_key # from variables.tf
  region     = var.region     # from variables.tf
}

resource "aws_security_group" "bind_ec2_db_2" {
  name        = "bind_ec2_db_2"
  description = "allow 3306 to EC2 to DB insnace to User"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 8092
    to_port     = 8092
    protocol    = "tcp"
    cidr_blocks = ["${var.user_ip_address}/32"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.user_ip_address}/32"]
  }

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["${var.user_ip_address}/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# inclucde DB here as well, so Terraform does not delete it
resource "aws_db_instance" "default" {
  allocated_storage      = 20    #  GBytes, minimum is 20 GB
  storage_type           = "gp2" #  "gp2" (general purpose SSD)
  engine                 = "mysql"
  engine_version         = "8.0.35"
  instance_class         = "db.t3.micro"
  name                   = var.mysql_db_name
  username               = var.mysql_user_name
  password               = var.mysql_password
  port                   = "3306"
  db_subnet_group_name   = "default"
  parameter_group_name   = "default.mysql8.0"
  publicly_accessible    = "true"
  vpc_security_group_ids = [aws_security_group.bind_ec2_db_2.id]
  skip_final_snapshot    = true
  snapshot_identifier    = var.db_snapshot_name
}

resource "aws_instance" "example_jim" {
  ami                    = "ami-9a91b371"
  instance_type          = "t2.micro"
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.bind_ec2_db_2.id]

  provisioner "file" {
    connection {
      type        = "ssh"
      user        = "ec2-user"
      host        = aws_instance.example_jim.public_ip
      agent       = false
      private_key = file("/home/jpizagno/AWS/jim-gastrofix.pem")
    }
    source      = "${var.current_working_directory}/../setup_aws_docker.sh"
    destination = "/tmp/setup_aws_docker.sh"
  }

  # run script on machine
  # run script on machine
  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ec2-user"
      host        = aws_instance.example_jim.public_ip
      agent       = false
      private_key = file("/home/jpizagno/AWS/jim-gastrofix.pem")
    }
    inline = [
      "chmod +x /tmp/setup_aws_docker.sh",
      "/tmp/setup_aws_docker.sh",
      "sudo sed -i -e 's/root/${var.mysql_user_name}/g' ./bookingbootstrap/react/src/main/resources/application.properties",
      "sudo sed -i -e 's/james76/${var.mysql_password}/g' ./bookingbootstrap/react/src/main/resources/application.properties",
      "sudo sed -i -e 's/localhost/${aws_db_instance.default.endpoint}/g' ./bookingbootstrap/react/src/main/resources/application.properties",
      "cd ./bookingbootstrap/react/",
      "sudo ./docker_build.sh",
      "sudo ./docker_run.sh",
    ]
  }
}

# these have to be included in output, so that the next step can read them as "data.terraform_remote_state.folder_parent.aws_instance.example_jim.private_ip"
output "aws_instance_example_jim_private_ip" {
  value = aws_instance.example_jim.private_ip
}

# these have to be included in output, so that the next step can read them as "data.terraform_remote_state.folder_parent.aws_security_group.bind_ec2_db_2.id"
output "aws_security_group_bind_ec2_db_2_id" {
  value = aws_security_group.bind_ec2_db_2.id
}

# export endpoint for fixing
output "aws_db_instance_default_endpoint" {
  value = aws_db_instance.default.endpoint
}

