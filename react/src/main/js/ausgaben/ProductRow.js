const React = require('react');

import EditableCell from './EditableCell.js';

class ProductRow extends React.Component {
    onDelEvent() {
    this.props.onDelEvent(this.props.product);

    }
    render() {

        return (
            <tr className="eachRow">
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                "type": "month_jahr",
                value: this.props.product.month_jahr,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "einnahme_netto",
                value: this.props.product.einnahme_netto,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "einnahme_steuer",
                value: this.props.product.einnahme_steuer,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "einnahme_brutto",
                value: this.props.product.einnahme_brutto,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "ausgabe_telefon",
                value: this.props.product.ausgabe_telefon,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "ausgabe_porto",
                value: this.props.product.ausgabe_porto,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "ausgabe_tui",
                value: this.props.product.ausgabe_tui,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "ausgabe_buero_material",
                value: this.props.product.ausgabe_buero_material,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "ausgabe_sonstiges",
                value: this.props.product.ausgabe_sonstiges,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "ausgabe_kosten_netto",
                value: this.props.product.ausgabe_kosten_netto,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "ausgabe_umsatz_steuer",
                value: this.props.product.ausgabe_umsatz_steuer,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "gesamt_kosten_brutto",
                value: this.props.product.gesamt_kosten_brutto,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "einnahme_nachkosten_netto",
                value: this.props.product.einnahme_nachkosten_netto,
                id: this.props.product.id
            }}/>
            <td className="del-cell">
                <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
            </td>
            </tr>
        );

    }

}

export default ProductRow;