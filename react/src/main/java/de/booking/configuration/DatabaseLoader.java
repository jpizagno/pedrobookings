/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package de.booking.configuration;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import de.booking.model.Booking;
import de.booking.repository.BookingRepository;
import de.booking.repository.Manager;
import de.booking.repository.ManagerRepository;

/**
 * @author James Pizagno
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final BookingRepository bookings;
	private final ManagerRepository managers;

	@Autowired
	public DatabaseLoader(BookingRepository bookingRepository,
						  ManagerRepository managerRepository) {

		this.bookings = bookingRepository;
		this.managers = managerRepository;
	}

	@Override
	public void run(String... strings) throws Exception {
//		Manager greg = this.managers.save(new Manager("james", "password12345",
//							"ROLE_MANAGER"));
//
//		SecurityContextHolder.getContext().setAuthentication(
//			new UsernamePasswordAuthenticationToken("greg", "doesn't matter",
//				AuthorityUtils.createAuthorityList("ROLE_MANAGER")));
//
//		this.bookings.save(new Booking(100.0f, 1.0f, 2.0f, 3.0f, 
//				31, 12, 1900, "surname1", "firstName1", "bookingNumber1", 
//				0, "5comment A", new Date(), greg));
//		this.bookings.save(new Booking(100000.0f, 1.0f, 2.0f, 3.0f, 
//				31, 12, 1900, "surname1", "firstName1", "bookingNumber1", 
//				0, "5comment A", new Date(), greg));
//		this.bookings.save(new Booking(101.0f, 10.0f, 1.0f, 2.0f, 
//				31, 11, 1900, "surname2", "firstName2", "bookingNumber2", 
//				0, "4comment B", new Date(), greg));
//		this.bookings.save(new Booking(111111.0f, 10.0f, 1.0f, 2.0f, 
//				31, 11, 1900, "surname2", "firstName2", "bookingNumber2", 
//				0, "4comment B", new Date(), greg));
//		
//		for (int bi=0 ; bi<2000 ; bi++) {
//			this.bookings.save(new Booking(0.0f, 10.0f, 1.0f, 2.0f, 
//					31, 11, 1900, "surname"+bi, "firstName"+bi, "bookingNumber"+bi, 
//					0, "comment "+bi, new Date(), greg));
//			System.out.println("WAIT: loading data in database loading bi="+bi+"/2000 comment="+"comment "+bi);
//		}
		
		SecurityContextHolder.clearContext();
	}
}