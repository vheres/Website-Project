import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import Filter from './Filter';
import Pagination from './Pagination';
import Rating from 'react-rating';
import { Grid, Row, Col, PageHeader, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class ParamwLabel extends Component {
    render() {
        return(
            <FormGroup controlId="formControlsSelect">
                    <FormControl componentClass="select" placeholder="select">
                        <option value={this.props.param}>{this.props.param}</option>
                        <option value={this.props.param2}>{this.props.param2}</option>
                        <option value={this.props.param3}>{this.props.param3}</option>
                    </FormControl>
            </FormGroup>
        );
    }
}

export default ParamwLabel;