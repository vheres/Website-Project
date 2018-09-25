import React, { Component } from 'react';
import ParamwLabel from './ParamwLabel';
import { Row, Col, Image } from 'react-bootstrap';

class CartDetail extends Component {
    render() {
        return(
            <Row>
                <Col xs={2}>
                    <Image src={this.props.Link} rounded responsive />
                </Col>
                <Col xs={4}>
                    {this.props.Name}
                    {this.props.Description}<br />
                    {this.props.Category}<br />
                </Col>
                <Col xs={2}>
                    <ParamwLabel param="1" param2="2" param3="3" />
                </Col>
                <Col xs={2}>
                    <h5 align="center">{this.props.Price}</h5>
                </Col>
                <Col xs={2}>
                    <h5 align="center">X</h5>
                </Col>
            </Row>
        );
    }
}

export default CartDetail;