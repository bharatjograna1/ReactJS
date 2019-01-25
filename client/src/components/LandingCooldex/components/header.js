import React, { Component } from 'react';
import {Container,Row, Col,  Collapse , Navbar , NavbarToggler , NavbarBrand
  , Nav , NavItem , NavLink } from 'reactstrap';
import { Link } from "react-router-dom";
import CooddeskLogo from '../../../assets/image/CoolDexLogo-tm.png';

export default class header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    localStorage.setItem('locale', 'en');
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="Cooldeskheader">
        <Container>
            <Row>
              <Col sm={4}>
              <NavbarBrand href="/"><img className="img-fluid" src={CooddeskLogo} alt="" title="" /></NavbarBrand>
              </Col>
              <Col sm={5}>
                  <Navbar color="faded" expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {/* <Nav className="HeaderLink">
                          <NavItem>
                            <NavLink href="#">Solutions</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="#">Features</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="#">Price</NavLink>
                          </NavItem>
                        </Nav> */}
                    </Collapse>
                  </Navbar>
              </Col> 
              <Col sm={3}>
                  <div className="Headerbtn">
                    <Link to="/signin">Login</Link>
                    <Link to="/signup">TRY Free</Link>
                  </div>
              </Col>  
            </Row>
        </Container>
      
      </div>
    )
  }
}
