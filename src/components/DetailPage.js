import React, { Component } from 'react';
import Carouselclass from './Carousel';
import Featured from './Featured';
import StarRating from './StarRating';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';
import { connect } from 'react-redux';
import rick from '../assets/rick.png';

var stock_array = new Array();

class DetailPage extends Component {
    state = { items: [], variant: [], product_color: [], size: [], current_stock: 0, stock_id: [], color_count: 0, size_count: 0, qty_pick: 0 }

    componentWillMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        console.log('id:', id);
        axios.get(API_URL_1 + "/detail_select_inventory", {
            params: {
                id
            }
        }).then(item => {
                this.setState({ items: item.data.detail_select[0], variant: item.data.variant, product_color: item.data.product_color, size: item.data.size, color_count: item.data.color_count[0].total, size_count: item.data.size_count[0].total })
                this.select_stock();
        }).catch((err) => {
            console.log(err);
        });
    }

    onAddToCartClick() {
        console.log('id ', this.props.auth.id)
        console.log('product_id ', this.state.items.id)
        console.log('color ', this.refs.optionColor.value[2])
        console.log('size ', this.refs.optionSize.value[2])
        console.log('quantity ', this.refs.optionQuantity.value)
        var price = this.state.items.price * this.refs.optionQuantity.value;
        axios.post(API_URL_1 + '/add_to_cart', {
            id: this.props.auth.id,
            product_id: this.state.items.id,
            color_id: this.refs.optionColor.value[2],
            size_id: this.refs.optionSize.value[2],
            quantity: this.refs.optionQuantity.value,
            price: price
        })
        .then((res) => {
            alert('Add successful')
        })
        .catch((err) => {
            console.log(err);
        })

    }

    renderAddToCartBTN = () => {
        if (this.state.current_stock === 0 || this.state.qty_pick > this.state.current_stock) {
            return <Button bsStyle="primary" className="detailButton" disabled>ADD TO CART</Button>
        }
        else {
            return <Button bsStyle="primary" className="detailButton" onClick={()=>this.onAddToCartClick()}>ADD TO CART</Button>
        }
    }

    renderProductColor = () => {
        const arrJSX = this.state.product_color.map((item, count) => {
            return(<option value={[count, item.color_id]}>{item.color}</option>)
        })
        return arrJSX;
    }

    renderOptionSize = () => {
        const arrJSX = this.state.size.map((item, count) => {
            return(<option value={[count, item.id]}>{item.name}</option>)
        })
        return arrJSX;
    }

    changeQty = (temp) => {
        this.setState({ qty_pick: temp.target.value})
    }

    changeColor = (temp) => {
        this.color_pick = temp.target.value[0];
        console.log(this.state.stock_id)
        this.select_stock();
    }

    changeSize = (temp) => {
        this.size_pick = temp.target.value[0];
        console.log(this.state.stock_id)
        this.select_stock();
    }

    select_stock = () => {
        if (this.color_pick === undefined) {
            this.color_pick = 0;
        }
        if (this.size_pick === undefined) {
            this.size_pick = 0;
        }
        this.create_stock_array();
        this.state.current_stock = stock_array[this.color_pick][this.size_pick]
        this.setState({})

    }

    create_stock_array() {
        stock_array = [];
        this.state.stock_id.length = 0;
        this.setState({})
        for (var i = 0; i < this.state.color_count; i++) {
            stock_array.push(new Array());
            this.state.stock_id.push(new Array());
        }
        var temp = 0;
        for (var j = 0; j < this.state.product_color.length; j++) {
            for (var k = 0; k < this.state.size_count; k++) {
                stock_array[j].push(this.state.variant[temp].stock)
                this.state.stock_id[j].push(this.state.variant[temp].id)
                temp++
            }
        }
    }

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
                        $ {this.state.items.price},-</h2>
                    </Row>
                    <Row>
                        <p>{this.state.items.description}</p>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <Row>
                                <h4>Color</h4>
                            </Row>
                            <Row>
                                <select ref="optionColor" class="form-control" onChange={this.changeColor} value={this.state.value}>
                                    {this.renderProductColor()}
                                </select>
                            </Row>   
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <h4>Size</h4>
                            </Row>
                            <Row>
                                <select ref="optionSize" class="form-control" onChange={this.changeSize} value={this.state.value}>
                                    {this.renderOptionSize()}
                                </select>
                            </Row>   
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <h4>Quantity</h4>
                            </Row>
                            <Row>
                                <select ref="optionQuantity" class="form-control" onChange={this.changeQty} value={this.state.value}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </Row>  
                        </Col>                      
                    </Row>
                    <Row>
                        <h3>Available Stock: {this.state.current_stock}</h3>
                    </Row>
                    <Row>
                        <p>Brand: {this.state.items.brand} | Gender: {this.state.items.gender}</p>
                        <hr />
                    </Row>
                    <Row>
                        {this.renderAddToCartBTN()}
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
    const auth = state.auth;

    return { auth };
}
export default connect(mapStateToProps, {} )(DetailPage);