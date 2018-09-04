import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import Filter from './Filter';
import Pagination from './Pagination';
import StarRating from './StarRating';
import Param from './Param';
import { Grid, Row, Col, PageHeader, Button, DropdownButton, MenuItem, FormGroup, ControlLabel } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class DetailPage extends Component {
    render() {
        return(
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={8}>
                    <PageHeader>
                    Single Product
                    </PageHeader>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={4}>
                    <Carouselclass thumbs={true}/>
                </Col>
                <Col xs={4}>
                    <Row>
                    <StarRating />
                    </Row>
                    <Row>
                        <h2>Rick & Morty<br />
                        Rp. 500.000,-</h2>
                    </Row>
                    <Row>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta voluptatibus quos ea dolore rem, molestias laudantium et explicabo assumenda fugiat deserunt in, facilis laborum excepturi aliquid nobis ipsam deleniti aut? Aliquid sit hic id velit qui fuga nemo suscipit obcaecati. Officia nisi quaerat minus nulla saepe aperiam sint possimus magni veniam provident.</p>
                    </Row>
                    <Row>
                        <Col xs={4}><Param title="Size" param="40" param2="41" param3="42" /></Col>
                        <Col xs={4}><Param title="Color" param="Red" param2="Green" param3="Blue" /></Col>
                        <Col xs={4}><Param title="Quantity" param="1" param2="2" param3="3" /></Col>                      
                    </Row>
                    <Row>
                        <p>SKU: #21457832<br />
                        Categories: Men’s shoes, Snickers, Sport shoes</p>
                        <hr />
                    </Row>
                    <Row>
                        <Button bsStyle="primary" className="detailButton">ADD TO CART</Button>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                <hr />
                <h3 align="center">Featured Products</h3>
                <br />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                </Col>
                <Col xs={2}>
                    <Featured thumbImg={rick} />
                </Col>
                <Col xs={2}>
                    <Featured thumbImg={rick} />
                </Col>
                <Col xs={2}>
                    <Featured thumbImg={rick} />
                </Col>
                <Col xs={2}>
                    <Featured thumbImg={rick} />
                </Col>
            </Row>
            <hr />
        </Grid>
        );
    }
}

export default DetailPage;