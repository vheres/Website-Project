import React, { Component } from 'react';
import Featured from './Featured';
import CartDetail from './CartDetail';
import { Grid, Row, Col, PageHeader, Button, Table } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

class TransactionDetail extends Component {
    parseDate() {
        var d = this.props.date.split(``);
        var temp = new Array();
        for (var i = 0; i < 10; i++) {
            temp.push(d[i])
        }
        d = temp.join(``)
        d = d.split('-')
        d[2]++;
        d = d.join('-')
        return d;
    }

    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.parseDate()}</td>
                <td>{this.props.time}</td>
                <td>{this.props.total_price}</td>
                <td>{this.props.children}</td>
            </tr>
        )
    }
}
// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default TransactionDetail;