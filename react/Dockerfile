FROM openjdk:8

RUN apt-get update -y
RUN apt-get install maven -y

COPY . /usr/myapp
WORKDIR /usr/myapp


CMD ["mvn", "spring-boot:run"]
