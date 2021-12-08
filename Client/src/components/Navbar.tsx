import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { PersonCircle } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../store/users";
import { categoriesSelector } from "../store/categories";
import { fetchPopulars } from "../store/populars";
import { Link } from "react-router-dom";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Cart from "./Cart";
import { logUserOut } from "../store/users";

interface NavbarProps {}

const NavbarComponent: React.FC<NavbarProps> = () => {
  const dispatch = useDispatch();
  const [eventKey, setEventKey] = useState("/");
  const { user } = useSelector(userSelector);
  const allCategories = useSelector(categoriesSelector);
  const { categories } = allCategories;

  const [showOverlay,setShowOverlay] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const onLogOut = () => {
    dispatch(logUserOut());
    window.location.href = "/";
  };

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
          .btn-outline-light{
            color: #0f0;
            border-color: #0f0;
          }
          .btn-outline-light:hover{
            background: #0000;
            color: #fff;
            border-color: #fff;
          }
          .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
            color: #fff;
            background-color: #0f0;
            padding-left: 1rem;
          }
          a{
            color: #000;
          }
          a:hover{
            color:#000;
            background-color: #0f02;
          }
        `}
      </style>
      <LogIn open={showLogIn} onHide={() => setShowLogIn(!showLogIn)} />
      <SignUp open={showSignUp} onHide={() => setShowSignUp(!showSignUp)} />
      <Cart open={showCart} onHide={()=>setShowCart(!showCart)} />

      <Navbar bg="dark" expand={false}>
        <Container fluid>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            className="navbar-dark "
          />
          <Navbar.Brand href="/" className="text-start">
            <p id="logo">
              <strong id="logo">sci-</strong>commerce
            </p>
          </Navbar.Brand>
          {user ? (
            <Nav.Item>
              <OverlayTrigger
                onToggle ={()=>setShowOverlay(!showOverlay)}
                show={showOverlay}
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover>
                    <Popover.Body onClick={()=>{setShowOverlay(!showOverlay)}} className="align-items-center justify-content-center">
                    <Button onClick={()=>setShowCart(!showCart)} id="navPopover" variant="white">
                        <p id="navPopover" className="fs-5">
                          Cart
                        </p>
                      </Button>
                      <Link to="/favorites">
                        <p className="fs-5">Favorites</p>
                      </Link>
                      <Button
                        id="navPopover"
                        onClick={onLogOut}
                        className="justify-content-start"
                        variant="white"
                      >
                        <p
                          id="navPopover"
                          className="justify-content-start text-danger fs-5"
                        >
                          Log out
                        </p>
                      </Button>
                    </Popover.Body>
                  </Popover>
                }
              >
                <PersonCircle size="30px" color="white" />
              </OverlayTrigger>
            </Nav.Item>
          ) : (
            <div className="translate-end-x">
              <Button
                onClick={() => setShowSignUp(!showSignUp)}
                variant="light"
                className="me-2 "
              >
                Sign up
              </Button>
              <Button
                onClick={() => setShowLogIn(!showLogIn)}
                variant="outline-light"
                className=""
              >
                Log in
              </Button>
            </div>
          )}
          <Navbar.Offcanvas
            className="navbar-dark"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            backdrop={false}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel" className="fs-3">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr id="hr-offcanvas" />
            <Nav
              className="p-3 text-dark"
              variant="pills"
              activeKey={eventKey}
              onSelect={(ek: any) => setEventKey(ek)}
            >
              <Nav.Item>
                <Nav.Link eventKey="/" className="text-dark fs-4">
                  <Link to="/">
                    <strong>Home</strong>
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="populars" className="text-dark fs-4">
                  <Link
                    onClick={() => dispatch(fetchPopulars())}
                    to="browse/populars"
                  >
                    <strong>Popular products</strong>
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="browse" className="text-dark fs-4">
                  <Link to="browse">
                    <strong>Browse products</strong>
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <hr />
              <strong className="text-dark fs-4">Categories</strong>
              {categories.map((category: any) => (
                <Nav.Item key={category.category}>
                  <Nav.Link eventKey={category.category} className="text-dark">
                    <Link to={`/browse/${category.category}`}>
                      - {category.category}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <hr />
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
