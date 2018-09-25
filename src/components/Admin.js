import React, { Component } from 'react';
import Pagination from './Pagination';
import { Grid, Row, Col, PageHeader, Table, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';
// import { onInput } from '../actions';
import { connect } from 'react-redux';
import AdminInput from './AdminInput';

class AdminPage extends Component {
    state = { items: [], brand: [], color: [], color_count: "", size: [], size_count: ""}

    componentWillMount() {
        this.getInventoryList();
    }

    onInputClick = () => {
        axios.post(API_URL_1 + '/inventory', {
            link: this.refs.link.value,
            name: this.refs.name.value,
            description: this.refs.description.value,
            price: this.refs.price.value,
            gender: this.refs.gender.value,
            brand: this.refs.brand.value
        })
        .then((response) => {
            alert("Input Success!");
            console.log(response);
            this.setState({ items: response.data.listInventory })
        })
    }

    onDeleteClick(id) {
        if(window.confirm('Are you sure?\nThis will delete both the product\'s information and the product\'s stock from database')) {
            axios.delete(API_URL_1 + '/inventory?id=' + id, {})
            .then((response) => {
                alert("Delete Success!");
                console.log(response);
                this.setState({ items: response.data.listInventory })
            })
            .catch((err) => {
                alert("Delete Error!");
                console.log(err);
            })
        }  
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

    renderOptionBrand = () => {
        const arrJSX = this.state.brand.map((item) => {
            return(<option value={item.id}>{item.name}</option>)
        })
        return arrJSX;
    }

    renderOptionColor = () => {
        const arrJSX = this.state.color.map((item) => {
            return(<option value={item.id}>{item.name}</option>)
        })
        return arrJSX;
    }

    renderOptionSize = () => {
        const arrJSX = this.state.size.map((item) => {
            return(<option value={item.id}>{item.name}</option>)
        })
        return arrJSX;
    }

    renderSearchOptionBrand = () => {
        const arrJSX = this.state.brand.map((item) => {
            return(<option value={item.name}>{item.name}</option>)
        })
        return arrJSX;
    }
    
    renderSearchOptionColor = () => {
        const arrJSX = this.state.color.map((item) => {
            return(<option value={item.name}>{item.name}</option>)
        })
        return arrJSX;
    }

    renderSearchOptionSize = () => {
        const arrJSX = this.state.size.map((item) => {
            return(<option value={item.name}>{item.name}</option>)
        })
        return arrJSX;
    }

    getInventoryList() {
        axios.get(API_URL_1 + "/inventory")
            .then(item => {
                this.setState({ items: item.data.listInventory, brand: item.data.listBrand, color: item.data.listColor, size: item.data.listSize, color_count: item.data.color_count[0].total, size_count: item.data.size_count[0].total })})
            .catch((err) => {
                console.log(err);
            })
    }

    renderItemList = () => {
        return this.state.items.map(item =>
            <AdminInput id={item.id} link={item.link} name={item.name} description={item.description} price={item.price} 
            gender={item.gender} brand={item.brand} brand_id={item.brand_id} color={item.color} color_id={item.color_id} size={item.size} size_id={item.size_id} 
            tempMount={this.getInventoryList.bind(this)} Color_Count={this.state.color_count} Size_Count={this.state.size_count}
            Option_Color={()=>this.renderOptionColor()} Option_Size={()=>this.renderOptionSize()} Option_Brand={()=>this.renderOptionBrand()}>
            <td>
                <input type="button" className="btn btn-danger" value="Delete" onClick={()=>this.onDeleteClick(item.id)}/> 
            </td>
            </AdminInput>
        )
    }

    render() {
        console.log(this.state.color_count);
        console.log(this.state.size_count)
        return(
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={12}>
                    <PageHeader>
                    ADMIN
                    </PageHeader>
                </Col>
            </Row>
            <Row className="show-grid">
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
                        <input type="button" class="btn btn-primary" style={{width:100}} value="Search!" onClick={this.onSearchClick.bind(this)}/>
                    </Row>
                </Col>
                <Col xs={10}>
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
                                    <th>Gender</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Stock</th>
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
                                            <input type="number" ref="price" class="form-control" id="inputPrice" placeholder="Price" />
                                        </td>
                                        <td>
                                            <select ref="gender" class="form-control">
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select ref="brand" class="form-control">
                                            <option value="">Brand</option>
                                            {this.renderOptionBrand()}
                                            </select>
                                        </td>
                                        {/* <td>
                                            <select ref="color" class="form-control">
                                            <option value="">Color</option>
                                            {this.renderOptionColor()}
                                            </select>
                                        </td>
                                        <td>
                                            <select ref="size" class="form-control">
                                            <option value="">Size</option>
                                            {this.renderOptionSize()}
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" ref="stock" class="form-control" id="inputStock" placeholder="Stock" />
                                        </td> */}
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