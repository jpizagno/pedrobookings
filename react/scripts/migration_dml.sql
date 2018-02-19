USE bookings;

# create table with appropriate format
DROP TABLE bookings.booking;
CREATE TABLE `booking` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `booking_date` datetime DEFAULT NULL,
  `booking_number` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `day_departure` int(11) DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `flug` float DEFAULT NULL,
  `hotel` float DEFAULT NULL,
  `kreuzfahrt` float DEFAULT NULL,
  `month_departure` int(11) DEFAULT NULL,
  `storno` int(11) DEFAULT NULL,
  `surname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `total` float DEFAULT NULL,
  `versicherung` float DEFAULT NULL,
  `year_departure` int(11) DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2196 DEFAULT CHARSET=utf8 COLLATE=utf8_bin
;

# run SQL to generate data in bookings.booking. This can be an EXPORT from the old schema/db., and in SQL format.
# see booking_old_schema.sql

SET SQL_SAFE_UPDATES = 0;

# drop updated_time
ALTER TABLE bookings.booking DROP COLUMN updated_time;
# add manager id
ALTER TABLE bookings.booking ADD COLUMN manager_id BIGINT(20) DEFAULT 1;
# add version
ALTER TABLE bookings.booking ADD COLUMN version BIGINT(20) DEFAULT 0;

# update id
UPDATE bookings.booking as t1
SET t1.id = t1.id + 20000
;

# need non null comments 
UPDATE bookings.booking
SET comment = ''
WHERE comment is null
;

# need non null booking_date
UPDATE bookings.booking
SET booking_date =  NOW()
WHERE booking_date is null
;


CREATE DATABASE `db_example` /*!40100 DEFAULT CHARACTER SET latin1 */;
use db_example;
CREATE TABLE db_example.manager (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles` tinyblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1
;

CREATE TABLE db_example.booking (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `booking_date` datetime DEFAULT NULL,
  `booking_number` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `day_departure` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `flug` float DEFAULT NULL,
  `hotel` float DEFAULT NULL,
  `kreuzfahrt` float DEFAULT NULL,
  `month_departure` int(11) DEFAULT NULL,
  `storno` int(11) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `versicherung` float DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  `year_departure` int(11) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtieubmmea3tjdmg6m0pk6lomv` (`manager_id`),
  CONSTRAINT `FKtieubmmea3tjdmg6m0pk6lomv` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2006 DEFAULT CHARSET=latin1
;


# insert old data into new data
SET foreign_key_checks = 0;
INSERT INTO db_example.booking 
SELECT * FROM bookings.booking 
;

# correct the manager id
# check manager id created by Java code
UPDATE db_example.manager 
SET id = 1
;
UPDATE db_example.booking 
SET manager_id = 1
;
SET foreign_key_checks = 1;

# coorect the year_departure
UPDATE db_example.booking as t1
JOIN bookings.booking as t2 ON t2.booking_number=t1.booking_number
SET t1.year_departure = t2.year_departure
;

COMMIT;
