import React, { Component } from 'react';
import TransactionDetail from './TransactionDetail';
import TransactionSelect from './TransactionSelect';
import DateClass from './DatePickerClass';
import { Grid, Row, Col, PageHeader, Button, Table, Modal, Panel, PanelGroup } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';


import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class ProfilePage extends Component {
    state = { profile: [], edit_modal: false, transactions: [], date: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")], selectedOption: [], destination: [], filtered_destination: [], activeKey:'1'}

    componentWillMount() {
        this.getUserInfo();
        this.getTransactionHistory();
    }

    getUserInfo() {
        axios.get(API_URL_1 + "/profile_info?id=" + this.props.auth.id)
        .then(item => {
            this.setState({profile: item.data.result[0]})
        })
    }

    getTransactionHistory() {
        axios.get(API_URL_1 + "/transaction_history", {
            params: {
                id: this.props.auth.id,
                date: this.state.date
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

    getDestinationList() {
        axios.get(API_URL_1 + '/destination')
        .then(response => {
            var arrJSX = [];
            response.data.map((item, count) => {
                arrJSX.push({value:item.destination_code, label:`${item.province}, ${item.city}, ${item.subdistrict}`})
            })
            this.setState({destination: arrJSX})
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

    handleInputChange(selectedOption) {
        if (selectedOption.length >= 3) {
            var filterArr = [];
            var regex = new RegExp(selectedOption, "i")
            for (var num in this.state.destination) {
                if ( regex.test(this.state.destination[num].label)) {
                    filterArr.push(this.state.destination[num])
                }
            }
            this.setState({filtered_destination: filterArr})
        } else if (selectedOption.length < 3) {
            this.setState({filtered_destination: []})
        }
    }

    handleClose() {
        this.setState({ edit_modal: false });
    }
    
    handleShow() {
        this.getDestinationList();
        this.setState({ selectedOption:{value:this.state.profile.destination_code, label:this.state.profile.kota}, edit_modal: true });
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
      }

    onKeyPress(enter) {
        console.log(enter.which)
    }

    onEditSave() {
        var gender = '';
        if (document.getElementById('male').checked == true) {
            gender = document.getElementById('male').value
        } else {
            gender = document.getElementById('female').value
        }
        if(gender == '' || this.refs.address.value == '' || this.refs.kodepos.value == '' || this.refs.phone.value == '' || this.state.selectedOption.label == '') {
            alert('Please fill everything!');
        } else {
            axios.put(API_URL_1 + '/users/' + this.props.auth.id, {
                gender: gender,
                phone: this.refs.phone.value,
                address: this.refs.address.value,
                kota: this.state.selectedOption.label,
                kodepos: this.refs.kodepos.value,
                destination_code: this.state.selectedOption.value
            }).then((response) => {
                alert('Edit Success')
                this.getUserInfo()
                this.setState({ edit_modal: false });
            })
        }
    }

    renderGenderOption() {
        if (this.state.profile.gender == 'male') {
            return (
                <Col xs={8}>
                    <input type="radio" id="male" name="gender" value="male" checked></input> Male{' '}
                    <input type="radio" id="female" name="gender" value="female"></input> Female{' '}
                </Col>
            )
        } else {
            return (
                <Col xs={8}>
                    <input type="radio" id="male" name="gender" value="male"></input> Male{' '}
                    <input type="radio" id="female" name="gender" value="female" checked></input> Female{' '}
                </Col>
            )
        }
    }

    renderTransactionHistory() {
        return this.state.transactions.map((item, count) =>
            <TransactionDetail id={item.id} user_id={item.user_id} date={item.date} time={item.time} total_price={item.total_price}>
            <input type="button" className="btn btn-primary" onClick={()=>this.onTransactionSelect(item.id)} value="Detail"></input>
            </TransactionDetail>
        )
    }

    onDatePick() {
        return (
            {
                startDate: (temp) => {
                    this.state.date[0] = temp.value;
                },
                endDate: (temp) => {
                    this.state.date[1] = temp.value;
                },
                filterDate: () => this.getTransactionHistory()
            }
        )
    }

    renderDatePicker() {
        return (
            <Col mdOffset={2} md={4}>
                <Row>
                    <h4>Sort by Date:</h4>
                </Row>
                <Row>
                    <Table>
                        <tr>
                            <th>From</th>
                            <th style={{width:"200px"}}><DateClass datePick={(temp)=>this.onDatePick()['startDate'](temp)}/></th>
                            <th>to</th>
                            <th style={{width:"200px"}}><DateClass datePick={(temp)=>this.onDatePick()['endDate'](temp)}/></th>
                            <th><input type="button" className="btn btn-success" value="search" style={{width:"80px"}} onClick={()=>this.onDatePick()['filterDate']()}/></th>
                        </tr>
                    </Table>
                </Row> 
            </Col>
        )
    }

    renderProfilePage() {
        return(
            <Grid fluid className="margin-top-15">
                <Row>
                    <Col md={2}></Col>
                    <Col md={3}>
                        <img src="https://i.stack.imgur.com/l60Hf.png" alt="profile" style={{width:"100%"}}></img>
                    </Col>
                    <Col md={3}>
                        <Row className="margin-top-30">
                            <Col md={8}>
                            <h3>{this.state.profile.firstname} {this.state.profile.lastname}</h3>
                            </Col>
                            <Col md={4}>
                            <i class="fa fa-edit profile-edit-icon" onClick={this.handleShow.bind(this)}></i>
                            <Modal show={this.state.edit_modal} onHide={this.handleClose.bind(this)} bsSize="large">
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Profile</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form id="Register">
                                        <Row>
                                            <Col xs={2}>
                                            <p className="text-right register-form-text">Name:</p> 
                                            </Col>
                                            <Col xs={8}>
                                                <p>{this.state.profile.firstname} {this.state.profile.lastname}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={2}>
                                            <p className="text-right register-form-text">Email:</p> 
                                            </Col>
                                            <Col xs={8}>
                                            <p>{this.state.profile.email}</p>
                                            </Col>
                                        </Row>
                                        <Row className="register-form">
                                            <Col xs={2}>
                                            <p className="text-right">Gender:</p>  
                                            </Col>
                                            {this.renderGenderOption()}
                                        </Row>
                                        <Row>
                                            <Col xs={2}>
                                            <p className="text-right register-form-text">Phone:</p>
                                            </Col>
                                            <Col xs={3}>
                                            <input ref="phone" type="text" className="form-control" placeholder="Phone" defaultValue={this.state.profile.phone}></input><br/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={2}>
                                            <p className="text-right register-form-text">Address:</p>  
                                            </Col>
                                            <Col xs={8}>
                                                <textarea type="text" ref="address" class="form-control" id="inputAdress" placeholder="Address" defaultValue={this.state.profile.address} onKeyPress={this.onKeyPress.bind(this)} style={{resize:"none"}} rows= '4' cols= '80'/><br/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={2}>
                                            <p className="text-right register-form-text">Kota dan Kecamatan:</p>
                                            </Col>
                                            <Col xs={8}>
                                                <Select
                                                    value={this.state.selectedOption}
                                                    onChange={this.handleChange}
                                                    options={this.state.filtered_destination}
                                                    onInputChange={this.handleInputChange.bind(this)}
                                                    placeholder={`Pilih Kota/Kecamatan`}
                                                    defaultValue={{value: this.state.profile.destination_code, label: this.state.profile.kota}}
                                                    defaultInputValue={this.state.profile.kota}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col xs={2}>
                                        <p className="text-right register-form-text">Postal Code:</p>
                                        </Col>
                                        <Col xs={3}>
                                        <input ref="kodepos" type="text" className="form-control" placeholder="Postal Code" defaultValue={this.state.profile.kodepos}></input>
                                        </Col>        
                                        </Row>                     
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <input type="button" className="btn btn-danger" onClick={this.handleClose.bind(this)} value="Cancel"/>
                                    <input type="button" className="btn btn-success" onClick={()=>this.onEditSave()} value="Save"/>
                                </Modal.Footer>
                                </Modal>
                            </Col>
                        </Row>
                        <Row>
                            <Table responsive>
                                <tbody>
                                    <tr>
                                        <td style={{width:"10px"}}>
                                            <i className="fa fa-user"></i>
                                        </td>
                                        <td>
                                            <span>{this.state.profile.gender}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fa fa-phone"></i>
                                        </td>
                                        <td>
                                            <span>{this.state.profile.phone}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <i className="fa fa-envelope"></i>
                                        </td>
                                        <td>
                                            <span>{this.state.profile.email}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span><i className="fa fa-home"></i></span>
                                        </td>
                                        <td>
                                            <span>{this.state.profile.address}</span>
                                            <div>{this.state.profile.kota}</div>
                                            <div>{this.state.profile.kodepos}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>    
                    </Col>
                </Row>
                <Row className="margin-top-15">
                    {this.renderDatePicker()}
                </Row>
                <Row>
                <Col mdOffset={2} md={5}>
                        <Row>
                            <h4>Transaction History</h4>
                        </Row>          
                        <Row>
                        <PanelGroup
                            accordion
                            id="accordion-history"
                            activeKey={this.state.activeKey}
                            onSelect={this.handleSelect.bind(this)}
                        >
                        {this.renderTransactionHistory()}
                        </PanelGroup>
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