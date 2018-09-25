import React, { Component } from 'react';
import { Thumbnail, Col, Row } from 'react-bootstrap';

class ItemDetail extends Component {
    render() {
        return (
            <Col xs={3} >
                <Thumbnail src={this.props.Link} alt={this.props.Name} className="item-detail" onClick={() => this.props.detailButton(this.props.id)}>
                    <Row style={{height:50}}>
                        <h4 align="center" className="text-ellipsis">{this.props.Name}</h4>
                        {/* <p className="item-text-detail">{this.props.Description}</p> */}
                    </Row>
                    <Row>
                        <strong><h4 className="item-text-detail">${this.props.Price}</h4></strong>
                    </Row>
                    <Row style={{height:25}}>
                        <p className="item-text-detail">#{this.props.Brand}, {this.props.Gender}</p>
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

