'use strict';

import Modal from 'react-responsive-modal';
import { Base64 } from 'js-base64';

import AppBookings from './bookings/AppBookings.js';
import AppAusgaben from './ausgaben/AppAusgaben.js';

const React = require('react');
const ReactDOM = require('react-dom')
const when = require('when');
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
			, bookingNumberFilter : -1
			, modelOpen : false
			, modalFilterBookingNumber : false
			, modalOpenCreate : false
			, reportUrl : '#'
			, loggedInManager: this.props.loggedInManager
			, appStates: [{value:"logout",display:"logout"},{value:"bookings",display:"bookings"},{value:"ausgaben",display:"ausgaben"}]
    		, selectedAppState: "bookings"
		};
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.followApiQueryFilterBookings = this.followApiQueryFilterBookings.bind(this);
		this.followApiQueryFilterBookingNumber = this.followApiQueryFilterBookingNumber.bind(this);
		this.loadFromServer = this.loadFromServer.bind(this);
		this.setFilterStateOn = this.setFilterStateOn.bind(this);
		this.setFilterStateOff = this.setFilterStateOff.bind(this);
		this.setFilterStateBookingNumberOn = this.setFilterStateBookingNumberOn.bind(this);
        this.setFilterStateBookingNumberOff = this.setFilterStateBookingNumberOff.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onOpenModalFilterBookingNumber = this.onOpenModalFilterBookingNumber.bind(this);
		this.onCloseModalFilterBookingNumber = this.onCloseModalFilterBookingNumber.bind(this);
		this.onOpenModalCreate = this.onOpenModalCreate.bind(this);
		this.onCloseModalCreate = this.onCloseModalCreate.bind(this);
		this.updateMonthValue = this.updateMonthValue.bind(this);
		this.updateYearValue = this.updateYearValue.bind(this);
		this.updateBookingNumberFilter = this.updateBookingNumberFilter.bind(this);
		this.setTotal = this.setTotal.bind(this);
		this.generateReport = this.generateReport.bind(this);
	}


	// State for Filter Modal
	onOpenModal() {
		this.setState({ modelOpen: true });
	}
	onCloseModal() {
		this.setState({ modelOpen: false });
	}

	// Modal for filtering my Booking Number
	onOpenModalFilterBookingNumber() {
	    this.setState( { modalFilterBookingNumber: true } );
    }
    onCloseModalFilterBookingNumber() {
        this.setState( { modalFilterBookingNumber: false } );
    }

	// State for Create Modal
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
				path: "http://" + window.location.hostname + ":8092/api/profile/bookings", //bookingCollection.entity._links.profile.href, 
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
		let url = "http://" + window.location.hostname + ':8092/reportyearmonth?month='+this.state.monthFilter+'&year='+this.state.yearFilter;
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
		})
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
				isFiltered : true
			});
		});
	}

	followApiQueryFilterBookingNumber() {
	    follow(client, root, [
            {rel: 'bookings'}
            , {rel: 'search'}
            , {rel: 'findByBookingNumber', params:{bookingNumber: this.state.bookingNumberFilter}}]
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
	}

	onUpdate(booking, bookingIn) {
		if(booking.entity.manager.name == this.state.loggedInManager) {
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
		} else {
			alert("You are not authorized to update " + booking.entity._links.self.href);
		}
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

    // filters for Month/Year
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

	// filters for Booking Number
	setFilterStateBookingNumberOn(e ) {
    		e.preventDefault();
    			this.setState({isFiltered: true , modalFilterBookingNumber :  true}, function () {
    				this.followApiQueryFilterBookingNumber();
    			});
    	}
    setFilterStateBookingNumberOff(e ) {
        e.preventDefault();
            this.setState({
                isFiltered: false
                , modalFilterBookingNumber : false
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

	updateBookingNumberFilter(evt) {
	    this.setState({
            bookingNumberFilter: evt.target.value
            ,isFiltered: true
        });
	}

	render() {
		return (
			<div id="parent">
				<div className="container-fluid" id="buttonsId">

					<div>
						<select value={this.state.selectedAppState} 
								onChange={(e) => this.setState({selectedAppState: e.target.value, validationError: e.target.value === "" ? "You must select your App" : ""})}>
						{this.state.appStates.map((app) => <option key={app.value} value={app.value}>{app.display}</option>)}
						</select>
					</div>

					{this.state.selectedAppState === "bookings" ? 
						(<AppBookings loggedInManager={this.props.loggedInManager}/>) 
						: (<AppAusgaben />)  
					}

				</div>
			</div>
		)
	}
}


ReactDOM.render(
	 // <App loggedInManager={document.getElementById('managername').innerHTML} />,
	<App loggedInManager="test_jim_app_line_413" />,
	document.getElementById('app')
)

