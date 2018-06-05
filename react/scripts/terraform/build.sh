#!/bin/bash

set -e

set -x

read -p 'DB snapshot name (bookings03april2018): ' db_snapshot_name
echo
read -p 'Instance/Cluster Name (bookings): ' db_name
echo

export TF_LOG=INFO
export TF_LOG_PATH=./terraform.log

terraform init ec2_database/
terraform apply -var 'db_snapshot_name='$db_snapshot_name'' -var-file="./ec2_database/terraform.tfvars" ec2_database/

terraform init security/
terraform apply -var 'db_snapshot_name='$db_snapshot_name'' -var 'db_name='$db_name -var-file="./security/terraform.tfvars" security/

echo #########################
echo "please wait 5 mintues"
echo 
echo #########################