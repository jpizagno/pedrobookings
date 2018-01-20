import UpdateDialog from './UpdateDialog.jsx';

define([
    "react"
  ], function(
    React
  ) {

    return React.createClass({

        handleDelete: function() {
            this.props.onDelete(this.props.booking);
        },

        render: function() {

            var id = "deleteSelectedBooking" + this.props.booking.entity.kreuzfahrt;

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
                    <td>{this.props.booking.entity.bookingDate.substring(0,19)}</td>
                    <td>{this.props.booking.entity.manager.name}</td>
                    <td>
                        <UpdateDialog booking={this.props.booking}
                                        attributes={this.props.attributes}
                                        onUpdate={this.props.onUpdate}/>
                        </td>
                    <td>
                        <button type="button" className="btn btn-delete btn3d" id={id} onClick={this.handleDelete} >Delete</button>
                    </td>
                </tr>
            )
        }
    });
});
