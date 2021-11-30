import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas';
import {PersonCircle} from 'react-bootstrap-icons'

interface NavbarProps {

}

const NavbarComponent: React.FC<NavbarProps> = ({}) => {
    return (
      <>
      <style>
          {`
            .navbar-dark .navbar-toggler-icon {
              color: #000;
            }
            .navbar-light .navbar-toggler {
              color: rgba(225,225,225,.55);
          }
          .navbar-light .navbar-toggler {
            border-color: rgba(225,225,225,.1);
        }
          `}
      </style>
      <Navbar bg="dark" expand={false}>
        <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="navbar-dark " />
        <Navbar.Brand className="align-items-start"  href="/"><p id="logo"><strong id="logo">sci-</strong>commerce</p></Navbar.Brand>
        <Nav.Item>
          <Nav.Link>
          < PersonCircle size="30px" color="white"/>
          </Nav.Link>
        </Nav.Item>
        <Navbar.Offcanvas
          className="navbar-dark"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
          </Navbar.Offcanvas>
          
          </Container>
      </Navbar>
      </>
    );
}

export default NavbarComponent;