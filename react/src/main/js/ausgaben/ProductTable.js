const React = require('react');

import ProductRow from './ProductRow.js';
  
class ProductTable extends React.Component {
  
    render() {
      var onProductTableUpdate = this.props.onProductTableUpdate;
      var rowDel = this.props.onRowDel;
      var filterText = this.props.filterText;
      var product = this.props.products.map(function(product) {
        if (product.month_jahr.indexOf(filterText) === -1) {
          return;
        }
        return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
      });
      return (
        <div>
  
  
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Month/Jahr</th>
                <th>Einnahme Netto</th>
                <th>Einnahme Umsatz Steuer</th>
                <th>Einnahme Brutto</th>
                <th>Ausgabe-Telefon</th>
                <th>Ausgabe-Porto</th>
                <th>Ausgabe-TUI</th>
                <th>Ausgabe-Buero Material</th>
                <th>Ausgabe Sonstiges</th>
                <th>Ausgabe-Kosten-Netto</th>
                <th>19% Umsatz Steuer</th>
                <th>Gesamt-Kosten-Brutto</th>
                <th>Einnahme Nachkosten Netto</th>
              </tr>
            </thead>
  
            <tbody>
              {product}
  
            </tbody>
  
          </table>
        </div>
      );
  
    }
  
  }

  export default  ProductTable;