'use strict';

import Modal from 'react-responsive-modal';
import { Base64 } from 'js-base64';

import Booking from './Booking.js';
import UpdateDialog from './UpdateDialog.js';
import CreateDialog from './CreateDialog.js';
import BookingList from './BookingList.js';

const React = require('react');
const ReactDOM = require('react-dom')
const when = require('when');
const client = require('./client');

const follow = require('./follow'); 

const stompClient = require('./websocket-listener');

const root = '/api';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingsAll: []
			, bookingsFiltered: [] 
			, isFiltered: true
			, attributes: []
			, page: 1
			, pageSize: 10
			, links: {}
			, monthFilter : -1 
			, yearFilter : -1
			, modelOpen : false
			, modalOpenCreate : false
			, reportUrl : '#'
			, managerName : 'Still loading .... '
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
		this.onOpenModalCreate = this.onOpenModalCreate.bind(this);
		this.onCloseModalCreate = this.onCloseModalCreate.bind(this);
		this.updateMonthValue = this.updateMonthValue.bind(this);
		this.updateYearValue = this.updateYearValue.bind(this);
		this.setTotal = this.setTotal.bind(this);
		this.generateReport = this.generateReport.bind(this);
	}


	// State for Filter Model
	onOpenModal() {
		this.setState({ modelOpen: true });
	}
	onCloseModal() {
		this.setState({ modelOpen: false });
	}

	// State for Create Model
	onOpenModalCreate() {
		this.setState({ modalOpenCreate: true });
	}
	onCloseModalCreate() {
		this.setState({ modalOpenCreate: false });
	}

	setTotal(booking) {
		var total =  booking.kreuzfahrt*0.035 + booking.flug*0.015 + booking.hotel*0.015 + booking.versicherung*0.015 ;
		booking.total = total;
		return booking;
	}
		
	loadFromServer(pageSize) {
		follow(client, root, [
		          			{rel: 'bookings'}
		          			, {rel: 'search'}
		          			, {rel: 'findTop10ByOrderByIdDesc'}] 
		          		).then(bookingCollection => {
			return client({
				method: 'GET',
				path: "http://localhost:8092/api/profile/bookings", //bookingCollection.entity._links.profile.href, 
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
				bookingsAll: bookings,
				bookingsFiltered: bookings,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links,
				managerName : bookings[0].entity.manager.name
			});
		});

	}

	goToReportUrl() {
		window.location = "report"; 
	}

	generateReport() {
		let url = 'http://localhost:8092/reportyearmonth?month='+this.state.monthFilter+'+&year='+this.state.yearFilter;
		fetch(url, {
			credentials: 'same-origin',
			method:'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}			
	       })
	.then(response => response.json())
	.then(json => {
		// Set redirect to URl of Report
		this.setState({reportUrl: json.url }, function () {
			this.goToReportUrl();
		});
	})}

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
				isFiltered : true
			});
		});
	}

	onCreate(bookingIn) {
		var newBooking = this.setTotal(bookingIn);
		follow(client, root, ['bookings']).done(response => {
			client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newBooking,
				headers: {'Content-Type': 'application/json'}
			})
		});
		//TODO: work on automatic reloud, databinding loses contact to Spring/Hibernate server when reload() is called
		//window.location.reload();
	}

	onUpdate(booking, bookingIn) {
		var updatedBooking = this.setTotal(bookingIn);
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
		window.location = "#";
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
		window.location = "#";
		window.location.reload();
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);

		stompClient.register([
			{route: '/topic/newBooking', callback: this.refreshAndGoToLastPage},
			{route: '/topic/updateBooking', callback: this.refreshCurrentPage},
			{route: '/topic/deleteBooking', callback: this.refreshCurrentPage}
		]);
	}

	setFilterStateOn(e ) {
		e.preventDefault();
			this.setState({isFiltered: true , modelOpen : false }, function () {
				this.followApiQueryFilterBookings();
			});
	}

	setFilterStateOff(e ) {
		e.preventDefault();
			this.setState({ 
				isFiltered: false 
				, monthFilter : -2
				, yearFilter : -2
				, modelOpen : false
			}) ;		
	}

	updateMonthValue(evt) {
		this.setState({
		  monthFilter: evt.target.value
		  ,isFiltered: true
		});
	  }

	updateYearValue(evt) {
		this.setState({
			yearFilter: evt.target.value
			,isFiltered: true
		});
	}

	render() {
		return (
			<div id="parent">

				<div className="navbar navbar-default navbar-fixed-top">
						<div className="dropdown">
							<button className="btn btn-default dropdown-toggle" type="button" id="dropdown" data-toggle="dropdown">Navigation
							<span className="caret"></span></button>
							<ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
								<li role="presentation"><a role="menuitem" href="logout">Logout</a></li>
							</ul>
						</div>
						<div id="logintext" className="text">Logged in as: {this.state.managerName} </div>
				</div>

				<div className="container-fluid" id="buttonsId">
					<div className="row top-buffer">
						<div className="col-md-4 offset-md-1">
							<button type="button" className="btn btn-unsto btn3d" onClick={this.onOpenModal}> Filter </button>
							<button type="button" className="btn btn-storno btn3d" onClick={this.generateReport}> Generate Report </button>
							<button type="button" className="btn btn-success btn3d" id="createStart" onClick={this.onOpenModalCreate}> Create </button>
						</div>

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

						<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate} closeModal={this.onCloseModalCreate} modalOpenState={this.state.modalOpenCreate}/>

					</div>

					<div className="row top-buffer">
						<div className="col">
							<BookingList page={this.state.page}
									bookings={ this.state.isFiltered ?  this.state.bookingsFiltered : this.state.bookingsAll}
									links={this.state.links}
									attributes={this.state.attributes}
									onUpdate={this.onUpdate}
									onDelete={this.onDelete}
									/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

