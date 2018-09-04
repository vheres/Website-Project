import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import Filter from './Filter';
import Pagination from './Pagination';
import StarRating from './StarRating';
import ParamwLabel from './ParamwLabel';
import Param from './Param';
import { Grid, Row, Col, PageHeader, Button, DropdownButton, MenuItem, FormGroup, ControlLabel, Image } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

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