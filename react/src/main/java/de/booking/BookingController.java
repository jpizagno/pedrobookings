package de.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/")
@PreAuthorize("hasRole('ROLE_MANAGER')")
public class BookingController {
	
	@Autowired
	public BookingRepository bookingRepository;
	
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
	@RequestMapping(value="/reportyearmonth")
	public Response getBookingsByMonthYear(@RequestParam(value="month", required=true) Integer month
			, @RequestParam(value="year", required=true) Integer year) {
		// List<Booking> bookings = (List<Booking>) bookingRepository.findByMonthDepartureAndYearDeparture(month.intValue(), year.intValue());
		// return bookings;
		Response myResponse = new Response("reportUrl=" + month  +":year"+year);

		return myResponse;
	}

}