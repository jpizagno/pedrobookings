//import Booking from './Booking.jsx';

define([
    "react",
    "jsx!Booking"
  ], function(
    React,
    Booking
  ) {
    return React.createClass({
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
    
                    <table id="DataTable">
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
                                <th>booking date</th>
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
    });
});
