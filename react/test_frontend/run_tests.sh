#!/bin/bash


echo  check if website is up....
wget -O /tmp/booking_website_test_frontend_deleteme -q http://127.0.0.1:8092

words=`wc -l /tmp/booking_website_test_frontend_deleteme | awk '{print $1}'`;

if [ $words == 0 ] ; then
echo ERROR:  website at 127.0.0.1:8092 down
echo no tests ran. exiting...
exit
fi  

mvn test
