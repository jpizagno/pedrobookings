
test api with login:
curl --user greg:turnquist --cookie-jar ./cookies http://localhost:8092/
curl --cookie cookies "http://localhost:8092/api/bookings/search/findByMonthDepartureAndYearDeparture?month=12&year=1900"



compilte with 
mvn clean install

run with:
mvn spring-boot:run


