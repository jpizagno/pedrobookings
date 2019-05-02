const React = require('react');
import Modal from 'react-responsive-modal';

class ModalSearchBookingNumber extends React.Component {

    constructor(props) {
        super(props);
        this.filterOn = this.filterOn.bind(this);
        this.filterOff = this.filterOff.bind(this);
    }

    filterOn(e) {
        e.preventDefault();
        this.props.setFilterStateBookingNumberOn(e);
        this.props.onCloseModalFilterBookingNumber();
    }

    filterOff(e) {
        e.preventDefault();
        this.props.setFilterStateBookingNumberOff(e);
        this.props.onCloseModalFilterBookingNumber();
    }

    render() {
        return (
            <Modal open={this.props.modalFilterBookingNumber} onClose={this.props.onCloseModalFilterBookingNumber} little>
                <div>
                    <div>
                        <h2>Filter by Boooking Number</h2>

                        <form>
                            <p key="booking_numeber_id">
                                <input type="text" placeholder="booking number" ref="booking_numeber_id" className="field" onChange={this.props.updateBookingNumberFilter}/>
                            </p>
                            <button onClick={this.filterOn}>Filter On</button>
                            <button onClick={this.filterOff}>Filter Off</button>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }


}

export default ModalSearchBookingNumber;