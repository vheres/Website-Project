import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';


class PaginationClass extends Component {
    renderPagination() {
        var arrLim = [];
        var arrJSX = [];
        for (let i = 0; i < this.props.count; i++) {
            arrLim.push(i*20)
            if(this.props.active === i) {
                arrJSX.push(<Pagination.Item onClick={() => this.props.PageClick(arrLim[i], i)} active>{i+1}</Pagination.Item>)
            }
            else {
                arrJSX.push(<Pagination.Item onClick={() => this.props.PageClick(arrLim[i], i)}>{i+1}</Pagination.Item>)
            }
        }
        return arrJSX;
    }
    render() {
        return(
            <Pagination>
                {this.renderPagination()}
            </Pagination> 
        );
    }
}

export default PaginationClass;