import React, { Component } from 'react';
import Featured from './Featured';
import CartDetail from './CartDetail';
import { Grid, Row, Col, PageHeader, Button, Table } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import rick from '../assets/rick.png';

class CartPage extends Component {
    state = { carts: [] }

    componentWillMount() {
        this.getUserCart();
    }

    getUserCart() {
        axios.get(API_URL_1 + "/cart", {
            params: {
                id: this.props.auth.id
            }
        })
            .then(item => {
                this.setState({ carts: item.data.cart })
                console.log(this.state.carts)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    calculateTotalPrice() {
        this.totalPrice = 0;
        this.state.carts.map(item => {
            this.totalPrice += item.price;
        })
        return this.totalPrice;
    }

    renderItemList = () => {
        console.log(this.state.carts)
        return this.state.carts.map(item =>
            <CartDetail key={item.id} id={item.id} user_id={item.user_id} username={item.username} product_id={item.product_id} link={item.link} product_name={item.product_name} 
            gender={item.gender} brand_id={item.brand_id} brand={item.brand} color_id={item.color_id} color={item.color} size_id={item.size_id} size={item.size} 
            quantity={item.quantity} price={item.price}>
            <input type="button" className="btn btn-danger" value="Remove" style={{width:"100px"}}/>
            </CartDetail>
        )
    }

    render() {
        if (this.props.auth.cookieCheck === true) {
        if (this.props.auth.username !== "") {
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
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Brand</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th><input type="button" className="btn btn-warning" value="Clear Cart" style={{width:"100px"}}/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItemList()}
                            <tr>
                                <td colSpan={7}></td>
                                <td>Total Price: </td>
                                <td>${this.calculateTotalPrice()}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><input type="button" className="btn btn-primary" value="Back to Catalog" style={{width:"125px"}}/></td>
                                <td colSpan={8}></td>
                                <td><input type="button" className="btn btn-success" value="Check Out" style={{width:"100px"}}/></td>
                            </tr>
                        </tbody>
                    </Table>
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
    const auth = state.auth;

    // return { users, auth };
    return { auth };
}

// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default connect(mapStateToProps, )(CartPage);