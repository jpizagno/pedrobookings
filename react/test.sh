#!/bin/bash

set -e

set -x

mvn clean org.jacoco:jacoco-maven-plugin:prepare-agent test -Pintegration-test -Dmaven.test.failure.ignore=false
