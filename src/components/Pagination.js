import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import { Grid, Row, Col, PageHeader, Pagination  } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class Catalog extends Component {
    render() {
        return(
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        );
    }
}

export default Catalog;