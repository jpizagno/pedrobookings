#!/bin/bash

read -p 'MySQL Metadata Username: ' mysqluser
echo
read -sp 'MySQL Metadata Password: ' mysqlpass
echo
read -p 'Manager name (single name):  ' managername
echo
read -sp 'Manager password on webpage:  ' managerpassword
echo
 
mysql -u$mysqluser -p$mysqlpass<<EOFMYSQL
INSERT INTO db_example.manager (name,password,roles) VALUES ( '$managername' , '$managerpassword' , 'ROLE_MANAGER')
EOFMYSQL

