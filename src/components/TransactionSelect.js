import React, { Component } from 'react';
import Featured from './Featured';
import CartDetail from './CartDetail';
import { Grid, Row, Col, PageHeader, Button, Table, Panel } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

class TransactionSelect extends Component {
    render() {
        console.log('kepanggil disini')
        return (
            <Row>
                <Col md={1}>{this.props.index}</Col>
                <Col md={7}>
                    <Row>
                        <span style={{'font-size': '20px'}}>{this.props.product}</span>
                    </Row>
                    <Row>
                        {this.props.color}, {this.props.size}
                    </Row>
                </Col>
                <Col md={2}>
                (Qty: {this.props.quantity}) 
                </Col>
                <Col md={2}>
                    <Row>
                    Price:
                    </Row>
                    <Row style={{'font-size': '22px'}}>
                    ${this.props.price}
                    </Row>
                </Col>
            </Row>         
        )
    }
}

export default TransactionSelect;