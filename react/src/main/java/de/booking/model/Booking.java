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
package de.booking.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.booking.repository.Manager;

/**
 * @author James Pizagno
 */
//@Data  // this annotation will generate Getters, Settings, ToStrings, and @EqualsAndHashCode, but is hard to test
@Entity 
public class Booking {

	public float getFlug() {
		return flug;
	}

	public void setFlug(float flug) {
		this.flug = flug;
	}

	public float getHotel() {
		return hotel;
	}

	public void setHotel(float hotel) {
		this.hotel = hotel;
	}

	public float getVersicherung() {
		return versicherung;
	}

	public void setVersicherung(float versicherung) {
		this.versicherung = versicherung;
	}

	public int getDayDeparture() {
		return dayDeparture;
	}

	public void setDayDeparture(int dayDeparture) {
		this.dayDeparture = dayDeparture;
	}

	public int getMonthDeparture() {
		return monthDeparture;
	}

	public void setMonthDeparture(int monthDeparture) {
		this.monthDeparture = monthDeparture;
	}

	public int getYearDeparture() {
		return yearDeparture;
	}

	public void setYearDeparture(int yearDeparture) {
		this.yearDeparture = yearDeparture;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getBookingNumber() {
		return bookingNumber;
	}

	public void setBookingNumber(String bookingNumber) {
		this.bookingNumber = bookingNumber;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public Manager getManager() {
		return manager;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setKreuzfahrt(float kreuzfahrt) {
		this.kreuzfahrt = kreuzfahrt;
	}

	public void setTotal(float total) {
		this.total = total;
	}

	public void setStorno(int storno) {
		this.storno = storno;
	}

	private @Id @GeneratedValue Long id;
	
	@Column(name = "KREUZFAHRT")
	protected float kreuzfahrt ;
	
	@Column(name = "FLUG")
	protected float flug ;

	@Column(name = "HOTEL")
	protected float hotel;
	
	@Column(name = "VERSICHERUNG")
	protected float versicherung;

	@Column(name = "TOTAL")
	protected float total;

	@Column(name = "DAY_DEPARTURE")
	protected int dayDeparture; 
	
	@Column(name = "MONTH_DEPARTURE")
	protected int monthDeparture;
	
	@Column(name = "YEAR_DEPARTURE")
	private int yearDeparture;	

	@Column(name = "SURNAME")
	protected String surname;	
	
	@Column(name = "FIRST_NAME")
	protected String firstName;	
	
	@Column(name = "BOOKING_NUMBER")
	protected String bookingNumber;	
	
	@Column(name = "STORNO")
	protected int storno;	

	@Column(name = "COMMENT")
	protected String comment;	

	// current timestamp
	@Column(name = "BOOKING_DATE")
	protected Date bookingDate;	
	
	// used for data security, i.e. multiple users
	protected @Version @JsonIgnore Long version;

	// who entered this booking
	private @ManyToOne Manager manager;

	protected Booking() {}

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
		this.bookingDate = booking_date;
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

	public int getStorno() {
		return this.storno;
	}
	
	public float getKreuzfahrt() {
		return kreuzfahrt;
	}

}