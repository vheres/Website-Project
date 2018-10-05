import React, { Component } from 'react';
import PaginationClass from './Pagination';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import ItemDetail from './ItemDetail';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';
import { connect } from 'react-redux';

class CatalogPage extends Component {
    state = { items: [], brand: [], pagination: [], pagecount: 0, search_status: [0], active: [0] }

    componentWillMount() {
        if (this.state.pagination.length === 0) {
            this.state.pagination.push(0, 20)
        }
        this.setState({})
        if(this.state.search_status[0] === 0) {
            this.getInventoryList(); 
        }
        else {
            this.onSearchClick();
        }
    }

    getInventoryList() {
        console.log(this.state.pagination)
        axios.get(API_URL_1 + "/inventory", {
            params: {
                pagination: this.state.pagination
            }
        })
            .then(item => {
                console.log(item);
                    this.setState({ items: item.data.listInventory, brand: item.data.listBrand, pagecount: Math.ceil((item.data.pagecount[0].count/20)) })
            }).catch((err) => {
                console.log(err);
            });         
    }

    onPageClick(page , active) {
        this.state.active.shift();
        this.state.active.push(active);
        this.state.pagination.length = 0;
        this.state.pagination.push(page, 20)
        this.setState({})
        this.getSearchList();
    }
    
    onSearchClick() {
        if(this.state.search_status[0] === 0) {
            this.state.search_status.shift();
            this.state.search_status.push(1);
        }
        
        if(this.state.search_status[0] !== 0) {
            this.state.pagination.length = 0;
            this.state.pagination.push(0, 20)
        }
        this.state.active.shift();
        this.state.active.push(0);
        this.getSearchList();
    }

    getSearchList() {
        console.log(this.state.search_status)
        axios.get(API_URL_1 + "/search_inventory", {
            params: {
                name: this.refs.searchName.value,
                minPrice: this.refs.searchPriceMin.value,
                maxPrice: this.refs.searchPriceMax.value,
                gender: this.refs.searchGender.value,
                brand: this.refs.searchBrand.value,
                pagination: this.state.pagination
            }
        })
            .then(item => {
                this.setState({ items: item.data.listInventory, pagecount: Math.ceil((item.data.pagecount[0].count/20)) })})
            .catch((err) => {
                console.log(err);
            })
    }

    onDetailClick(temp) {
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
                        <option value="">Gender</option>
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
                                <PaginationClass count={this.state.pagecount} PageClick={(page, active)=>this.onPageClick(page, active)} active={this.state.active[0]}/>
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
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, {} )(CatalogPage);