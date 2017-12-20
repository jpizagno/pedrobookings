package de.booking.repository;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;

import de.booking.model.Booking;

public class SpringDataRestEventHandlerTest {
	
	@Test
	public void applyUserInformationUsingSecurityContext() {
		ManagerRepository managerRepository = mock(ManagerRepository.class);
		SpringDataRestEventHandler hndlr = new SpringDataRestEventHandler(managerRepository);
		
		SecurityContext securityContext = mock(SecurityContext.class);
		Authentication authentication = mock(Authentication.class);
		when(authentication.getName()).thenReturn("managerName");
		when(securityContext.getAuthentication()).thenReturn(authentication);
		hndlr.setSecurityContext(securityContext);
		
		Booking booking = new Booking(100.0f, 200.0f, 150.0f, 250.0f, 
				01, 12, 1900, 
				"surname", "first_name", "booking_number", 
				0, "comment", new Date(), null);
		
		hndlr.applyUserInformationUsingSecurityContext(booking);
	}

}
