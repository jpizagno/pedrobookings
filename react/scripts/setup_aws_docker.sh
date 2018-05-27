#!/bin/bash

# install git
sudo yum install git -y
git clone https://github.com/jpizagno/bookingbootstrap.git

# install Docker
sudo yum install docker -y 
sudo service docker start
sudo usermod -a -G docker ec2-user

exit 0


