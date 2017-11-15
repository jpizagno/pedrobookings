'use strict';

import Modal from 'react-responsive-modal';

const React = require('react');
const ReactDOM = require('react-dom')
const when = require('when');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"

const stompClient = require('./websocket-listener');

const root = '/api';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingsAll: []
			, bookingsFiltered: [] 
			, bookingsToDisplay : []
			, isFiltered: false
			, attributes: []
			, page: 1
			, pageSize: 100000
			, links: {}
			, monthFilter : -1 
			, yearFilter : -1
			, modelOpen : false
		};
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.followApiQueryFilterBookings = this.followApiQueryFilterBookings.bind(this);
		this.loadFromServer = this.loadFromServer.bind(this);
		this.setFilterStateOn = this.setFilterStateOn.bind(this);
		this.setFilterStateOff = this.setFilterStateOff.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.updateMonthValue = this.updateMonthValue.bind(this);
		this.updateYearValue = this.updateYearValue.bind(this);
	}


	onOpenModal() {
		this.setState({ modelOpen: true });
	}
	
	onCloseModal() {
		this.setState({ modelOpen: false });
	}
		
	loadFromServer(pageSize) {
		follow(client, root, [
				{rel: 'bookings', params: {size: pageSize}}]  // query here is:   "http://localhost:8092/api" but "bookings" added with size=2
		).then(bookingCollection => {
			//console.log(bookingCollection.entity._links.profile.href); // query here is: "http://localhost:8092/api/profile/bookings"
			return client({
				method: 'GET',
				path: bookingCollection.entity._links.profile.href, 
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				/**
				 * Filter unneeded JSON Schema properties, like uri references and
				 * subtypes ($ref).
				 */
				Object.keys(schema.entity.properties).forEach(function (property) {
					console.log(property);
					if (schema.entity.properties[property].hasOwnProperty('format') &&
						schema.entity.properties[property].format === 'uri') {
						delete schema.entity.properties[property];
					}
					else if (schema.entity.properties[property].hasOwnProperty('$ref')) {
						delete schema.entity.properties[property];
					}
				});

				this.schema = schema.entity;
				console.log(this.schema);
				this.links = bookingCollection.entity._links;
				return bookingCollection;
			});
		}).then(bookingCollection => {
			this.page = bookingCollection.entity.page;
			return bookingCollection.entity._embedded.bookings.map(booking =>
					client({
						method: 'GET',
						path: booking._links.self.href
					})
			);
		}).then(bookingPromises => {
			return when.all(bookingPromises);
		}).done(bookings => {
			console.log(bookings[0]);
			this.setState({
				page: this.page,
				bookingsAll: bookings,
				bookingsFiltered: bookings,
				bookingsToDisplay : bookings,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links
			});
		});

	}

	followApiQueryFilterBookings() {
		follow(client, root, [
			{rel: 'bookings'}
			, {rel: 'search'}
			, {rel: 'findByMonthDepartureAndYearDeparture', params:{month: this.state.monthFilter, year: this.state.yearFilter}}] 
		).then(bookingCollection => {
			return bookingCollection.entity._embedded.bookings.map(booking =>
					client({
						method: 'GET',
						path: booking._links.self.href
					})
			);
		}).then(bookingPromises => {
			return when.all(bookingPromises);
		}).done(bookings => {
			this.setState({
				bookingsFiltered: bookings,
				bookingsToDisplay: bookings,
				isFiltered : true
			});
		});
	}

	onCreate(newBooking) {
		follow(client, root, ['bookings']).done(response => {
			client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newBooking,
				headers: {'Content-Type': 'application/json'}
			})
		})
	}

	onUpdate(booking, updatedBooking) {
		client({
			method: 'PUT',
			path: booking.entity._links.self.href,
			entity: updatedBooking,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': booking.headers.Etag
			}
		}).done(response => {
			/* Let the websocket handler update the state */
		}, response => {
			if (response.status.code === 403) {
				alert('ACCESS DENIED: You are not authorized to update ' +
						booking.entity._links.self.href);
			}
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' + booking.entity._links.self.href +
					'. Your copy is stale.');
			}
		});
	}

	onDelete(booking) {
		client({method: 'DELETE', path: booking.entity._links.self.href}
		).done(response => {/* let the websocket handle updating the UI */},
		response => {
			if (response.status.code === 403) {
				alert('ACCESS DENIED: You are not authorized to delete ' +
						booking.entity._links.self.href);
			}
		});
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
		this.setState({monthFilter : 12 , bookingsAreFiltered: true , yearFilter : 1900 }, function () {
			this.followApiQueryFilterBookings();
		});

		stompClient.register([
			{route: '/topic/newBooking', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updateBooking', callback: this.refreshCurrentPage},
			{route: '/topic/deleteBooking', callback: this.refreshCurrentPage}
		]);
	}

	setFilterStateOn(e ) {
		e.preventDefault();
			this.setState({bookingsAreFiltered: true , modelOpen : false }, function () {
				this.followApiQueryFilterBookings();
			});
	}

	setFilterStateOff(e ) {
		e.preventDefault();
			this.setState({ 
				bookingsAreFiltered: false 
				, bookingsToDisplay : this.state.bookingsAll
				, monthFilter : -2
				, yearFilter : -2
				, modelOpen : false
			}) ;			
	}

	updateMonthValue(evt) {
		this.setState({
		  monthFilter: evt.target.value
		  ,bookingsAreFiltered: true
		});
	  }

	  updateYearValue(evt) {
		this.setState({
		  yearFilter: evt.target.value
		  ,bookingsAreFiltered: true
		});
	  }

	render() {
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				<button onClick={this.onOpenModal}> Filter </button>
				<Modal open={this.state.modelOpen} onClose={this.onCloseModal} little>
					<div>
						<div>
							<h2>Set Filter by Month and Year</h2>

							<form>
								<p key="month_dom_id">
									<input type="text" placeholder="month" ref="month_dom_id" className="field" onChange={this.updateMonthValue}/>
								</p>
								<p key="year_dom_id">
									<input type="text" placeholder="year" ref="year_dom_id" className="field" onChange={this.updateYearValue}/>
								</p>
								<button onClick={this.setFilterStateOn}>Filter On</button>
								<button onClick={this.setFilterStateOff}>Filter Off</button>
							</form>
						</div>
					</div>
				</Modal>
				
				<BookingList page={this.state.page}
								bookings={this.state.bookingsToDisplay}
							  links={this.state.links}
							  attributes={this.state.attributes}
							  onUpdate={this.onUpdate}
							  onDelete={this.onDelete}
							  />
			</div>
		)
	}
}

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		var newBooking = {};
		this.props.attributes.forEach(attribute => {
			newBooking[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newBooking);
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
		});
		window.location = "#";
	}

	render() {
		var inputs = this.props.attributes.map(attribute =>
				<p key={attribute}>
					<input type="text" placeholder={attribute} ref={attribute} className="field" />
				</p>
		);
		return (
			<div>
				<a href="#createBooking">Create</a>

				<div id="createBooking" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new booking</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		var updatedBooking = {};
		this.props.attributes.forEach(attribute => {
			updatedBooking[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.booking, updatedBooking);
		window.location = "#";
	}

	render() {
		var inputs = this.props.attributes.map(attribute =>
				<p key={this.props.booking.entity[attribute] + attribute}> 
					<input type="text" placeholder={attribute}
						   defaultValue={this.props.booking.entity[attribute]}
						   ref={attribute} className="field" />
				</p>
		);
		
		var dialogId = "updateBooking-" + this.props.booking.entity._links.self.href;

		return (
			<div key={this.props.booking.entity._links.self.href}>
				<a href={"#" + dialogId}>Update</a>
				<div id={dialogId} className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Update a booking</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Update</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

}

class BookingList extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var bookings = this.props.bookings.map(booking =>
			<Booking key={booking.entity._links.self.href}
					booking={booking}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}
					  onDelete={this.props.onDelete}/>
		);

		return (
			<div>

				<table>
					<tbody>
						<tr>
							<th>kreuzfahrt</th>							
							<th>flug</th>
							<th>hotel</th>
							<th>versicherung</th>
							<th>total</th>
							<th>dayDeparture</th> 
							<th>monthDeparture</th>
							<th>yearDeparture</th>
							<th>surname</th>
							<th>firstName</th>
							<th>bookingNumber</th>	
							<th>storno</th>
							<th>comment</th>
							<th>manager</th>
							<th></th>
							<th></th>
						</tr>
						{bookings}
					</tbody>
				</table>
			</div>
		)
	}
}

class Booking extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.booking);
	}

	render() {
		return (
			<tr>
				<td>{this.props.booking.entity.kreuzfahrt}</td>							
				<td>{this.props.booking.entity.flug}</td>
				<td>{this.props.booking.entity.hotel}</td>
				<td>{this.props.booking.entity.versicherung}</td>
				<td>{this.props.booking.entity.total}</td>
				<td>{this.props.booking.entity.dayDeparture}</td> 
				<td>{this.props.booking.entity.monthDeparture}</td>
				<td>{this.props.booking.entity.yearDeparture}</td>
				<td>{this.props.booking.entity.surname}</td>
				<td>{this.props.booking.entity.firstName}</td>
				<td>{this.props.booking.entity.bookingNumber}</td>	
				<td>{this.props.booking.entity.storno}</td>
				<td>{this.props.booking.entity.comment}</td>
				<td>{this.props.booking.entity.manager.name}</td>
				<td>
					<UpdateDialog booking={this.props.booking}
								  attributes={this.props.attributes}
								  onUpdate={this.props.onUpdate}/>
				</td>
				<td>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

