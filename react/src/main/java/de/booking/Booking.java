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
package de.booking;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author James Pizagno
 */
@Data
@Entity
public class Booking {

	private @Id @GeneratedValue Long id;
	
	@Column(name = "KREUZFAHRT")
	private float kreuzfahrt ;
	
	@Column(name = "FLUG")
	private float flug ;

	@Column(name = "HOTEL")
	private float hotel;
	
	@Column(name = "VERSICHERUNG")
	private float versicherung;

	@Column(name = "TOTAL")
	private float total;

	@Column(name = "DAY_DEPARTURE")
	private int dayDeparture; 
	
	@Column(name = "MONTH_DEPARTURE")
	private int monthDeparture;
	
	@Column(name = "YEAR_DEPARTURE")
	private int yearDeparture;	

	@Column(name = "SURNAME")
	private String surname;	
	
	@Column(name = "FIRST_NAME")
	private String firstName;	
	
	@Column(name = "BOOKING_NUMBER")
	private String bookingNumber;	
	
	@Column(name = "STORNO")
	private int storno;	

	@Column(name = "COMMENT")
	private String comment;	

	// used for data security, i.e. multiple users
	private @Version @JsonIgnore Long version;

	// who entered this booking
	private @ManyToOne Manager manager;

	private Booking() {}

	public Booking(float kreuzfahrt, float flug, float hotel, float versicherung, 
			int day_departure, int month_departure, int year_departure, 
			String surname, String first_name, String booking_number, 
			int storno, String comment, Date booking_date, Manager manager) {		
		this.kreuzfahrt = kreuzfahrt;
		this.flug = flug;
		this.hotel = hotel;
		this.versicherung = versicherung;
		this.total =  kreuzfahrt*0.035f + flug*0.015f + hotel*0.015f + versicherung*0.015f ;
		this.dayDeparture = day_departure;
		this.monthDeparture = month_departure;
		this.yearDeparture = year_departure;
		this.surname = surname;	
		this.firstName = first_name; 	
		this.bookingNumber = booking_number;
		this.storno = storno;	
		this.comment = comment;	
		this.manager = manager;
	}

	public void setManager(Manager managerIn) {
		this.manager = managerIn;
	}

	public Long getId() {
		return id;
	}
	
	public float getTotal() {
		return total;
	}
}