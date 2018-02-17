#!/bin/bash

set -e
set -x

read -p 'AWS Public DNS (IPv4) from EC2 Dashboard: ' ip
echo

sed -i "s/localhost/$ip/" src/main/js/app.js

rm -rf ./target/

mvn spring-boot:run
