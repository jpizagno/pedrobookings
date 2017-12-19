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
package de.booking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import de.booking.model.Booking;

/**
 * @author James Pizagno
 */
@PreAuthorize("hasRole('ROLE_MANAGER')")
@RepositoryRestResource(collectionResourceRel = "bookings", path = "bookings")
public interface BookingRepository extends PagingAndSortingRepository<Booking, Long> {

	@Override
	@PreAuthorize("#booking?.manager == null or #booking?.manager?.name == authentication?.name")
	Booking save(@Param("employee") Booking booking);

	@Override
	@PreAuthorize("@bookingRepository.findOne(#id)?.manager?.name == authentication?.name")
	void delete(@Param("id") Long id);

	@Override
	@PreAuthorize("#booking?.manager?.name == authentication?.name")
	void delete(@Param("booking") Booking booking);
	
	//public List<Booking> findByMonthDepartureAndYearDeparture(int monthDeparture, int yearDeparture);

	// login:   curl --user greg:turnquist --cookie-jar ./cookies http://localhost:8092/
	// "href" :   curl --cookie cookies "http://localhost:8092/api/bookings/search/findByMonthDepartureAndYearDeparture?month=12&year=1900"
	public List<Booking> findByMonthDepartureAndYearDeparture(@Param("month") Integer monthDeparture, @Param("year") Integer yearDeparture);
}
