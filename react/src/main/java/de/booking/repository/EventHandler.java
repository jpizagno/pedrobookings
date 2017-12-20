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

import static de.booking.configuration.WebSocketConfiguration.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import de.booking.model.Booking;

/**
 * @author James Pizagno
 */
@Component
@RepositoryEventHandler(Booking.class)
public class EventHandler {

	private final SimpMessagingTemplate websocket;

	private final EntityLinks entityLinks;
	
	private String path;

	@Autowired
	public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
		this.websocket = websocket;
		this.entityLinks = entityLinks;
	}

	@HandleAfterCreate
	public void newEmployee(Booking booking) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/newBooking", getPath(booking));
	}

	@HandleAfterDelete
	public void deleteEmployee(Booking booking) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/deleteBooking", getPath(booking));
	}

	@HandleAfterSave
	public void updateEmployee(Booking booking) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/updateBooking", getPath(booking));
	}

	/**
	 * Take an {@link Employee} and get the URI using Spring Data REST's {@link EntityLinks}.
	 *
	 * @param employee
	 */
	private String getPath(Booking booking) {
		if( this.path == null) {
			return this.entityLinks.linkForSingleResource(booking.getClass(),
					booking.getId()).toUri().getPath();
		} else {
			return this.path;
		}
	} 
	
	/**
	 * implemented for Testing
	 * 
	 * @param path
	 */
	public void setPath(String path) {
		this.path = path;
	}

}
