import React, { Component } from 'react';
import { Image, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import BrandCarousel from './BrandCarousel';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';
import img1 from '../assets/img/services/01.png';
import img2 from '../assets/img/services/02.png';
import img3 from '../assets/img/services/03.png';
import img4 from '../assets/img/services/04.png';

class SubFooter extends Component {
    render() {
        return (
            <Grid fluid className="subFooter-css">
                <Row className="background-white">
                    <Row>
                        <Col xs={12}>
                            <h1 className="text-center">Our Brands</h1>
                            <div className="pointer featured-pointer"></div>
                        </Col>
                    </Row>
                    <Row className="margin-bottom-30">
                        <Col xsOffset={3} xs={6}>
                            <BrandCarousel></BrandCarousel>
                        </Col>
                    </Row>
                </Row>
                <Row className="margin-top-30 margin-bottom-30">
                    <Col xsOffset={0} xs={12} mdOffset={1} md={10} lgOffset={2} lg={8} >
                        <Col xs={6} lg={3} >
                            <Image className="subFooter-image" src={img1} style={{width:"50%"}} circle style={{width: '150px'}} />
                            <h3 className="text-center">Free Worldwide Shipping</h3>
                            <p className="text-center">Free shipping for all orders over $300</p>
                        </Col>
                        <Col xs={6} lg={3} >
                            <Image className="subFooter-image" src={img2} style={{width:"50%"}} circle style={{width: '150px'}} />
                            <h3 className="text-center">Money Back Guarantee</h3>
                            <p className="text-center">We return money within 30 days</p>
                        </Col>
                        <Clearfix visibleMdBlock visibleXsBlock>
                        </Clearfix>
                        <Col xs={6} lg={3} >
                            <Image className="subFooter-image" src={img3} style={{width:"50%"}} circle style={{width: '150px'}} />
                            <h3 className="text-center">24/7 Customer Support</h3>
                            <p className="text-center">Friendly 24/7 customer support</p>
                        </Col>
                        <Col xs={6} lg={3} >
                            <Image className="subFooter-image" src={img4} style={{width:"50%"}} circle style={{width: '150px'}} />
                            <h3 className="text-center">Secure Online Payment</h3>
                            <p className="text-center">We posess SSL / Secure Certificate</p>
                        </Col>
                    </Col>
                </Row>
                </Grid>
        );
    }
}

export default SubFooter;