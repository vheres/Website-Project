import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import { Grid, Row, Col, PageHeader, Pagination, Button, Tab, Nav, NavItem, FormGroup, Checkbox  } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class BrandFilter extends Component {
    render() {
        return(
            <form>
                <FormGroup>
                    <Checkbox>Uniqlo</Checkbox>
                    <Checkbox>H&M</Checkbox>
                    <Checkbox>Pull&Bear</Checkbox>
                    <Checkbox>The Executive</Checkbox>
                    <Checkbox>Zara</Checkbox>
                    <Checkbox>Topman</Checkbox>
                </FormGroup>
            </form>
        );
    }
}

export default BrandFilter;