#!/bin/bash

set -e

set -x

read -p 'enter your ipv4 address: ' ipaddress
echo
read -p 'DB snapshot name (bookings03april2018): ' db_snapshot_name
echo
read -p 'Enter AWS secret_key (see ~/.aws/credentials) : ' secret_key
echo

export TF_LOG=INFO
export TF_LOG_PATH=./terraform.log

terraform init ec2_database/
terraform apply -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'secret_key='$secret_key''  -var-file="./ec2_database/terraform.tfvars" ec2_database/

terraform init security/
terraform apply -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'secret_key='$secret_key''  -var-file="./security/terraform.tfvars" security/

echo #########################
echo "please wait 5 mintues"
echo 
echo #########################
