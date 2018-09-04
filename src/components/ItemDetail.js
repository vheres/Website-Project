import React, { Component } from 'react';
import { Thumbnail, Button, Col, Row } from 'react-bootstrap';

class ItemDetail extends Component {
    render() {
        return (
            <Col xs={3} >
                <Thumbnail src={this.props.Link} alt="242x200" className="item-detail">
                    <Row>
                        <h3 align="center">{this.props.Name}</h3>
                        <p className="item-text-detail">{this.props.Description}</p>
                        <h4 className="item-text-detail">Rp.{this.props.Price},-</h4>
                        <p className="item-text-detail">Category: {this.props.Category}</p>
                    </Row>
                    <Row>
                        {this.props.children}
                    </Row>
                </Thumbnail>
            </Col>
        );
    }
}

export default ItemDetail;

