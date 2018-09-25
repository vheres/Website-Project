import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import DetailPage from './components/DetailPage';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Footer from './components/Footer';
import Admin from './components/Admin';
import { Grid, Row, Col } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import './supports/css/font-awesome.css';
import './supports/css/bootstrap.css'
import { connect } from 'react-redux';
import { keepLogin, onLogout, cookieChecked } from './actions';
import { Route, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import axios from 'axios';

const cookies = new Cookies();

class App extends Component {
  componentWillMount() {
    const theCookie = cookies.get('myCookie');
    if (theCookie !== undefined) {
      this.props.keepLogin(theCookie);
    }
    else {
      this.props.cookieChecked();
    }
    console.log(this.props.auth);

    axios.get('http://localhost:1995/users')
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  componentWillReceiveProps(newProps) {
    if(newProps.auth.username === "") {
      cookies.remove('myCookie');
    }
  }

  render() {
    if (this.props.auth.cookieCheck === true) {
      return (
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={12} >
              <Header />
            </Col>
          </Row>
          <br />
          <Row className="show-grid">
            <Col xs={12} >
              <Route exact path="/" component={HomePage}/>
              <Route path="/catalog" component={CatalogPage}/>
              <Route path="/detail" component={DetailPage}/>
              <Route path="/cart" component={CartPage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              <Route path="/admin" component={Admin}/>
            </Col>
          </Row>
          <Row className="show-grid">
            <Footer />
          </Row>
        </Grid>
      );
    }
    else {
      return <div>Authentication Checking</div>
    }
    
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(App));
