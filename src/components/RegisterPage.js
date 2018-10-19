import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import { onRegister } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import { API_URL_1 } from '../supports/api-url/apiurl';
import axios from 'axios';

import img1 from '../assets/img/gallery/07.jpg';

const cookies = new Cookies();

class RegisterPage extends Component {
    state = { selectedOption: [], destination: [], filtered_destination: [] }
    componentWillMount() {
        this.getDestinationList();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.auth.firstname !== "") {
            cookies.set('myCookie', newProps.auth.email, { path: '/' })
        }
    }

    getDestinationList() {
        axios.get(API_URL_1 + '/destination')
        .then(response => {
            var arrJSX = [];
            response.data.map((item, count) => {
                arrJSX.push({value:item.destination_code, label:`${item.province}, ${item.city}, ${item.subdistrict}`})
            })
            this.setState({destination: arrJSX})
            console.log(arrJSX)
            console.log(this.state.destination)
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

    onRegisterClick = () => {
        if (this.refs.firstname.value == '' || this.refs.lastname.value == '' || this.refs.phone.value == '' || this.refs.email.value == '' || this.refs.password1.value == '' || this.refs.password2.value == '' || this.refs.address.value == '' || this.refs.kodepos.value == '' || this.state.selectedOption.label == '' || (document.getElementById('male').checked == false && document.getElementById('female').checked == false)) {
            alert(`please fill everything!`)
        } else {
            if (this.refs.password1.value !== this.refs.password2.value) {
                alert(`your passwords does not match!`)
            } else {
                var gender = '';
                if(document.getElementById('male').checked) {
                    gender = document.getElementById('male').value
                } else {
                    gender = document.getElementById('female').value
                }
                this.props.onRegister({
                    firstname: this.refs.firstname.value,
                    lastname: this.refs.lastname.value,
                    gender: gender,
                    phone: this.refs.phone.value,
                    email: this.refs.email.value,
                    password: this.refs.password1.value,
                    address: this.refs.address.value,
                    kota: this.state.selectedOption.label,
                    kodepos: this.refs.kodepos.value,
                    destination_code: this.state.selectedOption.value
                });
            }
        }
    }


    render() {
        console.log(this.props.auth)
        if(this.props.auth.firstname == "") {
            return(
                <div>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={2}>
                            </Col>
                            <Col xs={8}>
                                <PageHeader>
                                REGISTER
                                </PageHeader>
                            </Col>
                        </Row>
                        </Grid>
                        <Grid>
                        <Row>
                            <Col xs={5}>
                                {/* <LinkedImage thumbImg={img1} myClass="login-image"/> */}
                                <img src={img1} className="login-image"/>
                            </Col>
                            <Col xs={7}>
                                <form id="Login" className="login-form">
                                <Row>
                                    <Col xs={2}>
                                    Name: 
                                    </Col>
                                    <Col xs={5}>
                                        <input type="text" ref="firstname" class="form-control" id="inputFirstName" placeholder="Firstname" />
                                        
                                    </Col>
                                    <Col xs={5}>
                                        <input type="text" ref="lastname" class="form-control" id="inputLastName" placeholder="Lastname" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    Gender: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="radio" id="male" name="gender" value='Male'/>Male
                                        <input type="radio" id="female" name="gender" value='Female'/>Female
                                    </Col>
                                </Row>
                                <Row>
                                    <br/>
                                    <Col xs={2}>
                                    Phone: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="text" ref="phone" class="form-control" id="inputPhone" placeholder="Phone" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <br/>
                                    <Col xs={2}>
                                    Email: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email Address" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    Password: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="password" ref="password1" class="form-control" id="inputPassword1" placeholder="Password" /><br/>
                                        <input type="password" ref="password2" class="form-control" id="inputPassword2" placeholder="Confirm Password" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    Address: 
                                    </Col>
                                    <Col xs={10}>
                                        <textarea type="text" ref="address" class="form-control" id="inputAddress" placeholder="Address" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    Kota dan Kecamatan:
                                    </Col>
                                    <Col xs={10}>
                                        <Select
                                            value={this.state.selectedOption}
                                            onChange={this.handleChange}
                                            options={this.state.filtered_destination}
                                            onInputChange={this.handleInputChange.bind(this)}
                                            placeholder={`Pilih Kota/Kecamatan`}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                    Kode Pos: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="text" ref="kodepos" class="form-control" style={{width:"120px"}} id="inputKodePos" placeholder="Kodepos" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <input type="button" class="btn btn-primary login-button" style={{width:"150px"}} value="Register" onClick={this.onRegisterClick}/>
                                </Row>                              
                                </form>
                            </Col>
                        </Row>
                        <hr />
                    </Grid>
                </div>
            );
        }
        return <Redirect to="/" />; 
    }
}

// Mengambil Global state menjadi property local
const mapStateToProps = (state) => {
    const auth = state.auth;

    // return { users, auth };
    return { auth };
}

// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default connect(mapStateToProps, { onRegister })(RegisterPage);