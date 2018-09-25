
import React, { Component } from 'react';  // React, { Component } -> destructuring
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavJustified from './NavJustified';
import { onLogout } from '../actions';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from '../actions';

var hello = "Hello, ";
const cookies = new Cookies();

class Header extends Component { //kalo gak pake destructuring, tulisnya React.Component
    componentWillMount() {
        const theCookie = cookies.get('myCookie');
        if(theCookie !== undefined) {
            this.props.keepLogin(theCookie);
        } 
        else {
            this.props.cookieChecked();
        }
        console.log(this.props.auth);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.auth.username === "") {
            cookies.remove('myCookie');
        }
    }

    onLogoutClick = () => {
        this.props.onLogout();
    }

    renderNavbar = () => {   
        if(this.props.auth.username !== "") {
            hello = "Hello, ";
            hello += this.props.auth.username;
            return(
                <Grid fluid>
                    <Row className="show-grid">
                        <Navbar fixedTop={true} inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                            <Link to="/">CouLand</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                            <NavItem eventKey={2}>
                                <Link to="/catalog">Category</Link>
                            </NavItem>
                            <NavItem eventKey={2}>
                                <Link to="/detail">Detail</Link>
                            </NavItem>
                            <NavDropdown eventKey={3} title="Gym" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Free Weight</MenuItem>
                                <MenuItem eventKey={3.2}>Body Weight</MenuItem>
                                <MenuItem eventKey={3.3}></MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                            <NavItem eventKey={4}>
                            <Link to="/cart">Cart</Link>
                            </NavItem>
                            <NavItem eventKey={4}>
                            <Link to="/admin">Admin</Link>
                            </NavItem>
                            </Nav>
                            <Nav pullRight>
                            <NavDropdown eventKey={1} title={hello} id="basic-nav-dropdown">
                                <Link to="/"><input type="button" onClick={this.onLogoutClick} value="logout"/></Link>
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                    </Row>
                    <Row className="pill-header">
                        <Col xs={2}>
                        </Col>
                        <Col xs={8}>
                        <br/>
                        <br/>
                        <br/>
                            <NavJustified />
                        </Col>
                    </Row>
                </Grid>
            );
        }

        return(
            <Grid fluid className="no-margin">
                <Row className="show-grid">
                    <Navbar fixedTop={true} inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">CouLand</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                            <NavItem eventKey={2}>
                                <Link to="/catalog">Category</Link>
                            </NavItem>
                            <NavItem eventKey={2}>
                                <Link to="/detail">Detail</Link>
                            </NavItem>
                            <NavDropdown eventKey={3} title="Gym" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Free Weight</MenuItem>
                                <MenuItem eventKey={3.2}>Body Weight</MenuItem>
                                <MenuItem eventKey={3.3}></MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                            <NavItem eventKey={2}>
                            <Link to="/cart">Cart</Link>
                            </NavItem>
                            <NavItem eventKey={4}>
                            <Link to="/admin">Admin</Link>
                            </NavItem>
                            </Nav>
                            <Nav pullRight>
                            <NavItem eventKey={1}>
                                <Link to="/login">Login</Link>
                            </NavItem>
                            <NavItem eventKey={2}>
                                <Link to="/register">Register</Link>
                            </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                        <br />
                        <br />
                        <br />
                    </Row>
                    <Row className="show-grid" className="pill-header">
                        <Col xs={2}>
                        </Col>
                        <Col xs={8}>
                            <NavJustified />
                        </Col>
                    </Row>
                </Grid>
        );
    }
    render() {
        return (
            this.renderNavbar()
    );
}
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(Header);