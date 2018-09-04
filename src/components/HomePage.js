import React, { Component } from 'react';
import Carouselclass from './Carousel';
import NavJustified from './NavJustified';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import { Grid, Row, Col  } from 'react-bootstrap';

import carouselPict1 from '../assets/img/banners/home02.jpg';
import carouselPict2 from '../assets/img/banners/home02.jpg';
import carouselPict3 from '../assets/img/banners/home02.jpg';
import pict1 from '../assets/img/banners/01.jpg';
import pict2 from '../assets/img/banners/02.jpg';
import pict3 from '../assets/img/banners/home03.jpg';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class HomePage extends Component {
    render() {
        return(
        <Grid fluid>
            <Row className="show-grid">
                    <Row className="show-grid">
                        <Col xs={12} >
                            <Carouselclass thumbs={false} img1={carouselPict1} img2={carouselPict2} img3={carouselPict3} percentage={100}/>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1}>
                        </Col>
                        <Col xs={5} >
                            <LinkedImage thumbImg={pict1}/>
                        </Col>
                        <Col xs={5} >
                            <LinkedImage thumbImg={pict2}/>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1}>
                        </Col>
                        <Col xs={10} >
                            <LinkedImage thumbImg={pict3}/>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={4}>
                        </Col>
                        <Col xs={4}>
                            <h1>Featured Products</h1>
                        </Col>
                    </Row>
                    <Row className="show-grid">
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

            </Row>

            <Row className="show-grid">
                <SubFooter />
            </Row>
            
        </Grid>
        );
    }
}

export default HomePage;