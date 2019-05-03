const React = require('react');

import ProductTable from './ProductTable.js';
import SearchBar from './SearchBar.js';

class AppAusgaben extends React.Component {

    constructor(props) {
      super(props);

      this.state = {};
      this.state.filterText = "";
      this.state.products = [
        {
          id: 1,
          month_jahr: 01-2019,
          einnahme_netto:  100.0,
          einnahme_steuer: 0.19*100.0 ,
          einnahme_brutto: 1.19*100.0, 
          ausgabe_telefon: 9.67,
          ausgabe_porto: 9.67,
          ausgabe_tui: 0,
          ausgabe_buero_material: 07,
          ausgabe_sonstiges: 0,
          ausgabe_kosten_netto: 2.*9.67,
          ausgabe_umsatz_steuer: 0.19*2*9.67,
          gesamt_kosten_brutto: 1.19*2*9.67,
          einnahme_nachkosten_netto: 119 - 1.19*2*9.6
        }, 
        {
          id: 2,
          month_jahr: 02-2019,
          einnahme_netto:  100.0,
          einnahme_steuer: 0.19*100.0 ,
          einnahme_brutto: 1.19*100.0, 
          ausgabe_telefon: 9.67,
          ausgabe_porto: 9.67,
          ausgabe_tui: 9.67,
          ausgabe_buero_material: 9.67,
          ausgabe_sonstiges: 9.67,
          ausgabe_kosten_netto: 5.*9.67,
          ausgabe_umsatz_steuer: 0.19*5*9.67,
          gesamt_kosten_brutto: 1.19*5*9.67,
          einnahme_nachkosten_netto: 119 - 1.19*5*9.6
        },{
          id: 3,
          month_jahr: 03-2019,
          einnahme_netto:  60.0,
          einnahme_steuer: 0.19*60.0 ,
          einnahme_brutto: 1.19*60.0, 
          ausgabe_telefon: 10.0,
          ausgabe_porto: 25.0,
          ausgabe_tui: 0,
          ausgabe_buero_material: 0,
          ausgabe_sonstiges: 0,
          ausgabe_kosten_netto: 5.*9.67,
          ausgabe_umsatz_steuer: 0.19*5*9.67,
          gesamt_kosten_brutto: 1.19*5*9.67,
          einnahme_nachkosten_netto: 119 - 1.19*5*9.6
        }
      ];
  
    }
    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };
    handleRowDel(product) {
      var index = this.state.products.indexOf(product);
      this.state.products.splice(index, 1);
      this.setState(this.state.products);
    };
  
    handleAddEvent(evt) {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var product = {
        id: id,
        name: "",
        price: 0,
        category: "",
        qty: 0
      }
      product.total = product.qty * product.price;
      this.state.products.push(product);
      this.setState(this.state.products);
    }
  
    handleProductTable(evt) {
      var item = {
        id: evt.target.id,
        name: evt.target.name,
        value: evt.target.value
      };
      var products = this.state.products.slice();
      var newProducts = products.map(function(product) {
  
        for (var key in product) {
            if (key == item.name && product.id == item.id) {
              product[key] = item.value;

              if (item.name == "einnahme_netto" ) {
                product.einnahme_steuer = item.value * 0.19;
                product.einnahme_brutto = item.value * 1.19;
                product.einnahme_nachkosten_netto = item.value*1.19 - product.gesamt_kosten_brutto;
              }
              if (item.name == "ausgabe_telefon" ) {
                product.ausgabe_kosten_netto = item.value + product.ausgabe_porto + product.ausgabe_tui + product.ausgabe_buero_material + product.ausgabe_sonstiges;
              }
              if (item.name == "ausgabe_porto" ) {
                product.ausgabe_kosten_netto = product.ausgabe_telefon + item.value + product.ausgabe_tui + product.ausgabe_buero_material + product.ausgabe_sonstiges;
              }
              if (item.name == "ausgabe_tui" ) {
                product.ausgabe_kosten_netto = product.ausgabe_telefon + product.ausgabe_porto + item.value + product.ausgabe_buero_material + product.ausgabe_sonstiges;
              }
              if (item.name == "ausgabe_buero_material" ) {
                product.ausgabe_kosten_netto = product.ausgabe_telefon + product.ausgabe_porto + product.ausgabe_tui + item.value + product.ausgabe_sonstiges;
              }
              if (item.name == "ausgabe_sonstiges" ) {
                product.ausgabe_kosten_netto = product.ausgabe_telefon + product.ausgabe_porto + product.ausgabe_tui + product.ausgabe_buero_material + item.value;
              }
              product.ausgabe_umsatz_steuer = product.ausgabe_kosten_netto * 0.19;
              product.gesamt_kosten_brutto = product.ausgabe_kosten_netto * 1.19;
              product.einnahme_nachkosten_netto = product.einnahme_brutto - product.gesamt_kosten_brutto;
            }
        }
        return product;
      });
      this.setState({products:newProducts});
    };

    render() {
  
      return (
        <div>
          <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
          <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  
export default AppAusgaben;
