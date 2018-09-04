import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class NavJustified extends Component {
    handleSelect(selectedKey) {
      alert(`selected ${selectedKey}`);
    }

    render() {
        return (
          <div>
            <Nav
              bsStyle="pills"
              justified
              activeKey={1}
              onSelect={key => this.handleSelect(key)}
              // className="pill-header"
            >
              <NavDropdown eventKey="1" title="Men's" id="nav-dropdown" className="pill-detail">
                <div>Clothing</div><hr/>
                <MenuItem eventKey="1.1">Action</MenuItem>
                <MenuItem eventKey="1.2">Another action</MenuItem>
                <MenuItem eventKey="1.3">Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="1.4">Separated link</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey="2" title="Women's" id="nav-dropdown">
                <MenuItem eventKey="2.1">Action</MenuItem>
                <MenuItem eventKey="2.2">Another action</MenuItem>
                <MenuItem eventKey="2.3">Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="2.4">Separated link</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey="3" title="Kids" id="nav-dropdown">
                <MenuItem eventKey="3.1">Action</MenuItem>
                <MenuItem eventKey="3.2">Another action</MenuItem>
                <MenuItem eventKey="3.3">Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="3.4">Separated link</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey="4" title="Accessories" id="nav-dropdown">
                <MenuItem eventKey="4.1">Action</MenuItem>
                <MenuItem eventKey="4.2">Another action</MenuItem>
                <MenuItem eventKey="4.3">Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4.4">Separated link</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey="5" title="Dropdown" id="nav-dropdown">
                <MenuItem eventKey="5.1">Action</MenuItem>
                <MenuItem eventKey="5.2">Another action</MenuItem>
                <MenuItem eventKey="5.3">Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="5.4">Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </div>
        );
      }
    }

export default NavJustified;