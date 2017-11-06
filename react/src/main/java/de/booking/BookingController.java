package de.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/")
public class BookingController {
	
	@Autowired
	public BookingRepository bookingRepository;
	
	@RequestMapping(value="/bookings")
	public List<Booking> getAllBookings() {
		List<Booking> bookings = (List<Booking>) bookingRepository.findAll();
		return bookings;
	}

}