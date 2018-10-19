import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { onLogin } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import img1 from '../assets/img/gallery/07.jpg';

const cookies = new Cookies();

class LoginPage extends Component {
    componentWillReceiveProps(newProps) {
        if(newProps.auth.firstname !== "") {
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
        if(this.props.auth.firstname == "") {
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

    // return { users, auth };
    return { auth };
}

// export default connect(mapStateToProps, { onLoginSuccess })(LoginPage); //connect(jalur kiri (GS>COM) mapStateToProps, jalur kanan(COM>GS) ActionCreator)
export default connect(mapStateToProps, { onLogin })(LoginPage);