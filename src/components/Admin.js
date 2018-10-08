import React, { Component } from 'react';
import PaginationClass from './Pagination';
import { Grid, Row, Col, PageHeader, Table, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';
// import { onInput } from '../actions';
import { connect } from 'react-redux';
import AdminInput from './AdminInput';

class AdminPage extends Component {
    state = { items: [], distinct_items: [], brand: [], color: [], color_count: "", size: [], size_count: "", table_list: [], table_pick: "", pagination: [], pagecount: 0, active: [0], search_status: [0]}

    componentWillMount() {
        if (this.state.pagination.length === 0) {
            this.state.pagination.push(0, 20)
        }
        this.getTableList();
        this.getInventoryList();
        this.changeTable();
    }

    getTableList() {
        axios.get(API_URL_1 + "/table_list")
            .then(item => {
                this.setState({table_list:item.data.table_list})
                console.log(this.state.table_list)
            })
            .catch((err) => {
                console.log(err);
            })
        }

    getInventoryList() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        if(search.length == 0) {
            var name = '';
            var minPrice = '';
            var maxPrice = '';
            var gender = '';
            var brand = '';
        }
        else {
            var name = params.get('name');
            var minPrice = params.get('minPrice');
            var maxPrice = params.get('maxPrice');
            var gender = params.get('gender');
            var brand = params.get('brand');
        }
        axios.get(API_URL_1 + "/inventory", {
            params: {
                name: name,
                minPrice: minPrice,
                maxPrice: maxPrice,
                gender: gender,
                brand: brand,
                pagination: this.state.pagination
            }
        })
            .then(item => {
                this.setState({ items: item.data.listInventory, pagecount: Math.ceil((item.data.pagecount[0].count/20)), brand: item.data.listBrand, color: item.data.listColor, size: item.data.listSize, color_count: item.data.color_count[0].total, size_count: item.data.size_count[0].total, distinct_items:item.data.distinct_items })})
            .catch((err) => {
                console.log(err);
            })
    }

    onPageClick(page , active) {
        this.state.active.shift();
        this.state.active.push(active);
        this.state.pagination.length = 0;
        this.state.pagination.push(page, 20)
        this.setState({})
        this.getInventoryList();
    }

    onInputClick = () => {
        axios.post(API_URL_1 + '/inventory', {
            link: this.refs.link.value,
            name: this.refs.name.value,
            description: this.refs.description.value,
            price: this.refs.price.value,
            gender: this.refs.gender.value,
            brand: this.refs.brand.value,
        })
        .then((response) => {
            alert("Input Success!");
            console.log(response);
            this.getInventoryList();
        })
    }
    onInputBrand = () => {
        axios.post(API_URL_1 + '/brand', {
            name: this.refs.new_brand.value
        })
        .then((response) => {
            alert("Input Brand Success!")
            this.setState({ brand: response.data.listBrand })
        })
    }

    onInputColor = () => {
        axios.post(API_URL_1 + '/color', {
            name: this.refs.new_color.value
        })
        .then((response) => {
            alert("Input Color Success!")
            this.setState({ color: response.data.listColor })
        })
    }

    onInputSize = () => {
        console.log(this.state.distinct_items)
        axios.post(API_URL_1 + '/size', {
            name: this.refs.new_size.value
        })
        .then((response) => {
            var sql = "";
            this.state.distinct_items.map((item, count) => {
                if (count < this.state.distinct_items.length-1) {
                    sql += "('" + item.product_id + "', '" + item.color_id + "', '" + response.data.new_size_id[0].id + "', '" + 0 +"'), "
                }
                else {
                    sql += "('" + item.product_id + "', '" + item.color_id + "', '" + response.data.new_size_id[0].id + "', '" + 0 +"')"
                }
            })
            axios.post(API_URL_1 + '/input_all_product_size', {
                sql_query: sql
            })
            .then((response) => {
                console.log('success')
            })
            this.setState({ size: response.data.listSize })
        })
    }

    onDeleteClick(id) {
        if(window.confirm('Are you sure?\nThis will delete both the product\'s information and the product\'s stock from database')) {
            axios.delete(API_URL_1 + '/inventory?id=' + id, {})
            .then((response) => {
                alert("Delete Success!");
                console.log(response);
                this.getInventoryList();
            })
            .catch((err) => {
                alert("Delete Error!");
                console.log(err);
            })
        }  
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
        this.pushPage();
    }

    async pushPage() {
        await (this.props.history.push(`/admin?name=${this.refs.searchName.value}&minPrice=${this.refs.searchPriceMin.value}&maxPrice=${this.refs.searchPriceMax.value}&gender=${this.refs.searchGender.value}&brand=${this.refs.searchBrand.value}`))
        this.getInventoryList();
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

    renderOptionSize = (mode) => {
        var arrJSX = ""
        if (mode === 1) {
                arrJSX = this.state.size.map((item, count) => {
                return(<option value={count}>{item.name}</option>)
            })
        }
        else if (mode === 2) {
                arrJSX = this.state.size.map((item, count) => {
                return(<option value={item.id}>{item.name}</option>)
            })
        }
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
    changeTable = (temp) => {
        if(temp === undefined) {
            this.setState({table_pick: 'inventory'});
        }
        else {
            this.setState({table_pick: temp.target.value});
        }
        console.log(this.state.table_pick)
    }

    selectTable() {
        return(
            {
                inventory: () => this.renderAdminProduct(),
                bcs: () => this.renderAdminBCS()
            }
        )   
    }

    renderAdminProduct = () => {
        return (
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
                                    <th style={{width:"100px"}}>Price</th>
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
                                <PaginationClass count={this.state.pagecount} PageClick={(page, active)=>this.onPageClick(page, active)} active={this.state.active[0]}/>
                            </Col>
                        </Row>
                    </Grid>
                </Col>
            </Row>
        );
    }

    renderAdminBCS = () => {
        return (
            <Row className="show-grid">
                <Col xs={2}>
                </Col>
                <Col xs={10}>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={4}>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Brand</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderBrandList()}
                                        <tr>
                                            <td colSpan={2}>
                                                <input type="text" ref="new_brand" class="form-control" id="inputBrand" placeholder="New Brand Here" />
                                            </td>
                                            <td>
                                                <input type="button" class="btn btn-primary" value="Input" onClick={this.onInputBrand} style={{width:"125px"}}/>                       
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs={4}>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Color</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderColorList()}
                                        <tr>
                                            <td colSPan={2}>
                                                <input type="text" ref="new_color" class="form-control" id="inputColor" placeholder="New Color Here" />
                                            </td>
                                            <td>
                                                <input type="button" class="btn btn-primary" value="Input" onClick={this.onInputColor} style={{width:"125px"}}/>                       
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs={4}>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Size</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderSizeList()}
                                        <tr>
                                            <td colSpan={2}>
                                                <input type="text" ref="new_size" class="form-control" id="inputSize" placeholder="New Size Here" />
                                            </td>
                                            <td>
                                                <input type="button" class="btn btn-primary" value="Input" onClick={this.onInputSize} style={{width:"125px"}}/>                       
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Grid>
                </Col>
            </Row>
        );
    }

    renderItemList = () => {
        return this.state.items.map(item =>
            <AdminInput id={item.id} link={item.link} name={item.name} description={item.description} price={item.price} 
            gender={item.gender} brand={item.brand} brand_id={item.brand_id}  
            tempMount={this.getInventoryList.bind(this)} Color_Count={this.state.color_count} Size_Count={this.state.size_count}
            Option_Color={()=>this.renderOptionColor()} Option_Size={(mode)=>this.renderOptionSize(mode)} Option_Brand={()=>this.renderOptionBrand()}>
            <td>
                <input type="button" className="btn btn-danger" value="Delete" onClick={()=>this.onDeleteClick(item.id)} style={{width:"125px"}}/> 
            </td>
            </AdminInput>
        )
    }

    renderBrandList = () => {
        return this.state.brand.map(item => 
            <tr>
                <td style={{width:"30px"}}>
                    {item.id}
                </td>
                <td style={{width:"150px"}}>
                    {item.name}
                </td>
                <td>
                    <input type="button" className="btn btn-danger" value="Delete" style={{width:"125px"}}/>
                </td>
            </tr>
            )
    }

    renderColorList = () => {
        return this.state.color.map(item => 
            <tr>
                <td style={{width:"30px"}}>
                    {item.id}
                </td>
                <td style={{width:"150px"}}>
                    {item.name}
                </td>
                <td>
                    <input type="button" className="btn btn-danger" value="Delete" style={{width:"125px"}}/>
                </td>
            </tr>
            )
    }

    renderSizeList = () => {
        return this.state.size.map(item => 
            <tr>
                <td style={{width:"30px"}}>
                    {item.id}
                </td>
                <td style={{width:"150px"}}>
                    {item.name}
                </td>
                <td>
                    <input type="button" className="btn btn-danger" value="Delete" style={{width:"125px"}}/>
                </td>
            </tr>
            )
    }

    render() {
        return(
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={12}>
                    <PageHeader>
                    ADMIN
                    </PageHeader>
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <select ref="brand" class="form-control" onChange={this.changeTable} value={this.state.value}>
                        <option value='inventory'>Product</option>
                        <option value='bcs'>Brand, Color and Size</option>
                    </select>
                </Col>
            </Row>
            <hr />
            {this.selectTable()[this.state.table_pick]()}
            <hr />
        </Grid>
        );
    }
}

export default AdminPage;