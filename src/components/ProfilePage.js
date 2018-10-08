import React, { Component } from 'react';
import TransactionDetail from './TransactionDetail';
import TransactionSelect from './TransactionSelect';
import DateClass from './DatePickerClass';
import { Grid, Row, Col, PageHeader, Button, Table } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';


import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProfilePage extends Component {
    state = { transactions: [], transaction_select: []}

    componentWillMount() {
        this.getTransactionHistory();
        console.log(this.state.transactions)
    }

    getTransactionHistory() {
        axios.get(API_URL_1 + "/transaction_history", {
            params: {
                id: this.props.auth.id
            }
        })
            .then(item => {
                this.setState({ transactions: item.data.transactions })
                console.log(this.state.transactions)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async onTransactionSelect(id) {
        await (this.props.history.push(`/profile?transaction_id=` + id))
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const urlid = params.get('transaction_id');
        axios.get(API_URL_1 + "/transaction_select?id=" + urlid)
            .then(item => {
                this.setState({ transaction_select: item.data.transaction_select })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    renderTransactionHistory() {
        return this.state.transactions.map((item, count) =>
            <TransactionDetail id={item.id} user_id={item.user_id} date={item.date} time={item.time} total_price={item.total_price}>
            <input type="button" className="btn btn-primary" onClick={()=>this.onTransactionSelect(item.id)} value="Detail"></input>
            </TransactionDetail>
        )
    }

    renderTransactionSelect() {
        console.log(this.state.transaction_select)
        if (this.state.transaction_select.length === 0) {
            return
        }
        else if (this.state.transaction_select.length > 0) {
            return this.state.transaction_select.map((item, count) => {
                return <TransactionSelect id={item.id} transaction_id={item.transaction_id} product={item.product} color={item.color} size={item.size} quantity={item.quantity} price={item.price}>
                </TransactionSelect>
            })
        }
    }

    renderProfilePage() {
        return(
            <Grid fluid>
                <Row>
                    <Col md={2}></Col>
                    <Col md={3}>
                        <img src="https://i.stack.imgur.com/l60Hf.png" alt="profile" style={{width:"100%"}}></img>
                    </Col>
                    <Col md={5}>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <td>
                                    <h3>{this.props.auth.username}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>{this.props.auth.email}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Telephone</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Birthday</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Address</span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                    <Row>
                        <h4>Sort by Date:</h4>
                    </Row>
                    <Row>
                        from
                        <DateClass/>
                    </Row>
                    <Row>
                        to
                        <DateClass/>
                    </Row>
                    <Row>
                        <br/>
                        <input type="button" className="btn btn-success" value="sort" style={{width:"150px"}}/>
                    </Row>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <h4>Transaction History</h4>
                        </Row>          
                        <Row>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Transaction Id</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Total Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTransactionHistory()}
                                </tbody>  
                            </Table>                         
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <h4>Transaction Details</h4>
                        </Row>
                        <Row>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Transaction Id</th>
                                    <th>Product</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransactionSelect()}
                            </tbody>  
                        </Table>   
                        </Row>
                    </Col>
                </Row>
                
            </Grid>
        )
    }
    
    render() {
        return (
            this.renderProfilePage()
        ) 
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, )(ProfilePage);