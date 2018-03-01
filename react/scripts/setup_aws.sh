#!/bin/bash

# install git
sudo yum install git -y
# install Java 8 with JDK
 sudo yum install java-1.8.0-openjdk-devel -y
# install maven
sudo wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sudo sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
sudo yum install -y apache-maven
# set Java-8 for maven
sudo /usr/sbin/alternatives --config java
sudo /usr/sbin/alternatives --config javac
# get code
git clone https://github.com/jpizagno/bookingbootstrap.git
cd bookingbootstrap/react
# edit src/main/resources/application.properties for ip addresses, and MySQL information

## test application
#curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
#shell% sudo yum -y install nodejs
#shell% sudo yum install gcc-c++ make
#shell% ./test.sh

# run application
shell% ./run.sh
