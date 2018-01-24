
test api with login:
curl --user greg:turnquist --cookie-jar ./cookies http://localhost:8092/
curl --cookie cookies "http://localhost:8092/api/bookings/search/findByMonthDepartureAndYearDeparture?month=12&year=1900"


** build
compile with 
mvn clean install

** Run
run with:
mvn spring-boot:run

** Test
to Test must install phantom JS and set path to binary:
export PATH=$PATH:/home/jpizagno/Otto/Code/ReactTestExample/Phantom/phantomjs-2.1.1-linux-x86_64/bin
mvn jasmine:test
mvn jasmine:bdd # jetty on http://localhost:8234

