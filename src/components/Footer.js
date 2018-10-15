import React, { Component } from 'react';
import { Image, Grid, Row, Col, Button, FormControl  } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class Footer extends Component {
    render() {
        return (
            <Grid fluid className="footer-css">
                <Row className="show-grid">
                    <Col xs={2} >
                    </Col>
                    <Col xs={2} >
                        <h3>GET IN TOUCH</h3>
                        <div className="pointer"></div>
                        <p className="dark-text"><strong>Phone: 012 3456 7891</strong></p>
                        <span className="dark-text"><strong>Monday-Friday: </strong></span><span className="white-text">9.00 am - 8.00 pm</span><br/>
                        <span className="dark-text"><strong>Saturday: </strong></span><span className="white-text">10.00 am - 6.00 pm</span><br/><br/>
                        <p className="dark-text"><strong>support@boots.com</strong></p>
                    </Col>
                    <Col xs={2} >
                        <h3>OUR MOBILE APP</h3>
                        <div className="pointer"></div>
                    </Col>
                    <Col xs={2} >
                        <h3>ABOUT US</h3>
                        <div className="pointer"></div>
                        <ul>
                            <li><a href='#' className="dark-link"><strong>Carrers</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>About Unishop</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>Our Story</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>Services</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>Our Blog</strong></a></li>
                        </ul> 
                    </Col>
                    <Col xs={2} >
                        <h3>ACCOUNT INFO</h3>
                        <div className="pointer"></div>
                        <ul>
                            <li><a href='#' className="dark-link"><strong>Your Account</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>Shipping Rates & Policies</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>Refunds & Replacements</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>Taxes</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>Delivery Info</strong></a></li>
                            <li><a href='#' className="dark-link"><strong>Affiliate Program</strong></a></li>
                        </ul>
                    </Col>
                </Row>
                <hr/>
                <Row className="show-grid">
                    <Col xs={2}>
                    </Col>
                    <Col xs={1}>
                        <Image src="https://cdn4.iconfinder.com/data/icons/e-commerce-5/512/Credit_Card-3-512.png" responsive />
                    </Col>
                    <Col xs={1}>
                        <Image src="https://cdn1.iconfinder.com/data/icons/simplicity-payment-methods/512/visa-512.png" responsive />
                    </Col>
                    <Col xs={1}>
                        <Image src="https://cdn1.iconfinder.com/data/icons/simplicity-payment-methods/512/mastercard-512.png" responsive />
                    </Col>
                    <Col xs={1}>
                        <Image src="https://cdn1.iconfinder.com/data/icons/simplicity-payment-methods/512/maestro-512.png" responsive />
                    </Col>
                    <Col xs={4}>
                        <Grid fluid>
                            <Row className="show-grid">
                                <Col xs={10}>
                                <FormControl type="email" placeholder="Email" />
                                </Col>
                                <Col xs={2}>
                                <input type="button" value="SUBSCRIBE!" className="btn btn-danger"></input>
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
                </Grid>
        );
    }
}

export default Footer;