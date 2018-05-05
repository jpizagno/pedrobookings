#!/bin/bash

export TF_LOG=INFO
export TF_LOG_PATH=./terraform.log

terraform init ec2_database/
terraform apply -var-file="./ec2_database/terraform.tfvars" ec2_database/

terraform init security/
terraform apply -var-file="./security/terraform.tfvars" security/