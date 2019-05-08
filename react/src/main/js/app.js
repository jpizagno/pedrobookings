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
			appStates: [{value:"logout",display:"logout"},{value:"bookings",display:"bookings"},{value:"ausgaben",display:"ausgaben"}]
			, selectedAppState: "bookings"
		};
	}

	componentDidMount() {}

	render() {
		return (
			<div id="parent">
				<div className="container-fluid" id="parent_main">

					<div className="row">
                        <div className="col">
                            <select value={this.state.selectedAppState}
                                    onChange={(e) => this.setState({selectedAppState: e.target.value, validationError: e.target.value === "" ? "You must select your App" : ""})}>
                            {this.state.appStates.map((app) => <option key={app.value} value={app.value}>{app.display}</option>)}
                            </select>
					    </div>
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
	<App loggedInManager={document.getElementById('managername').innerHTML} />,
	document.getElementById('app')
)

