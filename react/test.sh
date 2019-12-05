#!/bin/sh

set -e
set -x

# testing if npm is installed
npx -v

echo "    "
echo running Backend Java and Spring Controller Tests.....
echo "    "
echo running Maven Tests in quiet mode, only errors will be show.  To run maven in verbose mode, remove -q

mvn clean org.jacoco:jacoco-maven-plugin:prepare-agent test -Pintegration-test -Dmaven.test.failure.ignore=false

echo " "
echo running ReactJS tests using npx create-react-app then npm test
echo " "

rm -rf my-test-app
npx create-react-app my-test-app

cp src/main/js/bookings/Booking.js my-test-app/src/
cp src/test/resources/spec/Booking.test.js my-test-app/src/

cp src/main/js/bookings/BookingList.js my-test-app/src/
cp src/test/resources/spec/BookingList.test.js my-test-app/src/

cp src/main/js/bookings/UpdateDialog.js my-test-app/src/
cp src/test/resources/spec/UpdateDialog.test.js my-test-app/src/

cp src/main/js/bookings/ModalSearchBookingNumber.js my-test-app/src/
cp src/test/resources/spec/ModalSearchBookingNumber.test.js my-test-app/src/

cd my-test-app
npm test

echo " "
echo " "
echo " "
echo "    "
echo SUCCESS all tests passed
echo BackEnd java Jacoco.exec test results can be found under ./target/
echo "    "
echo FrontEnd/ReactJS tests can be seen by running npm start in my-app , and seeing the results at http://localhost:3000



