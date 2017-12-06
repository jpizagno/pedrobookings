package de.booking.report;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.junit.Test;

import de.booking.Booking;
import de.booking.Manager;

public class WritePdfTest {
	
	@Test
	public void generateReport() {
		List<Booking> bookings = new LinkedList<>();
		Manager manager = new Manager("name","password");
		
		Booking booking = new Booking(100.0f, 200.0f, 150.0f, 250.0f, 
			01, 12, 1900, 
			"surname", "first_name", "booking_number", 
			0, "comment", new Date(), manager);
		bookings.add(booking);
		
		WritePdf writer = new WritePdf();
		String url = writer.generateReport(bookings, "fileOutName.pdf", "title");
		
		assertThat(url, is("fileOutName.pdf") );
	}

}
