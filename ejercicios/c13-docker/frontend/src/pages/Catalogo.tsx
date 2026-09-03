import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import useFetch from '../hooks/useFetch';
import type { Libro } from '../types/libros';

export default function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  return (
    <Container className="my-5">
      <h2 className="mb-4">Catalogo</h2>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger">{error}</Alert>
      )}

      {libros && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {libros.map((libro) => (
            <Col key={libro.id}>
              <LibroCard libro={libro} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
