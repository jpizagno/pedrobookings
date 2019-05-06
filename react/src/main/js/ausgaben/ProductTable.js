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
        return (
            <ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>
        )
      });

      return (
        <div>
          <div className="row">
            <div className="col">
              <button type="button" onClick={this.props.onRowAdd} className="btn btn-success">Add</button>
            </div>
            <div className="col">
              <button type="button" onClick={this.props.onGenerateReport} className="btn btn-success">Report</button>
            </div>
          </div>

          <div className="row">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Month/Jahr</th>
                  <th scope="col">Einnahme Netto</th>
                  <th scope="col">Einnahme Umsatz Steuer</th>
                  <th scope="col">Einnahme Brutto</th>
                  <th scope="col">Ausgabe-Telefon</th>
                  <th scope="col">Ausgabe-Porto</th>
                  <th scope="col">Ausgabe-TUI</th>
                  <th scope="col">Ausgabe-Buero Material</th>
                  <th scope="col">Ausgabe Sonstiges</th>
                  <th scope="col">Ausgabe-Kosten-Netto</th>
                  <th scope="col">19% Umsatz Steuer</th>
                  <th scope="col">Gesamt-Kosten-Brutto</th>
                  <th scope="col">Einnahme Nachkosten Netto</th>
                </tr>
              </thead>

              <tbody>
                {product}
              </tbody>
            </table>
          </div>


        </div>
      );
  
    }
  
  }

  export default  ProductTable;