
import React, { Component } from 'react';  // React, { Component } -> destructuring
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col, FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actions';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from '../actions';

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
            return(
                <Grid fluid>
                    <Row className="show-grid">
                        <Navbar fixedTop={true} inverse collapseOnSelect fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                            <Link to="/">Boots</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                            <NavItem eventKey={2}>
                                <Link to="/catalog">Category</Link>
                            </NavItem>
                            <NavItem eventKey={4}>
                            <Link to="/cart">Cart</Link>
                            </NavItem>
                            <NavItem eventKey={4}>
                            <Link to="/admin">Admin</Link>
                            </NavItem>
                            </Nav>
                            <Nav pullRight>
                            <NavItem>
                                <FormControl type="text" ref="search" class="form-control" id="inputSearch" placeholder="Search Boots" style={{width:"400px"}}/> 
                            </NavItem>       
                            <NavDropdown eventKey={1} title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
                                <Link to="/profile"><MenuItem className="btn btn-default" style={{width:"100%"}}><Link to="/profile">Profile</Link></MenuItem></Link>
                                <Link to="/"><MenuItem className="btn btn-default" onClick={this.onLogoutClick} style={{width:"100%"}}>Log Out</MenuItem></Link>
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                        <br />
                        <br />
                    </Row>
                </Grid>
            );
        }

        return(
            <Grid fluid className="no-margin">
                <Row className="show-grid">
                    <Navbar fixedTop={true} inverse collapseOnSelect fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Boots</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                            <NavItem eventKey={2}>
                                <Link to="/catalog">Category</Link>
                            </NavItem>
                            <NavItem eventKey={2}>
                                <Link to="/cart">Cart</Link>
                            </NavItem>
                            <NavItem eventKey={4}>
                                <Link to="/admin">Admin</Link>
                            </NavItem>
                            </Nav>
                            <Nav pullRight>      
                            <NavItem>
                            <FormControl type="text" ref="search" class="form-control" id="inputSearch" placeholder="Search Boots" style={{width:"400px"}}/>
                            </NavItem>                                    
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