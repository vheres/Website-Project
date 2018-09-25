import React, { Component } from 'react';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import Pagination from './Pagination';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import ItemDetail from './ItemDetail';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

import { onAddToCart } from '../actions';
import { connect } from 'react-redux';

class CatalogPage extends Component {
    state = { items: [], brand: [] }

    componentWillMount() {
        axios.get(API_URL_1 + "/inventory")
            .then(item => {
                console.log(item);
                    this.setState({ items: item.data.listInventory, brand: item.data.listBrand })
            }).catch((err) => {
                console.log(err);
            });              
    }

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
    
    onSearchClick() {
        axios.get(API_URL_1 + "/search_inventory", {
            params: {
                name: this.refs.searchName.value,
                minPrice: this.refs.searchPriceMin.value,
                maxPrice: this.refs.searchPriceMax.value,
                gender: this.refs.searchGender.value,
                brand: this.refs.searchBrand.value
            }
        })
            .then(item => {
                this.setState({ items: item.data.listInventory })})
            .catch((err) => {
                console.log(err);
            })
    }

    onDetailClick(temp) {
        console.log('cek temp')
        console.log(temp);
        // this.props.onUserSelect(temp)
        this.props.history.push(`/detail?id=${temp}`)
    }

    renderSearchOptionBrand = () => {
        const arrJSX = this.state.brand.map((item) => {
            return(<option value={item.name}>{item.name}</option>)
        })
        return arrJSX;
    }

    renderItemList = () => {
        return this.state.items.map((item) =>
            <ItemDetail key={item.id} id={item.id} detailButton={(temp)=>this.onDetailClick(temp)} Link={item.link} Name={item.name} Description={item.description} Price={item.price} Gender={item.gender} Brand={item.brand}>
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
                    </PageHeader>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={2}>
                    <Row>
                        <p>Product's Name</p>
                        <input type="text" ref="searchName" class="form-control" id="inputSearchName" placeholder="Name" />
                        <br/>
                    </Row>
                    <Row>
                        <p>Product's Price</p>
                        <input type="number" ref="searchPriceMin" class="form-control" id="inputSearchPriceMin" placeholder="Min Price" step="10000"/>
                        <input type="number" ref="searchPriceMax" class="form-control" id="inputSearchPriceMax" placeholder="Max Price" step="10000"/>
                        <br/>
                    </Row>
                    <Row>
                        <p>Gender</p>
                        <select ref="searchGender" class="form-control">
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                        <br/>
                    </Row>
                    <Row>
                        <p>Product's Brand</p>
                        <select ref="searchBrand" class="form-control">
                            <option value="">Brand</option>
                            {this.renderSearchOptionBrand()}
                        </select>
                        <br/>
                    </Row>
                    <Row>
                        <input type="button" class="btn btn-primary" style={{width:100}} value="A P P L Y" onClick={this.onSearchClick.bind(this)}/>
                    </Row>
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
    // const slct = state.slct;

    // return { users, auth };
    return { auth, cart };
}

// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default connect(mapStateToProps, { onAddToCart } )(CatalogPage);