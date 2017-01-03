CREATE DATABASE `bookings` /*!40100 DEFAULT CHARACTER SET latin1 */;

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
) ENGINE=InnoDB AUTO_INCREMENT=1750 DEFAULT CHARSET=latin1;