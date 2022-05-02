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

current_working_directory=$(pwd)
echo "using current_working_directory of "$current_working_directory
echo

export TF_LOG=INFO
export TF_LOG_PATH=./terraform.log

## Terraform v0.12.9
#terraform init ec2_database/ 
#terraform apply -auto-approve -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'access_key='$access_key'' -var 'secret_key='$secret_key''  -var-file="./ec2_database/terraform.tfvars" ec2_database/

# terraform v1.1.6
terraform -chdir=./ec2_database/ init
terraform -chdir=./ec2_database/ apply -auto-approve -var 'current_working_directory='$current_working_directory'' -var 'db_snapshot_name='$db_snapshot_name'' -var 'user_ip_address='$ipaddress'' -var 'access_key='$access_key'' -var 'secret_key='$secret_key''  -var-file="terraform.tfvars"

######################
# Update the security_group, and add rule to open port 3306 to the EC2's private IPv4
#
# Warning:  the AWS settings now differ from the TF state (security_group in AWS has an extra rule)
######################
securit_group_id=$(grep '"id":' ec2_database/terraform.tfstate  | grep 'sg-' | awk '{print $2}' | tr -d '"' | tr -d ',')
ec2_private_ip=$(grep '"private_ip":' ec2_database/terraform.tfstate | awk '{print $2}' | tr -d '"' | tr -d ',')
aws ec2 authorize-security-group-ingress --group-id $securit_group_id --protocol tcp --port 3306 --cidr $ec2_private_ip/32

echo #########################
echo "please wait 5 mintues"
echo 
echo #########################
