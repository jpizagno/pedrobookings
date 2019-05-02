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
          category: 'Sporting Goods',
          price: 49.99,
          qty: 12.,
          total: 49.99*12.,
          name: 'football'
        }, {
          id: 2,
          category: 'Sporting Goods',
          price: 9.99,
          qty: 15.,
          total: 9.99*15., 
          name: 'baseball'
        }, {
          id: 3,
          category: 'Sporting Goods',
          price: 29.99,
          qty: 14.,
          total: 29.99*14.,
          name: 'basketball'
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

              // update Total if needed
              if (item.name == "price" ) {
                var price = item.value;
                product.total = product.qty * price;
              }
              if (item.name == "qty" ) {
                var qty = item.value;
                product.total = qty * product.price;
              }
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
