package de.booking.controller;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;

import de.booking.model.Booking;
import de.booking.repository.BookingRepository;
import de.booking.repository.Manager;

public class BeansTestConfig {

	private Integer monthDeparture = 12;
	private Integer yearDeparture = 1900;

	@Bean
	public BookingRepository bookingRepository() {
		BookingRepository repository = Mockito.mock(BookingRepository.class);

		List<Booking> bookings = new ArrayList<>();
		Manager manager = new Manager("username","password");
		Booking booking = new Booking(100.0f, 200.0f, 150.0f, 250.0f, 
				01, monthDeparture, yearDeparture, 
				"surname", "first_name", "booking_number", 
				0, "comment", new Date(), manager);
		bookings.add(booking);

		when(repository.findByMonthDepartureAndYearDeparture(monthDeparture, yearDeparture)).thenReturn(bookings);

		return repository;
	}

	@Bean
	public BookingController teradataTransferController() {
		return new BookingController();
	}

}
