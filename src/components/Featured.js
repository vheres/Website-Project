import React, { Component } from 'react';
import { Thumbnail, Button } from 'react-bootstrap';

class Featured extends Component {
    render() {
        return (
            <Thumbnail src={this.props.thumbImg} alt="242x200">
                <h3>Thumbnail label</h3>
                <p>Description</p>
                <p>
                <Button bsStyle="primary">Button</Button>
                </p>
            </Thumbnail>
        );
    }
}

export default Featured;