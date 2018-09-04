import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import Filter from './Filter';
import Pagination from './Pagination';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import ItemDetail from './ItemDetail';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

import { onAddToCart } from '../actions';
import { connect } from 'react-redux';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class CatalogPage extends Component {
    onAddClick = (item) => {
        console.log(this.props.cart);
        this.props.cart.push({
            link: item.link,
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category
        })
        console.log(this.props.cart);
        axios.put(API_URL_1 + '/users/' + this.props.auth.id, {
                id: this.props.auth.id,
                username: this.props.auth.username,
                password: this.props.auth.password,
                email: this.props.auth.email, 
                cart: this.props.cart
            })
        .then((response) => {
            alert("Input Success!");
            console.log(response);
            this.getCatalogList();
        })
        .catch((err) => {
            alert("Input Error!");
            console.log(err);
        })
    }

    state = { items: [] }

    componentWillMount() {
        axios.get(API_URL_1 + "/catalog")
            .then(item => {
                console.log(item);
                    this.setState({ items: item.data})});
    }

    renderItemList = () => {
        return this.state.items.map((item) =>
            <ItemDetail key={item.name} Link={item.link} Name={item.name} Description={item.description} Price={item.price} Category={item.category}>
            <input className="btn btn-primary image-detail" text-align="rigth" type="button" value="ADD TO CART" onClick={() => this.onAddClick(item)}/>
            </ItemDetail>
        );
    }

    render() {
        console.log(this.state.items);
        return(
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={8}>
                    <PageHeader>
                    Catalog
                    </PageHeader>;
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={2}>
                    <Filter />
                </Col>
                <Col xs={6}>
                    <Grid fluid>
                        <Row className="show-grid">
                            {this.renderItemList()}
                        </Row>
                        <Row className="show-grid">
                        <hr />
                            <Col xs={12} align="center">
                                <Pagination />
                            </Col>
                        </Row>
                    </Grid>
                </Col>
            </Row>
            <hr />
        </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    const cart = state.cart;
    const auth = state.auth;

    // return { users, auth };
    return { auth, cart };
}

// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default connect(mapStateToProps, { onAddToCart } )(CatalogPage);