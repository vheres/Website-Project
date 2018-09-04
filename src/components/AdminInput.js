import React, { Component } from 'react';
import { Thumbnail, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl'

class AdminInput extends Component {
    state = { edit: false}

    preEdit(status) {
        this.setState({ edit: status})
    }

    onEditClick(id, status) {
        // console.log(this.refs.link.value);
        axios.put(API_URL_1 + '/catalog/' + id, {
            link: this.refs.elink.value,
            name: this.refs.ename.value,
            description: this.refs.edescription.value,
            price: this.refs.eprice.value,
            category: this.refs.ecategory.value
        })
        .then((response) => {
            alert("Edit Success!");
            console.log(response);
            this.props.tempMount();
            this.setState({edit: status})
        })
        .catch((err) => {
            alert("Edit Error!");
        })
    }

    render() {
        if (this.state.edit == false) {
        return (
                <tr>
                    <td>
                        {this.props.id}
                    </td>
                    <td>
                        <img src={this.props.link} width="100px"/>
                    </td>
                    <td>
                        {this.props.name}
                    </td>
                    <td>
                        {this.props.description}
                    </td>
                    <td>
                        {this.props.price}
                    </td>
                    <td>
                        {this.props.category}
                    </td>
                    
                    <td>
                        <input type="button" className="btn btn-warning" value="Edit" onClick={() => this.preEdit(true)}/>
                    </td>
                    <td>
                        {this.props.children}                  
                    </td>
                </tr>
        );
    }
    else if (this.state.edit == true) {
        return (
            <tr>
                <td>
                    {this.props.id}
                </td>
                <td>
                    <input ref="elink" type="text" defaultValue={this.props.link}/>
                </td>
                <td>
                    <input ref="ename" type="text" defaultValue={this.props.name}/>
                </td>
                <td>
                    <textarea ref="edescription" defaultValue={this.props.description} cols="100"/>
                    {/* <input ref="edescription" type="text" defaultValue={this.props.description} style={{width:700}}/> */}
                </td>
                <td>
                    <input ref="eprice" type="text" defaultValue={this.props.price}/>
                </td>
                <td>
                    <input ref="ecategory" type="text" defaultValue={this.props.category}/>
                </td>

                <td>
                    {/* <input type="button" className="btn btn-warning" value="Edit" onClick={this.props.eBut}/> */}
                    <input type="button" className="btn btn-success" value="Save" onClick={() => this.onEditClick(this.props.id, false)}/>
                </td>
            </tr>
    );
    }
    }
}

export default AdminInput;

