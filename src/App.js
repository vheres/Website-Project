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
import './supports/css/font-awesome.css'

import { Route } from 'react-router-dom';
import './supports/css/bootstrap.css'

class App extends Component {
  render() {
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
}

export default App;
