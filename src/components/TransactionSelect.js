import React, { Component } from 'react';
import Featured from './Featured';
import CartDetail from './CartDetail';
import { Grid, Row, Col, PageHeader, Button, Table } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

class TransactionSelect extends Component {
    render() {
        console.log('kepanggil disini')
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.transaction_id}</td>
                <td>{this.props.product}</td>
                <td>{this.props.color}</td>
                <td>{this.props.size}</td>
                <td>{this.props.quantity}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
}

export default TransactionSelect;