#!/bin/bash

set -e
set -x

rm -rf target/

mvn clean compile assembly:single
