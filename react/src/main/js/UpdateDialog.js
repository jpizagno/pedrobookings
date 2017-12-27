const React = require('react');
const ReactDOM = require('react-dom')

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
        window.location.reload();
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

export default UpdateDialog;

