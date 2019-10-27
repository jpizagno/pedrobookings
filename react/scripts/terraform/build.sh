#!/bin/bash

set -e

set -x

read -p 'enter your ipv4 address: ' ipaddress
echo
read -p 'DB snapshot name (bookings03april2018): ' db_snapshot_name
echo
read -p 'Enter AWS AWSAccessKeyId : ' access_key
echo
read -p 'Enter AWS AWSSecretKey (see ~/.aws/credentials) : ' secret_key
echo

export TF_LOG=INFO
export TF_LOG_PATH=./terraform.log

terraform init ec2_database/
terraform apply -auto-approve -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'access_key='$access_key'' -var 'secret_key='$secret_key''  -var-file="./ec2_database/terraform.tfvars" ec2_database/

terraform init security/
terraform apply -auto-approve -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'access_key='$access_key'' -var 'secret_key='$secret_key''  -var-file="./security/terraform.tfvars" security/

echo #########################
echo "please wait 5 mintues"
echo 
echo #########################
