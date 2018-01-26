FROM openjdk:8

RUN apt-get update -y
RUN apt-get install maven -y

COPY . /usr/myapp
WORKDIR /usr/myapp

# set the Hosts MySQL IP Address
RUN apt-get install net-tools -y
RUN route | awk '{if($1=="default") print $2}' > ip_addr_file
RUN sed -i "s/localhost/$(cat ip_addr_file)/" src/main/resources/application.properties

CMD ["mvn", "spring-boot:run"]
