const React = require('react');
const ReactDOM = require('react-dom');
import Modal from 'react-responsive-modal';

class CreateDialog extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    // checks if Date is valid.  Format DD/MM/YYYY
    isValidDate(ddMMYYYY) {
        var dateParts = ddMMYYYY.split('/');
        var year = dateParts[2], month = dateParts[1], day = dateParts[0];
        // Assume not leap year by default (note zero index for Jan)
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if ((!(year % 4) && year % 100) || !(year % 400)) {
          daysInMonth[1] = 29;
        }
        return !(/\D/.test(String(day))) && day > 0 && day <= daysInMonth[--month]
    }
      

    handleSubmit(e) {
        e.preventDefault();
        var newBooking = {};
        this.props.attributes.forEach(attribute => {
            if (['total', 'flug', 'kreuzfahrt', 'hotel', 'versicherung', 'storno'].indexOf(attribute) >= 0) {
                if( ReactDOM.findDOMNode(this.refs[attribute]) == null  || ReactDOM.findDOMNode(this.refs[attribute]).value.trim() === "" ) {
                    newBooking[attribute] = 0;
                } else {
                    newBooking[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
                }
            } else  if ( attribute == "comment") {
                newBooking[attribute] = '';
            } else {
                newBooking[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
            }
        });
        if (this.isValidDate(newBooking["dayDeparture"] + '/' + newBooking["monthDeparture"] + '/' + newBooking["yearDeparture"]) == false) {
            alert("wrong dates dayDeparture="+newBooking["dayDeparture"]+" monthDeparture="+newBooking["monthDeparture"]+" yearDeparture="+newBooking["yearDeparture"]) ;
        } else {
            this.props.onCreate(newBooking);
            this.props.closeModal();
        }
    }

    closeModal(e) {
        e.preventDefault();
        window.location = "#";
    }
    
    render() {
        var inputs = this.props.attributes.map(attribute =>
                <p key={attribute}>
                    <input type="text" placeholder={ (attribute=='bookingDate') ? 'yyyy-MM-dd Booking Date' : attribute } ref={attribute} className="field" />
                </p>
        );

        var style1 = {color: "rgb(46, 125, 50)" , background: "rgb(200, 230, 201)" } ;
        var style2 = {color: "rgb(198, 40, 40)" , background: "rgb(255, 205, 210)" } ;

        return (
            <Modal open={this.props.modalOpenState} onClose={this.props.closeModal} id="createBooking" classNames={{ modal: 'custom-modal' }}>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <form>
                                <div id="contact-form" className="form-container" data-form-container>
                                    <div className="row">
                                        <div className="form-title">
                                            <span>Costs </span>
                                        </div>
                                    </div>
                                    <div className="input-container">
                                        <div className="row">
                                            <span className="req-input" >
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Input Kreuzfahrt"> </span>
                                                <input type="text" data-min-length="8" ref="kreuzfahrt" id="kreuzfahrt"  placeholder="Kreuzfahrt" />
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Input Flug"> </span>
                                                <input type="text" id="flug" ref="flug" placeholder="Flug"/>
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Input Hotel"> </span>
                                                <input type="text" id="hotel" ref="hotel" placeholder="Hotel"/>
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Input Versicherung"> </span>
                                                <input type="text" id="versicherung" ref="versicherung"  placeholder="Versicherung"/>
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Input Storno"> </span>
                                                <input type="text" id="storno" ref="storno"  placeholder="Storno (0=Good, 1=Storno)"/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    
                    
                        <div className="col-md-4">
                            <form>
                                <div id="contact-form" className="form-container" data-form-container style={style1}>
                                    <div className="row">
                                        <div className="form-title">
                                            <span>Name and Booking Number </span>
                                        </div>
                                    </div>
                                    <div className="input-container">
                                        <div className="row">
                                            <span className="req-input valid" >
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Input Surname"> </span>
                                                <input type="text" data-min-length="8" ref="surname" id="surname" placeholder="Surname"/>
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input valid">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Please Input First Name"> </span>
                                                <input type="text" id="firstname" ref="firstName" placeholder="First Name"/>
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input valid">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Please Input Booking Number"> </span>
                                                <input type="text" id="bookingnumber" ref="bookingNumber" placeholder="Booking Number"/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    
                        <div className="col-md-4">
                            <form>
                                <div id="contact-form" className="form-container" data-form-container style={style2} >
                                    <div className="row">
                                        <div className="form-title">
                                            <span> Dates </span>
                                        </div>
                                    </div>
                                    <div className="input-container">
                                        <div className="row">
                                            <span className="req-input invalid" >
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Input Booking Date DD/MM/YYYY. i.e. 28/02/2017"> </span>
                                                <input type="text" data-min-length="8" id="bookingdate" ref="bookingDate" placeholder="Booking Date (2017-12-31)"/>
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input invalid">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Please Input Day Departure. i.e. 28"> </span>
                                                <input type="text" id="dayDeparture" ref="dayDeparture" placeholder="Departure Day (25)"/>
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input invalid">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Please Input Month Departure. i.e. 12"> </span>
                                                <input type="text" id="monthDeparture" ref="monthDeparture" placeholder="Departure Month (06)"/>
                                            </span>
                                        </div>
                                        <div className="row">
                                            <span className="req-input invalid">
                                                <span className="input-status" data-toggle="tooltip" data-placement="top" title="Please Input Year Departure. i.e. 2017"> </span>
                                                <input type="text" id="yearDeparture" ref="yearDeparture" placeholder="Departure Year (2017)"/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    
                    </div>

                    <div className="row" >
                        <div className="col-md-8 col-md-offset-1">
                            <button type="button" className="btn btn-success btn3d" onClick={this.handleSubmit} id="createEnd" >Book Cruise</button>
                            <button type="button" className="btn btn-delete btn3d" onClick={this.props.closeModal}> Close </button>
                        </div>
                    </div>
                </div> 
            </Modal>
        )
    }
}

export default CreateDialog;