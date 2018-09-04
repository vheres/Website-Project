import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import Filter from './Filter';
import Pagination from './Pagination';
import { Grid, Row, Col, PageHeader, Table, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ItemDetail from './ItemDetail';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';
// import { onInput } from '../actions';
import { connect } from 'react-redux';
import AdminInput from './AdminInput';

import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class AdminPage extends Component {
    onInputClick = () => {
        axios.post(API_URL_1 + '/catalog', {
            link: this.refs.link.value,
            name: this.refs.name.value,
            description: this.refs.description.value,
            price: this.refs.price.value,
            category: this.refs.category.value
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

    onDeleteClick(id) {
        axios.delete(API_URL_1 + '/catalog/' + id,{})
        .then((response) => {
            alert("Delete Success!");
            console.log(response);
            this.getCatalogList();
        })
        .catch((err) => {
            alert("Delete Error!");
            console.log(err);
        })
    }
    
    state = { items: []}

    componentWillMount() {
        this.getCatalogList();
    }

    getCatalogList() {
        axios.get(API_URL_1 + "/catalog")
            .then(item => {
                this.setState({ items: item.data})})
            .catch((err) => {
                console.log(err);
            })
    }

    renderItemList = () => {
        return this.state.items.map(item =>
            <AdminInput link={item.link} name={item.name} description={item.description} price={item.price} category={item.category} id={item.id} tempMount={this.getCatalogList.bind(this)}>
            <td>
                <input type="button" className="btn btn-danger" value="Delete" onClick={()=>this.onDeleteClick(item.id)}/> 
            </td>
            </AdminInput>
        )
    }

    render() {
        return(
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={8}>
                    <PageHeader>
                    ADMIN
                    </PageHeader>;
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={12}>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderItemList()}
                                    <tr>
                                        <td>
                                            Input Form
                                        </td>
                                        <td>
                                            <input type="text" ref="link" class="form-control" id="inputLink" placeholder="Image Link" />
                                        </td>
                                        <td>
                                            <input type="text" ref="name" class="form-control" id="inputName" placeholder="Name" />
                                        </td>
                                        <td>
                                            <input type="text" ref="description" class="form-control" id="inputDescription" placeholder="Description" />
                                        </td>
                                        <td>
                                            <input type="text" ref="price" class="form-control" id="inputPrice" placeholder="Price" />
                                        </td>
                                        <td>
                                            <input type="text" ref="category" class="form-control" id="inputCategory" placeholder="Category" />
                                        </td>
                                        <td>
                                            <input type="button" class="btn btn-primary" value="Input" onClick={this.onInputClick}/>                       
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
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


// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
// export default connect(null, { onInput })(AdminPage);
export default AdminPage;