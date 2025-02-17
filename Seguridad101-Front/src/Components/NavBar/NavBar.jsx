import React from "react";
import "./NavBar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthContext } from "../../Context/AuthContext";
import { useGlobalContext } from "../../Context/GlobalContext";
import { use } from "react";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({of}) => {

  const { isAuthenticated, logout } = useAuthContext()
  const { user } = useGlobalContext()

  const vara = isAuthenticated

  const schema = {
    nav: [
      <Nav.Link href="/" className="nav-link text-center align-self-center btn btn-secondary" key={1}>Inicio</Nav.Link>,
      <Nav.Link href="./contact" className="nav-link text-center align-self-center btn btn-secondary" key={2}>Contacto</Nav.Link>,
      <Nav.Link href="./aboutUs" className="nav-link text-center align-self-center btn btn-secondary" key={3}>Nosotros</Nav.Link>,
    ],
    navApp: [
      <Nav.Link href="/log/s101/pending" className="nav-link text-center align-self-center btn btn-secondary" key={1}>Inicio</Nav.Link>,
      <Nav.Link href="/log/s101/clients" className="nav-link text-center align-self-center btn btn-secondary" key={2}>Clientes</Nav.Link>,
      <Nav.Link href="/log/s101/users" className="nav-link text-center align-self-center btn btn-secondary" key={3}>Usuarios</Nav.Link>,
      
      user.role == 'admin' &&  
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={user.username && user.username.toUpperCase()}
        data-bs-theme="light"
        key={4}
        className="nav-link btn btn-secondary"
      >
        <NavDropdown.Item href={`/log/s101/profile/${user.id}`}>Mi cuenta</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => logout()}> <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión</NavDropdown.Item>
      </NavDropdown>,

    ]
  }
  return (
    <>
    <Navbar expand="lg" className={of == 'app' ? "navbarApp sticky-top" : "navbar sticky-top"} variant="light">
      <Container>
        
        {
          of == 'app' ?
          <Navbar.Brand href="/log/s101/pending" >
            <img src="/logo-png.png" alt="img" className="logo-nav" />
          </Navbar.Brand>
          :
          <Navbar.Brand href="/" >
            <img src="/logo-png.png" alt="img" className="logo-nav" />
          </Navbar.Brand>
        }
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="px-1 toggle"/>
        <Navbar.Collapse id="basic-navbar-nav" className="collapse navbar-collapse justify-content-end">
          <Nav className="navbar-nav">
            {
              of == 'app' ? 
              schema.navApp 
              : 
              schema.nav
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  );
};

export default NavBar;
