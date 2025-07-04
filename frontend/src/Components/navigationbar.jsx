import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{
        background:
          "linear-gradient(135deg,rgb(255, 1, 1) 0%,rgb(0, 128, 255) 100%)",
        width: "100vw",
      }}
      className="mb-4"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          MarvelDB
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/characters" className="mx-2">
              Characters
            </Nav.Link>
            <Nav.Link as={Link} to="/add" className="mx-2">
              Add Character
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
