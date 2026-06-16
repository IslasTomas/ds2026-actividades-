import { Navbar, Nav, Container } from 'react-bootstrap';

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Libreria Digital</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="ms-auto">
            <Nav.Link href="/home">Inicio</Nav.Link>
            <Nav.Link href="/catalogo">Catalogo</Nav.Link>
            <Nav.Link href="#">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
