import React, { Component } from 'react';
import Carouselclass from './Carousel';
import LinkedImage from './LinkedImage';
import Featured from './Featured';
import SubFooter from './SubFooter';
import Filter from './Filter';
import Pagination from './Pagination';
import StarRating from './StarRating';
import ParamwLabel from './ParamwLabel';
import Param from './Param';
import { Grid, Row, Col, PageHeader, Button, DropdownButton, MenuItem, FormGroup, ControlLabel, Image, Form, FormControl, Checkbox } from 'react-bootstrap';

import { onRegister } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import img1 from '../assets/img/gallery/07.jpg';
import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

class RegisterPage extends Component {
    onRegisterClick = () => {
        this.props.onRegister({
            username: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            cart: []
        });
    }


    render() {
        console.log(this.props.auth)
        if(this.props.auth.username == "") {
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
                                {/* <form id="Login">
                                    <div class="form-group">
                                        <input type="username" ref="username" class="form-control" id="inputUsername" placeholder="Username" />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" ref="email" class="form-control" id="inputEmail" placeholder="Email Address" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" ref="password" class="form-control" id="inputPassword" placeholder="Password" />
                                    </div>
                                    <div>
                                        <input type="button" class="btn btn-primary" value="Register" onClick={this.onRegisterClick}/>
                                    </div>
                                </form> */}
                                <form id="Login" className="login-form">
                                <Row>
                                    <Col xs={2}>
                                    Username: 
                                    </Col>
                                    <Col xs={10}>
                                        <input type="text" ref="username" class="form-control" id="inputUsername" placeholder="Username" /><br/>
                                    </Col>
                                </Row>
                                <Row>
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
                                        <input type="password" ref="password" class="form-control" id="inputPassword" placeholder="Password" /><br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <input type="button" class="btn btn-primary login-button" value="Register" onClick={this.onRegisterClick}/>
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