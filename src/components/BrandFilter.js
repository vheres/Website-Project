import React, { Component } from 'react';
import { FormGroup, Checkbox  } from 'react-bootstrap';

class BrandFilter extends Component {
    render() {
        return(
            <form>
                <FormGroup>
                    <Checkbox>Uniqlo</Checkbox>
                    <Checkbox>H&M</Checkbox>
                    <Checkbox>Pull&Bear</Checkbox>
                    <Checkbox>The Executive</Checkbox>
                    <Checkbox>Zara</Checkbox>
                    <Checkbox>Topman</Checkbox>
                </FormGroup>
            </form>
        );
    }
}

export default BrandFilter;