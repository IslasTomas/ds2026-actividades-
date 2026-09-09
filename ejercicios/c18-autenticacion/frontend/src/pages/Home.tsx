import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { libros } from '../data/librosData';

export default function Home() {
  useEffect(() => {
    document.title = 'Libreria Digital';
  }, []);

    return(
      <>
      <div className="bg-primary  py-5 text-center">
        <Container>
          <h1 className='text-white fw-bold'>Bienvenido a Libreria Digital</h1>
          <p className="lead">Encontra clasicos y novedades. Explora el catalogo.</p>
          <Link to="/catalogo" style={{ textDecoration: 'none' }}>
            <Button variant="light" size="lg">Ir al catalogo</Button>
          </Link>
        </Container>
      </div>
      <Container className="my-5">
        <h2 className="mb-4">Libros destacados</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {libros.map((libro) => (
            <Col key={libro.id}>
              <LibroCard libro={libro} />
            </Col>
          ))}
        </Row>
      </Container>
      </>
    );
}