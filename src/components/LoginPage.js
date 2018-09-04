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

import { onLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Cookies from 'universal-cookie';

import img1 from '../assets/img/gallery/07.jpg';
import rick from '../assets/rick.png';
import rick2 from '../assets/rick2.jpg';
import rick3 from '../assets/rick3.jpg';

const cookies = new Cookies();

class LoginPage extends Component {
    componentWillReceiveProps(newProps) {
        if(newProps.auth.username !== "") {
            cookies.set('myCookie', newProps.auth.email, { path: '/' });
        }
    }
    onLoginClick = () => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        this.props.onLogin({ email, password });
    }


    render() {
        console.log(this.props.auth)
        console.log(this.props.cart);
        if(this.props.auth.username == "") {
            return(
                <div>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={2}>
                            </Col>
                            <Col xs={8}>
                                <PageHeader>
                                LOGIN
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
                                    <a href="reset.html" className="pull-right login-forgot">Forgot password?</a>
                                </Row>
                                <Row>
                                    <input type="button" class="btn btn-primary login-button" value="Login" onClick={this.onLoginClick}/>
                                </Row> 
                                <Row>
                                    <h2 className="badge badge-danger pull-right login-error">{this.props.auth.error}</h2>
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
    const cart = state.cart;

    // return { users, auth };
    return { auth, cart };
}

// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default connect(mapStateToProps, { onLogin })(LoginPage);