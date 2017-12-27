#!/bin/bash

read -p 'MySQL Metadata Username: ' mysqluser
echo
read -sp 'MySQL Metadata Password: ' mysqlpass
echo
read -p 'Manager name (single name):  ' managername
echo
read -sp 'Manager password on webpage:  ' managerpassword
echo
 

cd ../
mvn clean compile assembly:single
java -cp ./target/react-bookinghandler-0.0.1-SNAPSHOT-jar-with-dependencies.jar  de.booking.configuration.AddManager db_example $mysqluser $mysqlpass $managername $managerpassword 
