#!/bin/bash

sudo yum install git

sudo yum install yum install mysql mysql-devel mysql-server mysql-utilities

sudo service mysqld start

## need to migrate data
# create table db_example.temp like bookings.booking;
## ingest into temporary table
# insert into db_example.temp select * from bookings.booking;
## drop non matching columns
# alter table temp drop column updated_time;
## insert from temporary table into db_example.booking:
# insert into booking select * from temp on duplicate key update booking.id=booking.id+1000;
## link new data with old manager in db_example.manager, and remove null
# update db_example.booking set manager_id=1;
# update booking set version=0 where version is null;
# update booking set comment='' where comment is null;

git clone https://github.com/jpizagno/bookingbootstrap.git

# install java 8 
sudo yum install java-1.8.0-openjdk-devel

# install Maven
sudo wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sudo sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
sudo yum install -y apache-maven
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.35.amzn1.x86_64/
sudo update-alternatives --config java
