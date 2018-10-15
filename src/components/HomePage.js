import React, { Component } from 'react';
import Carouselclass from './Carousel';
import NavJustified from './NavJustified';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import FeaturedCarousel from './FeaturedCarousel';
import { Grid, Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import pict1 from '../assets/img/banners/home01.jpg';
import pict2 from '../assets/img/gallery/06.jpg';
import pict3 from '../assets/img/banners/home03.jpg';

class HomePage extends Component {
    render() {
        return(
        <Grid fluid>
            <Row className="homepage-css">
                    <Row className="show-grid">
                        <Col xs={12} >
                            <Carouselclass thumbs={false} img1="http://www.toprelocators.co.uk/includes/templates/lliefjwe/images/banner.jpg" img2="http://www.toprelocators.co.uk/includes/templates/lliefjwe/images/banner.jpg" img3="http://www.toprelocators.co.uk/includes/templates/lliefjwe/images/banner.jpg" percentage={100}/>
                        </Col>
                    </Row>

                    <Row className="homepage-main-button-container">
                        <Col xs={1}>
                        </Col>
                        <Col xs={5} >
                            <Link to ="/" className="main-button-holder"><img src={pict1} style={{width:"100%"}}></img><div className="main-button-overlay"></div></Link>
                        </Col>
                        <Col xs={5} >
                            <Link to ="/" className="main-button-holder"><img src={pict2} style={{width:"100%"}}></img><div className="main-button-overlay"></div></Link>
                        </Col>
                    </Row>
                    <Row className="margin-top-15 margin-bottom-15">
                        <Col xs={1}>
                        </Col>
                        <Col xs={10} >
                            <Link to ="/" className="main-button-holder"><img src={pict3} style={{width:"100%"}}></img><div className="main-button-overlay"></div></Link>
                        </Col>
                    </Row>
                    <Row className="featured-container">
                        <Row>
                            <Col xs={12}>
                                <h1 className="text-center">Featured Products</h1>
                                <div className="pointer featured-pointer"></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xsOffset={1} xs={10}>
                                <FeaturedCarousel></FeaturedCarousel>
                            </Col>
                        </Row>
                    </Row>
            </Row>

            <Row className="show-grid">
                <SubFooter />
            </Row>
            
        </Grid>
        );
    }
}

export default HomePage;