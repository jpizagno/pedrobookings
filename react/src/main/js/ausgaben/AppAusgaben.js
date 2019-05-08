const React = require('react');

import ProductTable from './ProductTable.js';
import SearchBar from './SearchBar.js';

class AppAusgaben extends React.Component {

    constructor(props) {
      super(props);

      this.state = {};
      this.state.filterText = "";
      this.state.shouldGoToReportUrl = false;
      this.state.products = [];
    }

    componentDidMount() {
        this.loadFromServer();
    };

    loadFromServer() {
        let url = "http://" + window.location.hostname + ':8092/getausgaben';
        fetch(url, {
            credentials: 'same-origin',
            method:'GET',
            headers: {Accept: 'application/json' },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
          }
        )
        .then(response => response.json())
        .then(json => {
            console.log("*** loadfromServer json = " + json);
            this.setState({ products: json });
        })
    }

    handleUserInput(filterText) {
      this.setState({filterText: filterText});
    };

    handleRowDel(product) {
        let url = "http://" + window.location.hostname + ':8092/deleteausgaben';
        fetch(url, {
            credentials: 'same-origin',
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
              redirect: "follow", // manual, *follow, error
              referrer: "no-referrer", // no-referrer, *client
              body: JSON.stringify(product), // body data type must match "Content-Type" header
           }
        )

        var index = this.state.products.indexOf(product);
        this.state.products.splice(index, 1);
        this.setState(this.state.products);
    };
  
    handleAddEvent(evt) {
      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var product = {
        id: id,
        month_jahr: "00-2019",
        einnahme_netto:  parseFloat(0.0),
        einnahme_steuer: parseFloat(0.0),
        einnahme_brutto: parseFloat(0.0), 
        ausgabe_telefon: parseFloat(0.0),
        ausgabe_porto: parseFloat(0.0),
        ausgabe_tui: parseFloat(0.0),
        ausgabe_buero_material: parseFloat(0.0),
        ausgabe_sonstiges: parseFloat(0.0),
        ausgabe_kosten_netto: parseFloat(0.0),
        ausgabe_umsatz_steuer: parseFloat(0.0),
        gesamt_kosten_brutto: parseFloat(0.0),
        einnahme_nachkosten_netto: parseFloat(0.0)
      }
      this.state.products.push(product);
      this.setState(this.state.products);
    };

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
                product.einnahme_steuer = parseFloat(item.value) * 0.19;
                product.einnahme_brutto = parseFloat(item.value) * 1.19;
                product.einnahme_nachkosten_netto = parseFloat(item.value)*1.19 - parseFloat(product.gesamt_kosten_brutto);
              }
              if (item.name == "ausgabe_telefon" ) {
                product.ausgabe_kosten_netto = parseFloat(item.value) + parseFloat(product.ausgabe_porto) + parseFloat(product.ausgabe_tui) + parseFloat(product.ausgabe_buero_material) + parseFloat(product.ausgabe_sonstiges);
              }
              if (item.name == "ausgabe_porto" ) {
                product.ausgabe_kosten_netto = parseFloat(product.ausgabe_telefon) + parseFloat(item.value) + parseFloat(product.ausgabe_tui) + parseFloat(product.ausgabe_buero_material) + parseFloat(product.ausgabe_sonstiges);
              }
              if (item.name == "ausgabe_tui" ) {
                product.ausgabe_kosten_netto = parseFloat(product.ausgabe_telefon) + parseFloat(product.ausgabe_porto) + parseFloat(item.value) + parseFloat(product.ausgabe_buero_material) + parseFloat(product.ausgabe_sonstiges);
              }
              if (item.name == "ausgabe_buero_material" ) {
                product.ausgabe_kosten_netto = parseFloat(product.ausgabe_telefon) + parseFloat(product.ausgabe_porto) + parseFloat(product.ausgabe_tui) + parseFloat(item.value) + parseFloat(product.ausgabe_sonstiges);
              }
              if (item.name == "ausgabe_sonstiges" ) {
                product.ausgabe_kosten_netto = parseFloat(product.ausgabe_telefon) + parseFloat(product.ausgabe_porto) + parseFloat(product.ausgabe_tui) + parseFloat(product.ausgabe_buero_material) + parseFloat(item.value);
              }
              product.ausgabe_umsatz_steuer = parseFloat(product.ausgabe_kosten_netto) * 0.19;
              product.gesamt_kosten_brutto = parseFloat(product.ausgabe_kosten_netto) * 1.19;
              product.einnahme_nachkosten_netto = parseFloat(product.einnahme_netto) - parseFloat(product.ausgabe_kosten_netto);
            }
        }
        return product;
      });
      this.setState({products:newProducts});
    };

    goToReportUrl() {
        window.location = "reportausgaben";
        this.setState({ shouldGoToReportUrl: false });
    };

	generateReport() {
        this.setState({ shouldGoToReportUrl: true });
        this.onPersist();
	};

    // On Persist will persist the current Ausgaben (report will always be generated on backend).
    // If this.state.shouldGoToReportUrl==true, then the current page will be redirected to the Report URL.
	onPersist() {
        let url = "http://" + window.location.hostname + ':8092/ausgaben';
		fetch(url, {
			credentials: 'same-origin',
			method:'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
             redirect: "follow", // manual, *follow, error
             referrer: "no-referrer", // no-referrer, *client
             body: JSON.stringify(this.state.products), // body data type must match "Content-Type" header
	       }
	    )
		.then(response => response.json())
		.then(json => {
		    if (this.state.shouldGoToReportUrl) {
                // Set redirect to URl of Report
                this.setState({reportUrl: json.url }, function () {
                    this.goToReportUrl();
                });
		    }
		})
	};

    render() {
      return (
        <div>
          <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
          <ProductTable onPersist={this.onPersist.bind(this)} onGenerateReport={this.generateReport.bind(this)} onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
        </div>
      );
  
    }
  
  }
  
export default AppAusgaben;
