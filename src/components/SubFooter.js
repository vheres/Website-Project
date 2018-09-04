import React, { Component } from 'react';
import { Image, Grid, Row, Col  } from 'react-bootstrap';

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
            <Grid fluid>

                <hr />

                <Row className="show-grid">
                    <Col xs={12} >
                    <Image src={rick2} responsive />
                    </Col>
                </Row>

                <hr />

                <Row className="show-grid">
                    <Col xs={2} >
                    </Col>
                    <Col xs={2} >
                        <Image src={img1} circle responsive />
                    </Col>
                    <Col xs={2} >
                        <Image src={img2} circle responsive />
                    </Col>
                    <Col xs={2} >
                        <Image src={img3} circle responsive />
                    </Col>
                    <Col xs={2} >
                        <Image src={img4} circle responsive />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={2} >
                    </Col>
                    <Col xs={2} >
                        <h3 align="center">Title</h3>
                        <p align="center">Description</p>
                    </Col>
                    <Col xs={2} >
                        <h3 align="center">Title</h3>
                        <p align="center">Description</p>
                    </Col>
                    <Col xs={2} >
                        <h3 align="center">Title</h3>
                        <p align="center">Description</p>
                    </Col>
                    <Col xs={2} >
                        <h3 align="center">Title</h3>
                        <p align="center">Description</p>
                    </Col>
                </Row>

                <hr />

                </Grid>
        );
    }
}

export default SubFooter;