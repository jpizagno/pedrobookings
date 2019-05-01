
const React = require('react');

class AppAusgaben extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table id="DataTable">
                    <tbody>
                        <tr>
                            <th>Month/jahr</th>							
                            <th>Einnahme Netto</th>
                            <th>Einnahme UmsatzSteuer</th>
                            <th>Einnahme Brutto </th>
                            <th>Ausgabe-Telefon</th> 
                            <th>Ausgabe-Porto</th>
                            <th>Ausgabe TUI</th>
                            <th>Ausgabe Buro Material</th>
                            <th>Ausgabe Sonstiges</th>
                            <th>Gesamt-Kosten-Netto</th>
                            <th>19% UmsatzSteuer</th>
                            <th>Gesamt-Kosten-Brutto</th>
                            <th>Einnahme Nachkosten Netto</th>		
                        </tr>
                        <tr>
                            <th>01-2018</th>				
                            <th>100</th>		
                            <th>19</th>
                            <th>119</th>
                            <th>9.67</th>
                            <th>9.67</th> 
                            <th>9.67</th>
                            <th>9.67</th>
                            <th>9.67</th>
                            <th>9.67 * 5</th>
                            <th>9.67 * 5 * 0.19</th>
                            <th>9.67 * 5 * 1.19</th>
                            <th>119 - 9.67 * 5 * 1.19</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default AppAusgaben;