import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl'

var stock_array = new Array();
var product_color_array = new Array();

class AdminInput extends Component {
    state = { edit: 0, variant: [], product_color: [], current_stock: 0, stock_id: [], select_stock_id: 0, size: [], not_exist_color: []}

    componentWillMount() {
        this.getVariantList();
        this.getSize();
    }

    getVariantList() {
        axios.get(API_URL_1 + "/admin_variant_inventory", {
            params: {
                id: this.props.id
            }
        })
            .then(item => {
                this.setState({ variant: item.data.variant, product_color: item.data.product_color })
                this.select_stock();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getSize() {
        axios.get(API_URL_1 + "/getsize",)
            .then(item => {
                this.setState({ size: item.data.listSize })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    renderProductColor = () => {
        const arrJSX = this.state.product_color.map((item, count) => {
            return(<option value={count}>{item.color}</option>)
        })
        return arrJSX;
    }

    preEdit(status) {
        this.setState({ edit: status})
        this.state.select_stock_id = this.state.stock_id[this.color_pick][this.size_pick]
        this.setState({})
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
                this.setState({edit: status, variant: response.data.variant})
                this.select_stock();
            }
        })
        .catch((err) => {
            alert("Edit Error!");
        })
    }

    preAddVariant(id, status) {
        axios.get(API_URL_1 + "/not_exist_color?id=" + id,)
            .then(item => {
                this.setState({ not_exist_color:item.data.color })
                console.log(this.state.not_exist_color)
            })
            .catch((err) => {
                console.log(err);
            })
            this.setState({edit:status})
    }

    onAddVariant(status) {
        this.state.size.map(item =>
            {var estock = "estock" + item.name
            axios.post(API_URL_1 + "/input_variant", {
                product_id: this.props.id,
                color_id: this.refs.addVariantColor.value,
                size_id:item.id,
                stock: this.refs[estock].value
            })
            .then(item => {
                if(item.data.status === "Error") {
                    console.log(item.data.err);
                    alert(item.data.err.sqlMessage);
                }
                else {
                    alert("Input Variant successful!")
                    this.props.tempMount();
                    this.setState({edit: status, variant: item.data.variant, product_color: item.data.product_color })
                    console.log(this.state.product_color)
                    this.select_stock();
                }
            })
            .catch((err) => {
                alert("Edit Error!");
            })    
        }
        )
        this.setState({edit:status})
    }

    removeVariant(id) {
        if(window.confirm('Are you sure?\nThis will delete both the selected product\'s variant and the variant\'s stock from database')) {
            axios.delete(API_URL_1 + '/remove_variant?id=' + id, {
                color_id: this.refs.optionColor.value
            })
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

    renderNotExistColor() {
        const arrJSX = this.state.not_exist_color.map((item) => {
            return(<option value={item.id}>{item.color}</option>)
        })
        return arrJSX;
    }

    onCancelClick(status) {
        this.setState({edit: status})
    }
    
    changeColor = (temp) => {
        this.color_pick = temp.target.value;
        console.log(this.state.stock_id)
        this.select_stock();
    }

    changeSize = (temp) => {
        this.size_pick = temp.target.value;
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
        for (var i = 0; i < this.props.Color_Count; i++) {
            stock_array.push(new Array());
            this.state.stock_id.push(new Array());
        }
        var temp = 0;
        for (var j = 0; j < this.state.product_color.length; j++) {
            for (var k = 0; k < this.props.Size_Count; k++) {
                stock_array[j].push(this.state.variant[temp].stock)
                this.state.stock_id[j].push(this.state.variant[temp].id)
                temp++
            }
        }
    }

    renderVariantSize() {
        return this.state.size.map(item =>
            <tr>
                <td style={{width:"130px"}}>
                    {item.name}
                </td>
                <td style={{width:"130px"}}>
                    <input ref={"estock"+item.name} class="form-control" type="number" defaultValue={0} style={{width:"50px"}}/>
                </td>
            </tr>
        )
    }

    render() {
        if (this.state.edit === 0) {
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
                            {this.renderProductColor()}
                        </select>
                    </td>
                    <td style={{width:"130px"}}>
                    <select ref="optionSize" class="form-control" onChange={this.changeSize} value={this.state.value}>
                        {this.props.Option_Size(1)}
                        </select>
                    </td>
                    <td style={{width:"130px"}}>
                        {this.state.current_stock}
                    </td>
                    <td style={{width:"50px"}}>
                        <input type="button" className="btn btn-warning" value="Edit" onClick={() => this.preEdit(1)} style={{width:"125px"}}/>
                        <input type="button" className="btn btn-primary" value="Add Variant" onClick={() => this.preAddVariant(this.props.id, 2)} style={{width:"125px"}}/>
                        <input type="button" className="btn btn-danger" value="Remove Variant" onClick={() => this.removeVariant(this.props.id)} style={{width:"125px"}}/>
                        {this.props.children}                  
                    </td>
                </tr>
        );
    }
    else if (this.state.edit === 1) {
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
                    {this.props.Option_Size(2)}
                    </select>
                </td>
                <td>
                    <input ref="estock" class="form-control" type="number" defaultValue={this.state.current_stock} style={{width:"50px"}}/>
                </td>
                <td>
                    <input type="button" className="btn btn-success" value="Save" onClick={() => this.onEditClick(this.props.id, 0)} style={{width:"125px"}}/>
                    <input type="button" className="btn btn-warning" value="Cancel" onClick={() => this.onCancelClick(0)} style={{width:"125px"}}/>
                </td>
            </tr>
    );
    }
    else if (this.state.edit === 2) {
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
                    <select ref="addVariantColor" class="form-control" onChange={this.changeColor} value={this.state.value}>
                        {this.renderNotExistColor()}
                    </select>
                </td>
                <td colSpan={2}>
                {this.renderVariantSize()}
                </td>

                <td style={{width:"50px"}}>
                    <input type="button" className="btn btn-success" value="Add" onClick={() => this.onAddVariant(0)} style={{width:"125px"}}/>
                    <input type="button" className="btn btn-warning" value="Cancel" onClick={() => this.onCancelClick(0)} style={{width:"125px"}}/>                 
                </td>
            </tr>
    );
    }
    }
}

export default AdminInput;

