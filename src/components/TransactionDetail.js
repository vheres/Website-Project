import React, { Component } from 'react';
import TransactionSelect from './TransactionSelect';
import { Grid, Row, Col, PageHeader, Button, Table, Panel } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

class TransactionDetail extends Component {
    state={transaction_select: []}

    parseDate() {
        var d = this.props.date.split(``);
        var temp = new Array();
        for (var i = 0; i < 10; i++) {
            temp.push(d[i])
        }
        d = temp.join(``)
        d = d.split('-')
        d[2]++;
        d = d.join('-')
        return d;
    }

    renderTransactionSelect() {
        console.log(this.state.transaction_select)
        if (this.state.transaction_select.length === 0) {
            return
        }
        else if (this.state.transaction_select.length > 0) {
            return this.state.transaction_select.map((item, count) => {
                return <TransactionSelect index={count + 1} id={item.id} transaction_id={item.transaction_id} product={item.product} color={item.color} size={item.size} quantity={item.quantity} price={item.price}>
                </TransactionSelect>
            })
        }
    }

    onTransactionSelect(id) {
        console.log(id)
        axios.get(API_URL_1 + "/transaction_select?id=" + id)
            .then(item => {
                this.setState({ transaction_select: item.data.transaction_select })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <Panel eventKey={this.props.id} onClick={()=>this.onTransactionSelect(this.props.id)}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        <Grid fluid>
                            <Row>
                                <Col md={8}>
                                    <strong>Transaction id: {this.props.id}</strong>, date: {this.parseDate()}, time: {this.props.time}
                                </Col>
                                <Col md={4} className="pull-right">
                                    <strong>Total Price: {this.props.total_price}</strong>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <Grid fluid>
                        {this.renderTransactionSelect()}
                    </Grid>
                </Panel.Body>
            </Panel>
        )
    }
}
// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default TransactionDetail;