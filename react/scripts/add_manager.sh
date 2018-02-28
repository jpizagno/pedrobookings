#!/bin/bash

read -p 'MySQL Metadata Username: ' mysqluser
echo
read -sp 'MySQL Metadata Password: ' mysqlpass
echo
read -p 'Manager name (single name):  ' managername
echo
read -sp 'Manager password on webpage:  ' managerpassword
echo
read -p 'MySQL host:  i.e. jpizagno.czsq14wm4fo4.eu-central-1.rds.amazonaws.com:  ' mysqlurl
echo 
read -p 'MySQL db: i.e. db_example:  ' mysqldb


cd ../
cp ./scripts/pom_addmanager.xml .
mvn clean compile assembly:single -f ./pom_addmanager.xml
java -cp ./target/react-bookinghandler-0.0.1-SNAPSHOT-jar-with-dependencies.jar  de.booking.configuration.AddManager $mysqldb $mysqluser $mysqlpass $managername $managerpassword $mysqlurl
rm -rf ./target
rm -rf pom_addmanager.xml
