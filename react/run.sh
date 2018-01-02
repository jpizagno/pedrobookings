#!/bin/bash

set -e
set -x

rm -rf ./target/

mvn spring-boot:run
