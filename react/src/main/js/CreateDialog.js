const React = require('react');
const ReactDOM = require('react-dom')

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
                    <input type="text" placeholder={ (attribute=='bookingDate') ? 'yyyy-MM-dd Booking Date' : attribute } ref={attribute} className="field" />
                </p>
        );
        return (

                <div id="createBooking" className="modalDialog" >
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new booking</h2>

                        <form>
                            {inputs}
                            <button type="button" onClick={this.handleSubmit} id="createEnd" >Create</button>
                        </form>
                    </div>
                </div >
        )
    }
}

export default CreateDialog;