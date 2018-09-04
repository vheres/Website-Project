import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import Filter from './Filter';
import Pagination from './Pagination';
import Rating from 'react-rating';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class StarRating extends Component {
    render() {
        return(
            <div>
            <Rating
                emptySymbol="fa fa-star-o"
                fullSymbol="fa fa-star"
                fractions={2}
            />
            <span> 4.2 | 3 customer reviews</span>
            </div>
        );
    }
}

export default StarRating;