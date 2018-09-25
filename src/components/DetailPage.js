import React, { Component } from 'react';
import Carouselclass from './Carousel';
import Featured from './Featured';
import StarRating from './StarRating';
import Param from './Param';
import { Grid, Row, Col, PageHeader, Button, DropdownButton, MenuItem, FormGroup, ControlLabel } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';
import { connect } from 'react-redux';
import rick from '../assets/rick.png';

class DetailPage extends Component {
    componentWillMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        console.log('id:');
        console.log(id);
        axios.get(API_URL_1 + "/detail_select_inventory", {
            params: {
                id
            }
        }).then(item => {
                this.setState({ items: item.data.detail_select[0] })
        }).catch((err) => {
            console.log(err);
        });
    }

    state = { items: [] }

    render() {
        return(
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={8}>
                    <PageHeader>
                    {this.state.items.brand} | {this.state.items.name}
                    </PageHeader>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={4}>
                    <Carouselclass thumbs={false} img1={this.state.items.link} img2={this.state.items.link} img3={this.state.items.link} percentage={100} name={this.state.items.name}/>
                </Col>
                <Col xs={4}>
                    <Row>
                    <StarRating />
                    </Row>
                    <Row>
                        <h2>{this.state.items.name}<br />
                        Rp. {this.state.items.price},-</h2>
                    </Row>
                    <Row>
                        <p>{this.state.items.description}</p>
                    </Row>
                    <Row>
                        <Col xs={4}><Param title="Size" param="40" param2="41" param3="42" /></Col>
                        <Col xs={4}><Param title="Color" param="Red" param2="Green" param3="Blue" /></Col>
                        <Col xs={4}><Param title="Quantity" param="1" param2="2" param3="3" /></Col>                      
                    </Row>
                    <Row>
                        <p>Brand: {this.state.items.brand} | Gender: {this.state.items.gender}</p>
                        <hr />
                    </Row>
                    <Row>
                        <Button bsStyle="primary" className="detailButton">ADD TO CART</Button>
                    </Row>
                </Col>
            </Row>
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
}

const mapStateToProps = (state) => {
    const cart = state.cart;
    const auth = state.auth;
    // const slct = state.slct;

    // return { users, auth };
    return { auth, cart };
}
export default connect(mapStateToProps, {} )(DetailPage);