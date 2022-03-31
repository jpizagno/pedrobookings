#!/bin/bash

set -e

set -x


ipaddress=$(curl https://ipinfo.io/ip)
echo "using IPv4 of: "$ipaddress
#read -p 'enter your ipv4 address: ' ipaddress
#echo
read -p 'DB snapshot name (bookings03april2018): ' db_snapshot_name
echo
read -p 'Enter AWS AWSAccessKeyId : ' access_key
echo
read -p 'Enter AWS AWSSecretKey (see ~/.aws/credentials) : ' secret_key
echo

export TF_LOG=INFO
export TF_LOG_PATH=./terraform.log

## Terraform v0.12.9
#terraform init ec2_database/ 
#terraform apply -auto-approve -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'access_key='$access_key'' -var 'secret_key='$secret_key''  -var-file="./ec2_database/terraform.tfvars" ec2_database/

# terraform v1.1.6
terraform -chdir=./ec2_database/ init
terraform -chdir=./ec2_database/ apply -auto-approve -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'access_key='$access_key'' -var 'secret_key='$secret_key''  -var-file="terraform.tfvars"

## Terraform v0.12.9
#terraform init security/
#terraform apply -auto-approve -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'access_key='$access_key'' -var 'secret_key='$secret_key''  -var-file="./security/terraform.tfvars" security/

# terraform v1.1.6
terraform -chdir=./security/ init
terraform -chdir=./security/ apply -auto-approve -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'access_key='$access_key'' -var 'secret_key='$secret_key''


echo #########################
echo "please wait 5 mintues"
echo 
echo #########################
