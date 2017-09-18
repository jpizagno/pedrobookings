'use strict';

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
		this.state = {bookings: [], attributes: [], page: 1, pageSize: 2, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
		this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
	}

	loadFromServer(pageSize) {
		follow(client, root, [
				{rel: 'bookings', params: {size: pageSize}}]
		).then(bookingCollection => {
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
					if (schema.entity.properties[property].hasOwnProperty('format') &&
						schema.entity.properties[property].format === 'uri') {
						delete schema.entity.properties[property];
					}
					else if (schema.entity.properties[property].hasOwnProperty('$ref')) {
						delete schema.entity.properties[property];
					}
				});

				this.schema = schema.entity;
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
			this.setState({
				page: this.page,
				bookings: bookings,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links
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

	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(bookingCollection => {
			this.links = bookingCollection.entity._links;
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
			this.setState({
				page: this.page,
				bookings: bookings,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			});
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	refreshAndGoToLastPage(message) {
		follow(client, root, [{
			rel: 'bookings',
			params: {size: this.state.pageSize}
		}]).done(response => {
			if (response.entity._links.last !== undefined) {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		})
	}

	refreshCurrentPage(message) {
		follow(client, root, [{
			rel: 'bookings',
			params: {
				size: this.state.pageSize,
				page: this.state.page.number
			}
		}]).then(bookingCollection => {
			this.links = bookingCollection.entity._links;
			this.page = bookingCollection.entity.page;

			return bookingCollection.entity._embedded.bookings.map(booking => {
				return client({
					method: 'GET',
					path: booking._links.self.href
				})
			});
		}).then(bookingPromises => {
			return when.all(bookingPromises);
		}).then(bookings => {
			this.setState({
				page: this.page,
				bookings: bookings,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			});
		});
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
		stompClient.register([
			{route: '/topic/newBooking', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updateBooking', callback: this.refreshCurrentPage},
			{route: '/topic/deleteBooking', callback: this.refreshCurrentPage}
		]);
	}

	render() {
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				<BookingList page={this.state.page}
								bookings={this.state.bookings}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  attributes={this.state.attributes}
							  onNavigate={this.onNavigate}
							  onUpdate={this.onUpdate}
							  onDelete={this.onDelete}
							  updatePageSize={this.updatePageSize}/>
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
				<p key={this.props.booking.entity[attribute]}>
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
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
		}
	}

	handleNavFirst(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	render() {
		var pageInfo = this.props.page.hasOwnProperty("number") ?
			<h3>Bookings - Page {this.props.page.number + 1} of {this.props.page.totalPages}</h3> : null;

		var bookings = this.props.bookings.map(booking =>
			<Booking key={booking.entity._links.self.href}
					booking={booking}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}
					  onDelete={this.props.onDelete}/>
		);

		var navLinks = [];
		if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
		}

		return (
			<div>
				{pageInfo}
				<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
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
				<div>
					{navLinks}
				</div>
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

