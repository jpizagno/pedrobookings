#!/bin/sh

set -e

docker run -d -p 80:8092 -t -i jpizagno/bookingwebapp 
