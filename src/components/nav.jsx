import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function MiNav() {

  return (
    <>
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={'/'}>LILA MAGIGBOX</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/'}>INICIO</Nav.Link>
              <Nav.Link as={Link} to={'/stock'}>STOCK</Nav.Link>
              <Nav.Link as={Link} to={'/pedidos'}>PEDIDOS</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MiNav;
