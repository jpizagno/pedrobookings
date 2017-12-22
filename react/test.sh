#!/bin/bash

set -e
set -x


echo "    "
echo " running Backend Java and Spring Controller Tests....."
echo "    "

mvn clean org.jacoco:jacoco-maven-plugin:prepare-agent test -Pintegration-test -Dmaven.test.failure.ignore=false

echo "    "
echo "java Jacoco.exec test results can be found under ./target/"
echo "    "

echo "    "
echo " running NPM ReactJS tests"
echo "    "

# npm install
sudo yum install nodejs npm --enablerepo=epel -y
sudo npm install n -g
sudo n stable
sudo npm install react-responsive-modal --save 
sudo npm install -g create-react-app

# sudo npm install --save-dev jest babel-jest babel-preset-es2015 babel-preset-react react-test-renderer
# sudo npm install --save-dev jest babel-jest babel-preset-es2015 babel-preset-react react-test-renderer
# sudo npm i --save-dev react-test-renderer@16

# create test project
sudo mkdir my-app-test
sudo chmod a+xrw my-app-test
create-react-app my-app-test

# copy software into my-app-test
rm -rf my-app-test/src/*
# cp -R * my-app-test/
rsync -av ./src/ ./my-app-test/src/ 

# run tests
echo '   '
echo ' ************** '
echo ' cd into my-app-test/ '
cd my-app-test/
echo ' ************* '
echo ' running npm install '
npm install
echo ' running npm test '
npm test

