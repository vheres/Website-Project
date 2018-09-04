import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import { Grid, Row, Col, PageHeader, Pagination, Button, Tab, Nav, NavItem  } from 'react-bootstrap';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class CategoryFilter extends Component {
    render() {
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col xs={12}>
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="shoes">Shoes</NavItem>
                            <Tab.Content animation={false}>
                                <Tab.Pane eventKey="shoes">
                                    Women's
                                    <NavItem eventKey="WSneakers" margin-left={10} className="NavItemMargin">Sneakers</NavItem>
                                    <NavItem eventKey="WHeels" className="NavItemMargin">Heels</NavItem>
                                    <NavItem eventKey="WLoafers" className="NavItemMargin">Loafers</NavItem>
                                    <NavItem eventKey="WSandals" className="NavItemMargin">Sandals</NavItem>
                                    Men's
                                    <NavItem eventKey="MBoots" className="NavItemMargin">Boots</NavItem>
                                    <NavItem eventKey="MOxfords" className="NavItemMargin">Oxfords</NavItem>
                                    <NavItem eventKey="MLoafers" className="NavItemMargin">Loafers</NavItem>
                                    <NavItem eventKey="MSandals" className="NavItemMargin">Sandals</NavItem>
                                    <NavItem eventKey="BShoes" className="NavItemMargin">Boy's Shoes</NavItem>
                                    <NavItem eventKey="GShoes" className="NavItemMargin">Girl's Shoes</NavItem>
                                </Tab.Pane>
                            </Tab.Content>

                        <NavItem eventKey="clothing">Clothing</NavItem>
                            <Tab.Content animation={false}>
                                <Tab.Pane eventKey="clothing">
                                    Women's
                                    <NavItem eventKey="WDresses" className="NavItemMargin">Dresses</NavItem>
                                    <NavItem eventKey="WShirts" className="NavItemMargin">Shirts & Tops</NavItem>
                                    <NavItem eventKey="WSwim" className="NavItemMargin">Swimwear</NavItem>
                                    <NavItem eventKey="WShorts" className="NavItemMargin">Shorts</NavItem>
                                    Men's
                                    <NavItem eventKey="MShirts" className="NavItemMargin">Shirts & Tops</NavItem>
                                    <NavItem eventKey="MShorts" className="NavItemMargin">Shorts</NavItem>
                                    <NavItem eventKey="MSwim" className="NavItemMargin">Swimwear</NavItem>
                                    <NavItem eventKey="MPants" className="NavItemMargin">Pants</NavItem>
                                    <NavItem eventKey="BCloth" className="NavItemMargin">Boy's Clothing</NavItem>
                                    <NavItem eventKey="GCloth" className="NavItemMargin">Girl's Clothing</NavItem>
                                </Tab.Pane>
                            </Tab.Content>

                            <NavItem eventKey="bags">Bags</NavItem>
                            <Tab.Content animation={false}>
                                <Tab.Pane eventKey="bags">
                                    <NavItem eventKey="Handbags" className="NavItemMargin">Handbags</NavItem>
                                    <NavItem eventKey="Backpacks" className="NavItemMargin">Backpacks</NavItem>
                                    <NavItem eventKey="Wallets" className="NavItemMargin">Wallets & Accessories</NavItem>
                                    <NavItem eventKey="Luggage" className="NavItemMargin">Luggage</NavItem>
                                </Tab.Pane>
                            </Tab.Content>

                            <NavItem eventKey="accessories">Accessories</NavItem>
                            <Tab.Content animation={false}>
                                <Tab.Pane eventKey="accessories">
                                    <NavItem eventKey="Sunglasses" className="NavItemMargin">Sunglasses</NavItem>
                                    <NavItem eventKey="Hats" className="NavItemMargin">Hats</NavItem>
                                    <NavItem eventKey="Watches" className="NavItemMargin">Watches</NavItem>
                                    <NavItem eventKey="Jewelery" className="NavItemMargin">Jewelery</NavItem>
                                    <NavItem eventKey="Belts" className="NavItemMargin">Belts</NavItem>
                                </Tab.Pane>
                            </Tab.Content>
                    </Nav>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

export default CategoryFilter;