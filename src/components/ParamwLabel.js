import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class ParamwLabel extends Component {
    render() {
        return(
            <FormGroup controlId="formControlsSelect">
                    <FormControl componentClass="select" placeholder="select">
                        <option value={this.props.param}>{this.props.param}</option>
                        <option value={this.props.param2}>{this.props.param2}</option>
                        <option value={this.props.param3}>{this.props.param3}</option>
                    </FormControl>
            </FormGroup>
        );
    }
}

export default ParamwLabel;