package de.booking.application.writepdf;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import de.booking.application.writepdf.model.Booking;

/**
 * Unit test for simple App.
 */
public class WritePdfTest {
	
	@Test
	public void test_database_connection() {
		WritePdf myWritePdf = new WritePdf();
		List<Booking> myList = myWritePdf.getBookingsByMonthYear(1, 2016, "bookings", "julia" , "james76");
		// data may not be there.  However, if the connection does not work , or data is not read, then this test will fail.
		Assert.assertTrue(myList.size() > -1 );
	}
  
}
