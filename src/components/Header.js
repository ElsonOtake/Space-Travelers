import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => (
  <Navbar variant="primary">
    <Container>
      <Navbar.Brand
        href="/"
        className="fs-2"
      >
        Space Travelers' Hub
      </Navbar.Brand>
      <Nav>
        <Nav.Link
          href="/"
          active
        >
          Rockets
        </Nav.Link>
        <Nav.Link 
          href="/missions"
        >
          Missions
        </Nav.Link>
        <Nav.Link >
          |
        </Nav.Link>
        <Nav.Link 
          href="/my_profile"
        >
          My Profile
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Header;