import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import useFetch from '../hooks/useFetch';
import type { Libro } from '../types/libros';

export default function Home() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');

  useEffect(() => {
    document.title = 'Libreria Digital';
  }, []);

  return (
    <>
      <div className="bg-primary py-5 text-center">
        <Container>
          <h1 className="text-white fw-bold">Bienvenido a Libreria Digital</h1>
          <p className="lead">Encontra clasicos y novedades. Explora el catalogo.</p>
          <Link to="/catalogo" style={{ textDecoration: 'none' }}>
            <Button variant="light" size="lg">Ir al catalogo</Button>
          </Link>
        </Container>
      </div>
      <Container className="my-5">
        <h2 className="mb-4">Libros destacados</h2>

        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {libros && (
          <Row xs={1} md={2} lg={3} className="g-4">
            {libros.slice(0, 3).map((libro) => (
              <Col key={libro.id}>
                <LibroCard libro={libro} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
