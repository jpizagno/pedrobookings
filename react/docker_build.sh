#!/bin/sh

set -e

read -p 'AWS Public DNS (IPv4) from EC2 Dashboard: ' ip
echo

sed -i "s/localhost/$ip/" src/main/js/app.js


docker build -t  jpizagno/bookingwebapp .
