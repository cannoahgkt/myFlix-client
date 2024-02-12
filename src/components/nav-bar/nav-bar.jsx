
import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">MyApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Profile</Nav.Link>
          <Nav.Link href="#link">Sign Up</Nav.Link>
        </Nav>
        <Button variant="outline-success">Login</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;