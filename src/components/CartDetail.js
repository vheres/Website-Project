import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

class CartDetail extends Component {
    render() {
        console.log('render cart detail')
        return(
            // <tr>
            //     <td>{this.props.count}</td>
            //     <td><img src={this.props.link} width="100px"/></td>
            //     <td>{this.props.product_name}</td>
            //     <td>{this.props.gender}</td>
            //     <td>{this.props.brand}</td>
            //     <td>{this.props.color}</td>
            //     <td>{this.props.size}</td>
            //     <td>{this.props.quantity}</td>
            //     <td>${this.props.price}</td>
            //     <td>{this.props.children}</td>
            // </tr>
            <tr>
                <td>{this.props.count}</td>
                <td><img src={this.props.link} width="100px"/></td>
                <td><span style={{'font-size': '20px'}}>{this.props.product_name}</span><br/>{this.props.brand}, {this.props.gender}<br/>{this.props.color}, {this.props.size}</td>
                <td>Quantity: {this.props.quantity}</td>
                <td>${this.props.price}</td>
                <td>{this.props.children}</td>
            </tr>
        );
    }
}

export default CartDetail;