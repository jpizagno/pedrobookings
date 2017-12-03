package de.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.booking.report.WritePdf;

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

		List<Booking> bookings = bookingRepository.findByMonthDepartureAndYearDeparture(month, year);
		
		WritePdf writer = new WritePdf();
		String fileOutName = "report_" + month + "_" + year + ".pdf";
		String title =  "Julia's bookings for month "+month+" year "+year ;
		Response myResponse = new Response("reportUrl=" +writer.generateReport(bookings, fileOutName, title));

		return myResponse;
	}

}