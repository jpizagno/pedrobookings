#!/bin/sh

set -e
set -x


echo "    "
echo running Backend Java and Spring Controller Tests.....
echo "    "
echo running Maven Tests in quiet mode, only errors will be show.  To run maven in verbose mode, remove -q

mvn clean org.jacoco:jacoco-maven-plugin:prepare-agent test -Pintegration-test -Dmaven.test.failure.ignore=false

echo " "
echo running ReactJS tests using PhantomJS
echo " "
mvn -q -Dorg.slf4j.simpleLogger.defaultLogLevel=WARN jasmine:test

echo " "
echo " "
echo " "
echo "    "
echo SUCCESS all tests passed
echo BackEnd java Jacoco.exec test results can be found under ./target/
echo "    "
echo FrontEnd/ReactJS tests can be seen by running mvn jasmine:bdd , and seeing the results at http://localhost:8234



