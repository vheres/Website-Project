
import React, { Component } from 'react';  // React, { Component } -> destructuring
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Col, FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actions';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from '../actions';
import { runInDebugContext } from 'vm';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import Select from 'react-select';

const cookies = new Cookies();

class Header extends Component { //kalo gak pake destructuring, tulisnya React.Component\
    state = ({ inventory: [], filteredInventory: [], selectedOption: null })
    componentWillMount() {
        const theCookie = cookies.get('myCookie');
        if(theCookie !== undefined) {
            this.props.keepLogin(theCookie);
        } 
        else {
            this.props.cookieChecked();
        }
        this.getAutoCompletion()
    }

    componentWillReceiveProps(newProps) {
        if(newProps.auth.firstname === "") {
            cookies.remove('myCookie');
        }
    }

    getAutoCompletion() {
        axios.get(API_URL_1 + '/autocompletion')
        .then(response => {
            var arrJSX = [];
            response.data.map((item, count) => {
                arrJSX.push({value: item.name, label: item.name})
            })
            this.setState({inventory:arrJSX})
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        if(selectedOption != "") {
            this.props.history.push(`/catalog?name=${selectedOption.value}`)
        }
      }

    // Filter inventory -> tidak dipakai
    // handleOnInputChange = (selectedOption) => {
    //     var tempArr = []
    //     if (selectedOption.length >= 3) {
    //         var regex = new RegExp(selectedOption,"gi");
    //         this.state.inventory.filter((item) => {
    //             if (regex.test(item.label)) {
    //                 tempArr.push(item)
    //             }     
    //            })
    //            console.log(tempArr)
    //         this.setState({filteredInventory: tempArr})
    //     } else {
    //         this.setState({filteredInventory: []})
    //     }
    // }

    // search bar tanpa react-select
    // onSearch(enter) {
    //     if (enter.which == 13) {
    //         this.handleOnSearch();
    //     }  
    // }

    // handleOnSearch() {
    //     var search = document.getElementById("inputSearch").value
    //     if (search != "") {
    //         this.props.history.push(`/catalog?name=${search}`)
    //     }
    //     else {
    //         this.props.history.push(`/catalog`)
    //     }
        
    // }

    onLogoutClick = () => {
        this.props.onLogout();
    }

    onLinkClick = (target) => {
    this.props.history.push(target)
    }

    renderNavbar = () => {
        const { selectedOption } = this.state;   
        if(this.props.auth.firstname !== "") {
            if(this.props.auth.category == 'customer') {
                return(
                    <Grid fluid>
                        <Row className="show-grid">
                            <Navbar fixedTop={true} collapseOnSelect fluid className="navbar-css">
                            <Navbar.Header>
                                <Navbar.Brand>
                                <Link to="/" className="Title-Font" style={{color: "rgb(51, 27, 0)"}}>BOOTSTRAP</Link>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick(`/catalog`)}>
                                    <h4 className="header-text">Shop</h4>
                                </NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <Navbar.Form pullLeft style={{width:"400px"}} className="react-select-css">
                                        <Select
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={this.state.inventory}
                                            // onInputChange={this.handleOnInputChange}
                                            placeholder={`Search Boots`}
                                        />    
                                    </Navbar.Form>
                                {/* <NavItem className="margin-search-bar">
                                    <Navbar.Form pullLeft>
                                        <FormGroup>
                                            <FormControl type="text" class="form-control" id="inputSearch" placeholder="Search Boots or Brands" style={{width:"400px"}} onKeyPress={this.onSearch.bind(this)}/>{' '}
                                            <Button type="submit" className="btn btn-orange" onClick={this.handleOnSearch.bind(this)}><i className="fa fa-search"></i></Button>
                                        </FormGroup>
                                    </Navbar.Form>
                                </NavItem> */}
                                <NavItem eventKey={5} className="margin-cart" >
                                    <i className="fa fa-shopping-cart user-icon" style={{color: "rgb(51, 27, 0)"}} onClick={()=>this.onLinkClick(`/cart`)}></i>
                                </NavItem>
                                <NavDropdown eventKey={6} title={<i class="fa fa-user" style={{color: "rgb(51, 27, 0)"}}></i>} id="basic-nav-dropdown" className="user-icon">
                                    <MenuItem eventKey={6.1} onClick={()=>this.onLinkClick("/profile")}>
                                        <h4 className="header-text">Profile</h4>
                                    </MenuItem>
                                    <MenuItem eventKey={6.2} onClick={this.onLogoutClick}>
                                        <h4 className="header-text">Log Out</h4>
                                    </MenuItem>
                                </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <br />
                        </Row>
                    </Grid>
                );
            } else if (this.props.auth.category == 'admin') {
                return(
                    <Grid fluid>
                        <Row className="show-grid">
                            <Navbar fixedTop={true} collapseOnSelect fluid className="navbar-css">
                            <Navbar.Header>
                                <Navbar.Brand>
                                <Link to="/" className="Title-Font" style={{color: "rgb(51, 27, 0)"}}>BOOTSTRAP</Link>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick(`/catalog`)}>
                                    <h4 className="header-text">Shop</h4>
                                </NavItem>
                                <NavItem eventKey={4} className="header-button" onClick={()=>this.onLinkClick(`/admin`)}>
                                    <h4 className="header-text">Admin</h4>
                                </NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <Navbar.Form pullLeft style={{width:"400px"}} className="react-select-css">
                                        <Select
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={this.state.inventory}
                                            // onInputChange={this.handleOnInputChange}
                                            placeholder={`Search Boots`}
                                        />    
                                    </Navbar.Form>
                                {/* <NavItem className="margin-search-bar">
                                    <Navbar.Form pullLeft>
                                        <FormGroup>
                                            <FormControl type="text" class="form-control" id="inputSearch" placeholder="Search Boots or Brands" style={{width:"400px"}} onKeyPress={this.onSearch.bind(this)}/>{' '}
                                            <Button type="submit" className="btn btn-orange" onClick={this.handleOnSearch.bind(this)}><i className="fa fa-search"></i></Button>
                                        </FormGroup>
                                    </Navbar.Form>
                                </NavItem> */}
                                <NavItem eventKey={5} className="margin-cart" >
                                    <i className="fa fa-shopping-cart user-icon" style={{color: "rgb(51, 27, 0)"}} onClick={()=>this.onLinkClick(`/cart`)}></i>
                                </NavItem>
                                <NavDropdown eventKey={6} title={<i class="fa fa-user" style={{color: "rgb(51, 27, 0)"}}></i>} id="basic-nav-dropdown" className="user-icon">
                                    <MenuItem eventKey={6.1} onClick={()=>this.onLinkClick("/profile")}>
                                        <h4 className="header-text">Profile</h4>
                                    </MenuItem>
                                    <MenuItem eventKey={6.2} onClick={this.onLogoutClick}>
                                        <h4 className="header-text">Log Out</h4>
                                    </MenuItem>
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
        } else {
            return(
                <Grid fluid className="no-margin">
                    <Row className="show-grid">
                        <Navbar fixedTop={true} collapseOnSelect fluid className="navbar-css">
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <Link to="/" className="Title-Font" style={{color: "rgb(51, 27, 0)"}}>BOOTSTRAP</Link>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                <NavItem eventKey={2} className="header-button" onClick={()=>this.onLinkClick(`/catalog`)}>
                                    <h4 className="header-text">Shop</h4>
                                </NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <Navbar.Form pullLeft style={{width:"400px"}} className="react-select-css">
                                        <Select
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={this.state.inventory}
                                            // onInputChange={this.handleOnInputChange}
                                            placeholder={`Search Boots`}
                                        />    
                                    </Navbar.Form>    
                                {/* <NavItem className="margin-search-bar">
                                    <Navbar.Form pullLeft>
                                        <FormGroup>
                                            <FormControl type="text" class="form-control" id="inputSearch" placeholder="Search Boots or Brands" style={{width:"400px"}} onKeyPress={this.onSearch.bind(this)}/>{' '}
                                            <Button type="submit" className="btn btn-orange" onClick={this.handleOnSearch.bind(this)}><i className="fa fa-search"></i></Button>
                                        </FormGroup>
                                    </Navbar.Form>
                                </NavItem> */}
                                <NavItem eventKey={5} className="margin-cart" >
                                    <i className="fa fa-shopping-cart user-icon" style={{color: "rgb(51, 27, 0)"}} onClick={()=>this.onLinkClick(`/cart`)}></i>
                                </NavItem>
                                <NavDropdown eventKey={6} title={<i class="fa fa-user" style={{color: "rgb(51, 27, 0)"}}></i>} id="basic-nav-dropdown" className="user-icon">
                                    <MenuItem eventKey={6.1} onClick={()=>this.onLinkClick("/login")}>
                                        <h4 className="header-text">Login</h4>
                                    </MenuItem>
                                    <MenuItem eventKey={6.2} onClick={()=>this.onLinkClick("/register")}>
                                        <h4 className="header-text">Register</h4>
                                    </MenuItem>
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

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(Header));