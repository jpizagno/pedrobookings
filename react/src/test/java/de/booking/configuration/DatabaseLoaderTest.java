package de.booking.configuration;

import static org.mockito.Mockito.mock;

import org.junit.Test;

import de.booking.repository.BookingRepository;
import de.booking.repository.ManagerRepository;

public class DatabaseLoaderTest {
	
	@Test
	public void run() throws Exception {
		BookingRepository bookingRepository = mock(BookingRepository.class);
		ManagerRepository managerRepository = mock(ManagerRepository.class);
		
		DatabaseLoader dbLoader = new DatabaseLoader(bookingRepository, managerRepository);
		
		String[] stringsIn = {"dummy1"};
		dbLoader.run(stringsIn);
	}

}
