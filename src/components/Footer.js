import React, { Component } from 'react';
import { Image, Grid, Row, Col, Button, FormControl  } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class Footer extends Component {
    render() {
        return (
            <Grid fluid>
                <Row className="show-grid">
                    <Col xs={2} >
                    </Col>
                    <Col xs={2} >
                        <h3>GET IN TOUCH WITH US</h3>
                        <hr />
                        Phone: 012 3456 7891<br /><br />
                        Monday-Friday: 9.00 am - 8.00 pm<br />
                        Saturday: 10.00 am - 6.00 pm<br /><br />
                        support@couland.com
                    </Col>
                    <Col xs={2} >
                        <h3>OUR MOBILE APP</h3>
                        <hr />
                    </Col>
                    <Col xs={2} >
                        <h3>ABOUT US</h3>
                        <hr />
                        <a href='#'>Carrers</a><br />
                        <a href='#'>About Unishop</a><br />
                        <a href='#'>Our Story</a><br />
                        <a href='#'>Services</a><br />
                        <a href='#'>Our Blog</a>
                    </Col>
                    <Col xs={2} >
                        <h3>ACCOUNT INFO</h3>
                        <hr />
                        <a href='#'>Your Account</a><br />
                        <a href='#'>Shipping Rates & Policies</a><br />
                        <a href='#'>Refunds & Replacements</a><br />
                        <a href='#'>Taxes</a><br />
                        <a href='#'>Delivery Info</a><br />
                        <a href='#'>Affiliate Program</a>
                    </Col>
                </Row>
                
                <hr />

                <Row className="show-grid">
                    <Col xs={2}>
                    </Col>
                    <Col xs={1}>
                        <Image src={rick3} circle responsive />
                    </Col>
                    <Col xs={1}>
                        <Image src={rick3} circle responsive />
                    </Col>
                    <Col xs={1}>
                        <Image src={rick3} circle responsive />
                    </Col>
                    <Col xs={1}>
                        <Image src={rick3} circle responsive />
                    </Col>
                    <Col xs={4}>
                        <Grid fluid>
                            <Row className="show-grid">
                                <Col xs={10}>
                                <FormControl type="email" placeholder="Email" />
                                </Col>
                                <Col xs={2}>
                                <Button bsStyle="info">SUBSCRIBE!</Button>
                                </Col>
                            </Row>
                            <Row className="show-grid">
                                <Col xs={12}>
                                <br />
                                <p>Subscribe to our Newsletter to receive early discount offers, latest news, sales and promo information.</p>
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Row>

                <hr />

                </Grid>
        );
    }
}

export default Footer;