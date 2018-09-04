import React, { Component } from 'react';
import { Thumbnail, Image } from 'react-bootstrap';

class LinkedImage extends Component {
    render() {
        return (
            <Thumbnail href="#" alt="Rick" src={this.props.thumbImg} className={this.props.myClass}/>
        );
    }
}

export default LinkedImage;