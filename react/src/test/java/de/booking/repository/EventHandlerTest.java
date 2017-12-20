package de.booking.repository;

import static org.mockito.Mockito.mock;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import de.booking.model.Booking;

public class EventHandlerTest {
	
	private Booking booking;
	private EventHandler event;

	@Before
	public void setUp() {
		SimpMessagingTemplate websocket = mock(SimpMessagingTemplate.class);
		EntityLinks entityLinks = mock(EntityLinks.class);
		event = new EventHandler( websocket , entityLinks);
		event.setPath("/target/path/dummy/");
		
		Manager manager = new Manager("name","password");
		booking = new Booking(100.0f, 200.0f, 150.0f, 250.0f, 
				01, 12, 1900, 
				"surname", "first_name", "booking_number", 
				0, "comment", new Date(), manager);
		
	}
	
	@Test
	public void newEmployee() {
		event.newEmployee(booking);
	}
	
	@Test
	public void deleteEmployee() {
		event.deleteEmployee(booking);
	}
	
	@Test
	public void updateEmployee() {
		event.updateEmployee(booking);
	}

}
