const React = require('react');

class SearchBar extends React.Component {
    handleChange() {
      this.props.onUserInput(this.refs.filterTextInput.value);
    }
    render() {
      return (
        <div>
          <div className="row">
            <div className="col">
              <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
        </div>
  
      );
    }
  
  }

  export default SearchBar;