package de.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/")
public class BookingController {
	
	@Autowired
	public BookingRepository bookingRepository;
	
//	@RequestMapping(value="/bookings")
//	public List<Booking> getAllBookings() {
//		List<Booking> bookings = (List<Booking>) bookingRepository.findAll();
//		return bookings;
//	}
	
	/**
	 * Return a list of bookings for that month and year.
	 * 
	 * example curl:
	 * curl --cookie cookies "localhost:8092/bookingyearmonth?month=12&year=1900"
	 * 
	 * @param month
	 * @param year
	 * @return
	 */
	@RequestMapping(value="/bookingyearmonth")
	public List<Booking> getBookingsByMonthYear(@RequestParam(value="month", required=true) Integer month
			, @RequestParam(value="year", required=true) Integer year) {
		List<Booking> bookings = (List<Booking>) bookingRepository.findByMonthDepartureAndYearDeparture(month.intValue(), year.intValue());

		return bookings;
	}

}