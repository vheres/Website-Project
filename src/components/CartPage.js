import React, { Component } from 'react';
import Featured from './Featured';
import CartDetail from './CartDetail';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import rick from '../assets/rick.png';

class CartPage extends Component {
    renderItemList = () => {
        return this.props.cart.map((item) =>
            <CartDetail key={item.name} Link={item.link} Name={item.name} Description={item.description} Price={item.price} Category={item.category}/>
        );
    }

    render() {
        if (this.props.auth.cookieCheck === true) {
        if (this.props.auth.username !== "") {
            console.log(this.props.cart);
            return(
            <Grid fluid>
                <Row className="show-grid">
                    <Col xs={2}>
                    </Col>
                    <Col xs={8}>
                        <PageHeader>
                        Cart
                        </PageHeader>
                    </Col>
                </Row>
                <Grid>
                <Row>
                    <Col xs={6}>
                        <h5><strong>Product's Name</strong></h5>
                    </Col>
                    <Col xs={2}>
                        <h5 align="center"><strong>Quantity</strong></h5>
                    </Col>
                    <Col xs={2}>
                        <h5 align="center"><strong>SubTotal</strong></h5>
                    </Col>
                    <Col xs={2}>
                        <Button>CLEAR CART</Button>
                    </Col>
                </Row>
                <hr />
                <Row className="show-grid">
                    {this.renderItemList()}
                </Row>
                <Row>
                    <h5 align="right">SubTotal: $160</h5>
                    <hr />
                </Row>
                <Row>
                    <Col xs={6}>
                        <Button><i className="fa fa-arrow-left"></i> BACK TO SHOPPING</Button>
                    </Col>
                    <Col xs={6}>
                    <Button className="checkOutButton" bsStyle="success">CHECKOUT</Button>
                    </Col>
                </Row>
                </Grid>
                <Row>
                    <Col xs={12}>
                    <hr />
                    <h3 align="center">Featured Products</h3>
                    <br />
                    </Col>
                </Row>
                <Row>
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
                <hr />
            </Grid>
            );
        }
        return <Redirect to="/login"/>  
    }
    return <div>Authentication Checking</div>;
    }
}

const mapStateToProps = (state) => {
    const cart = state.cart;
    const auth = state.auth;

    // return { users, auth };
    return { auth, cart };
}

// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default connect(mapStateToProps, )(CartPage);