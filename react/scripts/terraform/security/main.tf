provider "aws" {
  version    = "~> 2.7"
  access_key = var.access_key # from variables.tf
  secret_key = var.secret_key # from variables.tf
  region     = var.region     # from variables.tf
}

# reference state in parent, so EC2 can find the Endpoint of the database
data "terraform_remote_state" "folder_parent" {
  backend = "local"
  config = {
    path = "${path.module}/../terraform.tfstate"
  }
}

# setup Security Group so Database and EC2 can communicate through port=3306
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

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["${data.terraform_remote_state.folder_parent.outputs.aws_instance_example_jim_private_ip}/32"]
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
  engine_version         = "5.6.39"
  instance_class         = "db.t2.micro"
  name                   = var.mysql_db_name
  username               = var.mysql_user_name
  password               = var.mysql_password
  port                   = "3306"
  db_subnet_group_name   = "default"
  parameter_group_name   = "default.mysql5.6"
  publicly_accessible    = "true"
  vpc_security_group_ids = [aws_security_group.bind_ec2_db_2.id]
  skip_final_snapshot    = true
  snapshot_identifier    = var.db_snapshot_name
}

resource "aws_instance" "example_jim" {
  ami           = "ami-9a91b371"
  instance_type = "t2.micro"
  key_name      = var.key_name
  # TF-UPGRADE-TODO: In Terraform v0.10 and earlier, it was sometimes necessary to
  # force an interpolation expression to be interpreted as a list by wrapping it
  # in an extra set of list brackets. That form was supported for compatibility in
  # v0.11, but is no longer supported in Terraform v0.12.
  #
  # If the expression in the following list itself returns a list, remove the
  # brackets to avoid interpretation as a list of lists. If the expression
  # returns a single list item then leave it as-is and remove this TODO comment.
  vpc_security_group_ids = [data.terraform_remote_state.folder_parent.outputs.aws_security_group_bind_ec2_db_2_id]
}

# provide user output
output "ip_ec2" {
  value = aws_instance.example_jim.public_ip
}

