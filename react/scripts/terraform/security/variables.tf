variable "access_key" {}
variable "secret_key" {}
variable "key_name" {}
variable "mysql_db_name" {}
variable "mysql_user_name" {}
variable "mysql_password" {}
variable "user_ip_address" {}
variable "vpc_id" {}
variable "pem_file_location" {}

# one example of variable
variable "region" {
  default = "eu-central-1"
}

variable "amis" {
  type = "map"
  default = {
    "us-east-1" = "ami-b374d5a5"
    "us-west-2" = "ami-4b32be2b"
    "eu-central-1" = "ami-3a70df55"
  }
}
