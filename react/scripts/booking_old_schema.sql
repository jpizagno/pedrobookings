USE bookings;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM bookings.booking;

insert into `booking`(`kreuzfahrt`,`flug`,`hotel`,`versicherung`,`total`,`day_departure`,`month_departure`,`year_departure`,`surname`,`first_name`,`booking_number`,`booking_date`,`storno`,`updated_time`,`comment`,`id`) values (1916,0,0,0,67.06,22,4,2011,'name1','hans','1100','2011-03-08 00:00:00',0,'2012-05-10 09:59:30',null,1);
insert into `booking`(`kreuzfahrt`,`flug`,`hotel`,`versicherung`,`total`,`day_departure`,`month_departure`,`year_departure`,`surname`,`first_name`,`booking_number`,`booking_date`,`storno`,`updated_time`,`comment`,`id`) values (3652,0,0,0,127.82,16,6,2011,'name2','julia','11200','2011-03-09 00:00:00',0,'2012-05-10 09:59:30',null,2);

COMMIT;