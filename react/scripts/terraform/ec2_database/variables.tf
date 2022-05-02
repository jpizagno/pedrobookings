variable "access_key" {
}

variable "security_group_id" {
  
}

variable "secret_key" {
}

variable "key_name" {
}

variable "mysql_db_name" {
}

variable "mysql_user_name" {
}

variable "mysql_password" {
}

variable "user_ip_address" {
}

variable "vpc_id" {
}

variable "pem_file_location" {
}

variable "db_snapshot_name" {
}

variable "current_working_directory" {
}

# one example of variable
variable "region" {
  default = "eu-central-1"
}

variable "amis" {
  type = map(string)
  default = {
    "eu-central-1" = "ami-3a70df55"
  }
}

