import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Param extends Component {
    render() {
        return(
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>{this.props.title}</ControlLabel>
                    <FormControl componentClass="select" placeholder="select">
                        <option value={this.props.param}>{this.props.param}</option>
                        <option value={this.props.param2}>{this.props.param2}</option>
                        <option value={this.props.param3}>{this.props.param3}</option>
                    </FormControl>
            </FormGroup>
        );
    }
}

export default Param;