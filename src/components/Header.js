
import React, { Component } from 'react';  // React, { Component } -> destructuring
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Grid, Row, Modal, Col, Table, PageHeader } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actions';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from '../actions';
import { runInDebugContext } from 'vm';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import Select from 'react-select';
import CartDetail from './CartDetail';

const cookies = new Cookies();

class Header extends Component { //kalo gak pake destructuring, tulisnya React.Component\
    state = ({ inventory: [], filteredInventory: [], selectedOption: null, carts: [], edit_modal: false })
    componentWillMount() {
        const theCookie = cookies.get('myCookie');
        if(theCookie !== undefined) {
            this.props.keepLogin(theCookie);
        } 
        else {
            this.props.cookieChecked();
        }
        this.getAutoCompletion();
        this.getUserCart();
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

    // CART SECTION
    getUserCart() {
        axios.get(API_URL_1 + "/cart", {
            params: {
                id: this.props.auth.id
            }
        })
            .then(item => {
                this.setState({ carts: item.data.cart })
                console.log(this.state.carts)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onRemoveClick(id) {
        if(window.confirm('Are you sure?')) {
            axios.delete(API_URL_1 + '/remove_cart_item', {
                params: {
                cart_id: id,
                user_id: this.props.auth.id
                }
            })
            .then((item) => {
                alert("Delete Success!");
                this.setState({ carts: item.data.cart })
                console.log(this.state.carts)
            })
            .catch((err) => {
                alert("Delete Error!");
                console.log(err);
            })
        }  
    }

    onCheckOutClick() {
        console.log(this.state.carts)
        axios.post(API_URL_1 + '/check_out', {
            cart: this.state.carts,
            total_price: this.calculateTotalPrice(),
            user_id: this.props.auth.id
        }).then((res) => {
            if(res.data.stockErr === undefined) {
                alert('Check Out Success!')
                this.setState({carts: [], edit_modal: false})
                this.props.history.push(`/profile`)
            }
            else {
                var errText = ``;
                res.data.stockErr.map((item,count) => {
                    errText += `${count+1}. \n${item}`
                })
                alert(errText)
            }
            
        })
    }

    calculateTotalPrice() {
        this.totalPrice = 0;
        this.state.carts.map(item => {
            this.totalPrice += item.price;
        })
        return this.totalPrice;
    }

    renderItemList = () => {
        console.log(this.state.carts)
        return this.state.carts.map((item, count) =>
            <CartDetail count={count + 1} key={item.id} id={item.id} user_id={item.user_id} firstname={item.firstname} product_id={item.product_id} link={item.link} product_name={item.product_name} 
            gender={item.gender} brand_id={item.brand_id} brand={item.brand} color_id={item.color_id} color={item.color} size_id={item.size_id} size={item.size} 
            quantity={item.quantity} price={item.price}>
            <input type="button" className="btn btn-danger" value="Remove" style={{width:"100px"}} onClick={()=>this.onRemoveClick(item.id)}/>
            </CartDetail>
        )
    }

    renderCartPage() {
        if (this.state.carts.length == 0 ) {
            return (
                <Grid fluid>
                    <Row>
                        <Col mdOffset={2} md={8}>
                            <img src="https://cdn3.iconfinder.com/data/icons/flat-icons-big-sized/64/shopping-card-512.png" alt="empty cart" className="empty-cart" style={{width: '150px'}}></img>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className="text-center">Your cart is empty, shop now!</h4>
                    </Row>
                    <Row>
                        <input type="button" className="btn btn-success back-to-shop" value="Go to shop!" onClick={()=>{this.setState({edit_modal: false});this.props.history.push('/catalog')}}/>
                    </Row>
                </Grid>
            )
        } else {
            return (
                <Grid fluid>
                    <Table>
                        <thead>
                            <tr>
                            <th style={{width: '10px'}}>No.</th>
                            <th style={{width: '80px'}}>Image</th>
                            <th style={{width: '300px'}}>Item</th>
                            <th style={{width: '150px'}}>Quantity</th>
                            <th style={{width: '100px'}}>Price</th>
                            <th style={{width: '100px'}}>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItemList()}
                            <tr>
                                <td colSpan={3}></td>
                                <td style={{'font-size': '18px'}}><strong>Total Price:</strong></td>
                                <td style={{'font-size': '18px'}}><strong>${this.calculateTotalPrice()}</strong></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </Grid>
            )
        }
    }
    // END CART SECTION

    // MODAL SECTION
    handleClose() {
        this.setState({ edit_modal: false });
    }

    handleShow() {
        this.getUserCart();
        this.setState({ edit_modal: true });
    }
    // END MODAL SECTION

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
                                    <i className="fa fa-shopping-cart user-icon" style={{color: "rgb(51, 27, 0)"}} onClick={this.handleShow.bind(this)}></i>
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
                                    <i className="fa fa-shopping-cart user-icon" style={{color: "rgb(51, 27, 0)"}} onClick={this.handleShow.bind(this)}></i>
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
                                    <i className="fa fa-shopping-cart user-icon" style={{color: "rgb(51, 27, 0)"}} onClick={()=>this.onLinkClick(`/login`)}></i>
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
            <section>
            {this.renderNavbar()}
            <Modal show={this.state.edit_modal} onHide={this.handleClose.bind(this)} bsSize="large">
            <Modal.Header closeButton>
                <Modal.Title><span style={{'font-size': '30px'}}>Your Cart</span><span><input type="button" style={{'margin-right': '15px'}} className="btn btn-warning pull-right" value="Clear Cart" onClick={()=>this.onClearCartClick()}/></span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {this.renderCartPage()}
            </Modal.Body>
            <Modal.Footer>
                <input type="button" className="btn btn-danger" onClick={this.handleClose.bind(this)} value="Back"/>
                <input type="button" className="btn btn-success" onClick={()=>this.onCheckOutClick()} value="Proceed to Payment"/>
            </Modal.Footer>
            </Modal>
            </section>
    );
}
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(Header));