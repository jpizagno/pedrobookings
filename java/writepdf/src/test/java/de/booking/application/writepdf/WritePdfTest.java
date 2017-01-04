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
	public void test_database() {
		WritePdf myWritePdf = new WritePdf();
		List<Booking> myList = myWritePdf.getBookingsByMonthYear(1, 2016);
		Assert.assertEquals(myList.size(), 17);
		for( Booking myBooking : myList) {
			System.out.println(""+myBooking.getBooking_number());
		}
	}
  
}
