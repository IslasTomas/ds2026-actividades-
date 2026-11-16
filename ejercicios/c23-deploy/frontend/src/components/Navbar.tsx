import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function AppNavbar() {
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  function manejarSesion() {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Libreria Digital</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={NavLink} to="/home">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo">Catalogo</Nav.Link>
            {tieneRol('ADMIN') && (
              <Nav.Link as={NavLink} to="/libros/nuevo">Nuevo libro</Nav.Link>
            )}
            {usuario && <Navbar.Text className="ms-lg-3">Hola, {usuario.nombre}</Navbar.Text>}
            <Button variant="outline-light" size="sm" className="ms-lg-3" onClick={manejarSesion}>
              {usuario ? 'Salir' : 'Ingresar'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
