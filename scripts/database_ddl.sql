CREATE DATABASE `bookings_test` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE bookings_test;

CREATE TABLE `booking` (
  `kreuzfahrt` float(10,4) DEFAULT NULL,
  `flug` float(8,4) DEFAULT NULL,
  `hotel` float(8,4) DEFAULT NULL,
  `versicherung` float(8,4) DEFAULT NULL,
  `total` float(8,4) DEFAULT NULL,
  `day_departure` int(11) DEFAULT NULL,
  `month_departure` int(11) DEFAULT NULL,
  `year_departure` int(11) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `booking_number` varchar(100) DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  `storno` tinyint(1) DEFAULT NULL,
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `comment` varchar(2000) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1729 DEFAULT CHARSET=latin1;

CREATE TABLE `percentages` (
  `kreuzfahrt_percent` float DEFAULT NULL,
  `flug_percent` float DEFAULT NULL,
  `hotel_percent` float DEFAULT NULL,
  `versicherung_percent` float DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

GRANT ALL on bookings_test.* to 'julia'@'localhost' ;

