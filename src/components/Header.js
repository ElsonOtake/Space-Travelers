import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => (
  <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="/">Space Travelers' Hub</Navbar.Brand>
      <Nav>
        <Nav.Link 
          href="/"
          className={({ isActive }) => (isActive ? 'active' : 'notActive')}
        >
          Rockets
        </Nav.Link>
        <Nav.Link 
          href="/missions"
          className={({ isActive }) => (isActive ? 'active' : 'notActive')}
        >
          Missions
        </Nav.Link>
        <Nav.Link 
          href="/my_profile"
          className={({ isActive }) => (isActive ? 'active' : 'notActive')}
        >
          My Profile
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Header;