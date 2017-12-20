package de.booking.model;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.Date;

import org.junit.Test;

import de.booking.repository.Manager;

public class BookingTest {
	
	@Test
	public void fields() {
		Booking obj = new Booking();
		Manager mgmt = new Manager("name", "password" );
		obj.setManager(mgmt);
		
		Date date = new Date();
		obj.setBookingDate( date );
		assertThat(obj.getBookingDate() , is(date));
		obj.setBookingNumber("abc");
		assertThat(obj.getBookingNumber(), is("abc"));
		obj.setComment( "comment" );
		assertThat(obj.getComment(), is("comment"));
		obj.setDayDeparture( 31 );
		assertThat(obj.getDayDeparture(), is(31));
		obj.setFirstName("firstName");
		assertThat(obj.getFirstName(), is("firstName"));
		obj.setFlug(100f);
		assertThat(obj.getFlug(), is(100f));
		obj.setHotel(100f);
		assertThat(obj.getHotel(), is(100f));
		obj.setKreuzfahrt(200f);
		assertThat(obj.getKreuzfahrt(), is(200f));
		obj.setMonthDeparture(12);
		assertThat(obj.getMonthDeparture() , is (12) );
		obj.setYearDeparture(1900);
		assertThat(obj.getYearDeparture() , is(1900) );
		obj.setStorno(0);
		assertThat(obj.getStorno() , is(0) );
		obj.setSurname( "lastname" );
		assertThat(obj.getSurname() , is("lastname") );
		obj.setTotal(300f);
		assertThat(obj.getTotal() , is(300f) );
		obj.setVersicherung( 400f);
		assertThat(obj.getVersicherung() , is(400f) );
		
		assertThat( obj.getTotal() , is(300f) );
		assertThat( obj.getKreuzfahrt(), is(200f) );
	}

}
