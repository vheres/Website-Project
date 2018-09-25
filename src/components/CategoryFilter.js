import React, { Component } from 'react';
import { Row, Col, Tab, Nav, NavItem  } from 'react-bootstrap';

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
                                    <NavItem margin-left={10} className="NavItemMargin" onClick={() => this.props.Category_Click('5')}>Sneakers</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('6')}>Heels</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('7')}>Loafers</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('8')}>Sandals</NavItem>
                                    Men'
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('9')}>Boots</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('10')}>Oxfords</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('11')}>Loafers</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('12')}>Sandals</NavItem>
                                </Tab.Pane>
                            </Tab.Content>

                        <NavItem eventKey="clothing">Clothing</NavItem>
                            <Tab.Content animation={false}>
                                <Tab.Pane eventKey="clothing">
                                    Women's
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('13')}>Dresses</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('14')}>Shirts & Tops</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('15')}>Swimwear</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('16')}>Shorts</NavItem>
                                    Men's
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('17')}>Shirts & Tops</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('18')}>Shorts</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('19')}>Swimwear</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('20')}>Pants</NavItem>
                                </Tab.Pane>
                            </Tab.Content>

                            <NavItem eventKey="bags">Bags</NavItem>
                            <Tab.Content animation={false}>
                                <Tab.Pane eventKey="bags">
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('21')}>Handbags</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('22')}>Backpacks</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('23')}>Wallets & Accessories</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('24')}>Luggage</NavItem>
                                </Tab.Pane>
                            </Tab.Content>

                            <NavItem eventKey="accessories">Accessories</NavItem>
                            <Tab.Content animation={false}>
                                <Tab.Pane eventKey="accessories">
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('25')}>Sunglasses</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('26')}>Hats</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('27')}>Watches</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('28')}>Jewelery</NavItem>
                                    <NavItem className="NavItemMargin" onClick={() => this.props.Category_Click('29')}>Belts</NavItem>
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