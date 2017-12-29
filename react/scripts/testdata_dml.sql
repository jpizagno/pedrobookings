use bookings;

INSERT INTO `booking`
(`kreuzfahrt`,`flug`,`hotel`,`versicherung`,`total`,`day_departure`,`month_departure`,`year_departure`,
`surname`,`first_name`,`booking_number`,`booking_date`,`storno`,`updated_time`,`comment`,`id`)
VALUES
(100,0,0,0,3.5,31,12,1900,
'only kreuzfahrt','first_name','A1B235','2017-01-01',0,CURRENT_TIMESTAMP(),"no comment",1)
;

INSERT INTO `booking`
(`kreuzfahrt`,`flug`,`hotel`,`versicherung`,`total`,`day_departure`,`month_departure`,`year_departure`,
`surname`,`first_name`,`booking_number`,`booking_date`,`storno`,`updated_time`,`comment`,`id`)
VALUES
(0,100,0,0,1.5,31,12,1900,
'only flug','first_name','A1B235','2017-01-01',0,CURRENT_TIMESTAMP(),"no comment",2)
;

INSERT INTO `booking`
(`kreuzfahrt`,`flug`,`hotel`,`versicherung`,`total`,`day_departure`,`month_departure`,`year_departure`,
`surname`,`first_name`,`booking_number`,`booking_date`,`storno`,`updated_time`,`comment`,`id`)
VALUES
(0,0,100,0,1.5,31,12,1900,
'only hotel','first_name','A1B235','2017-01-01',0,CURRENT_TIMESTAMP(),"no comment",3)
;

INSERT INTO `booking`
(`kreuzfahrt`,`flug`,`hotel`,`versicherung`,`total`,`day_departure`,`month_departure`,`year_departure`,
`surname`,`first_name`,`booking_number`,`booking_date`,`storno`,`updated_time`,`comment`,`id`)
VALUES
(0,0,0,100,1.5,31,12,1900,
'only versicherung','first_name','A1B235','2017-01-01',0,CURRENT_TIMESTAMP(),"no comment",4)
;

INSERT INTO `booking`
(`kreuzfahrt`,`flug`,`hotel`,`versicherung`,`total`,`day_departure`,`month_departure`,`year_departure`,
`surname`,`first_name`,`booking_number`,`booking_date`,`storno`,`updated_time`,`comment`,`id`)
VALUES
(1000,10,10,10,35.45,31,12,1900,
'all fields','first_name','A1B235','2017-01-01',0,CURRENT_TIMESTAMP(),"no comment",5)
;
