import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl'

var stock_array = new Array();

class AdminInput extends Component {
    state = { edit: false, variant: [], current_stock: 0, stock_id: [], select_stock_id: 0}

    componentWillMount() {
        this.getVariantList();
    }

    getVariantList() {
        axios.get(API_URL_1 + "/admin_variant_inventory", {
            params: {
                id: this.props.id
            }
        })
            .then(item => {
                this.setState({ variant: item.data.variant })
                this.select_stock();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    

    preEdit(status) {
        this.setState({ edit: status})
        this.index_select_stock_id = ((this.color_pick * this.props.Size_Count) + this.size_pick); // 0-8
        this.state.select_stock_id = this.state.stock_id[this.index_select_stock_id]
        this.setState({})
        console.log(this.color_pick, this.size_pick)
        console.log(this.index_select_stock_id)
    }

    onEditClick(id, status) {
        axios.put(API_URL_1 + '/edit_product?id=' + id, {
            id: id,
            link: this.refs.elink.value,
            name: this.refs.ename.value,
            description: this.refs.edescription.value,
            price: this.refs.eprice.value,
            gender: this.refs.egender.value,
            brand: this.refs.ebrand.value,
            color: this.refs.ecolor.value,
            size: this.refs.esize.value,
            stock: this.refs.estock.value,
            stock_id: this.state.select_stock_id
        })
        .then((response) => {
            if(response.data.status === "Error") {
                console.log(response.data.err);
                alert(response.data.err.sqlMessage);
            }
            else {
                alert("Edit Success!");
                console.log(response);
                this.props.tempMount();
                this.setState({edit: status})
            }
        })
        .catch((err) => {
            alert("Edit Error!");
        })
    }

    onCancelClick(status) {
        this.setState({edit: status})
    }
    
    changeColor = (temp) => {
        this.color_pick = temp.target.value-1;
        console.log(this.state.stock_id)
        this.select_stock();
    }

    changeSize = (temp) => {
        this.size_pick = temp.target.value -1;
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
        for (var i = 0; i < this.props.Color_Count; i++) {
            stock_array.push(new Array());
        }
        var temp = 0;
        for (var j = 0; j < this.props.Color_Count; j++) {
            for (var k = 0; k < this.props.Size_Count; k++) {
                stock_array[j].push(this.state.variant[temp].stock)
                if (this.state.stock_id.length < (this.props.Color_Count*this.props.Size_Count)) {
                    this.state.stock_id.push(this.state.variant[temp].id)
                }
                temp++
            }
        }
    }

    render() {
        if (this.state.edit == false) {
        return (
                <tr>
                    <td style={{width:"30px"}}>
                        {this.props.id}
                    </td>
                    <td style={{width:"100px"}}>
                        <img src={this.props.link} width="100px"/>
                    </td>
                    <td style={{width:"150px"}}>
                        {this.props.name}
                    </td>
                    <td style={{width:"500px"}} className="text-justify">
                        {this.props.description}
                    </td>
                    <td style={{width:"50px"}}>
                        {this.props.price}
                    </td>
                    <td style={{width:"100px"}}>
                        {this.props.gender}
                    </td>
                    <td style={{width:"130px"}}>
                        {this.props.brand}
                    </td>
                    <td style={{width:"130px"}}>
                        <select ref="optionColor" class="form-control" onChange={this.changeColor} value={this.state.value}>
                            {this.props.Option_Color()}
                        </select>
                    </td>
                    <td style={{width:"130px"}}>
                    <select ref="optionSize" class="form-control" onChange={this.changeSize} value={this.state.value}>
                        {this.props.Option_Size()}
                        </select>
                    </td>
                    <td style={{width:"130px"}}>
                        {this.state.current_stock}
                    </td>
                    <td style={{width:"50px"}}>
                        <input type="button" className="btn btn-warning" value="Edit" onClick={() => this.preEdit(true)}/>
                    </td>
                    <td style={{width:"50px"}}>
                        {this.props.children}                  
                    </td>
                </tr>
        );
    }
    else if (this.state.edit == true) {
        return (
            <tr>
                <td style={{width:"30px"}}>
                    {this.props.id}
                </td>
                <td>
                    <textarea ref="elink" class="form-control" type="text" defaultValue={this.props.link} style={{width:"100px"}}/>
                </td>
                <td>
                    <input ref="ename" class="form-control" type="text" defaultValue={this.props.name} style={{width:"150px"}}/>
                </td>
                <td>
                    <textarea ref="edescription" class="form-control" defaultValue={this.props.description}  style={{width:"500px"}}/>
                </td>
                <td>
                    <input ref="eprice" class="form-control" type="number" defaultValue={this.props.price} style={{width:"50px"}}/>
                </td>
                <td>
                    <select ref="egender" class="form-control" style={{width:"100px"}}>
                    <option value={this.props.gender}>{this.props.gender}</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    </select>
                </td>
                <td>
                    <select ref="ebrand" class="form-control" style={{width:"130px"}}>
                    <option value={this.props.brand_id}>{this.props.brand}</option>
                    {this.props.Option_Brand()}
                    </select>
                </td>
                <td>
                    <select ref="ecolor" class="form-control" style={{width:"130px"}} disabled>
                    {this.props.Option_Color()}
                    </select>
                </td>
                <td>
                    <select ref="esize" class="form-control" style={{width:"130px"}} disabled>
                    {this.props.Option_Size()}
                    </select>
                </td>
                <td>
                    <input ref="estock" class="form-control" type="number" defaultValue={this.state.current_stock} style={{width:"50px"}}/>
                </td>
                <td>
                    <input type="button" className="btn btn-success" value="Save" onClick={() => this.onEditClick(this.props.id, false)}/>
                </td>
                <td>
                    <input type="button" className="btn btn-warning" value="Cancel" onClick={() => this.onCancelClick(false)}/>
                </td>
            </tr>
    );
    }
    }
}

export default AdminInput;

