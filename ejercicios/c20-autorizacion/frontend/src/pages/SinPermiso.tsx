import { Link } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';

export default function SinPermiso() {
  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <Alert variant="warning">
        <Alert.Heading>No tenes permiso</Alert.Heading>
        <p>Tu usuario no puede entrar a esta pagina.</p>
        <Link to="/catalogo">Volver al catalogo</Link>
      </Alert>
    </Container>
  );
}
