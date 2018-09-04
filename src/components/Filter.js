import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import { Grid, Row, Col, PageHeader, Pagination, Button  } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class Filter extends Component {
    render() {
        return(
            <Grid fluid>
                <Row className="show-grid">
                    <Col xs={12}>
                        <h4>SHOP CATEGORIES</h4>
                        <hr />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12}>
                        <CategoryFilter />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12}>
                        <h4>PRICE RANGE</h4>
                        <hr />
                    </Col>
                </Row>
                <Row className="show-grid">
                    
                </Row>
                <Row className="show-grid">
                    <Col xs={12}>
                        <h4>FILTER BY BRAND</h4>
                        <hr />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12}>
                        <BrandFilter />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12}>
                        <Button bsStyle="success">FILTER</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Filter;