const React = require('react');

class EditableCell extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.isMainCell ) {
      return (
        <th scope="row">
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
        </th>
      );
    } else {
      return (
        <td>
          <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
        </td>
      );
    }
  }
  
  }

  export default EditableCell;