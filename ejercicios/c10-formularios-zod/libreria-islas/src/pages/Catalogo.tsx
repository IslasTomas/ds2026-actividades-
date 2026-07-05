import { Container, Row, Col } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { libros } from '../data/librosData';

export default function Catalogo() {
  return (
    <Container className="my-5">
      <h2 className="mb-4">Catálogo</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {libros.map((libro) => (
          <Col key={libro.id}>
            <LibroCard libro={libro} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}