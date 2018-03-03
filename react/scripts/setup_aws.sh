#!/bin/bash

# install git
#sudo yum install git -y
# install Java 8 with JDK
 sudo yum install java-1.8.0-openjdk-devel -y
# install maven
sudo wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sudo sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
sudo yum install -y apache-maven
# set Java-8 for maven
sudo /usr/sbin/alternatives --config java
sudo /usr/sbin/alternatives --config javac

# install Docker
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# install Node for test.sh script
cd /home/ec2-user/
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.11.5
nvm install --lts
. ~/.nvm/nvm.sh
npm install -g npx
cd /home/ec2-user/
. ~/.nvm/nvm.sh
