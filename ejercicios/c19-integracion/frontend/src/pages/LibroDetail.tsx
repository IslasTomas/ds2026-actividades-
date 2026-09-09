import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Badge } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import type { LibroDetalle } from '../types/libros';

export default function LibroDetail() {
  const { id } = useParams();
  const { data: libro, loading, error } = useFetch<LibroDetalle>(`/libros/${id}`);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!libro) return null;

  return (
    <Container className="my-5">
      <img src={libro.imagen} alt={libro.titulo} className="mb-4" />
      <h1>{libro.titulo}</h1>
      <p className="text-muted">{libro.autor.nombre}</p>
      <p className="fw-bold fs-4">${libro.precio}</p>
      <div className="d-flex gap-2">
        {libro.categorias.map((categoria) => (
          <Badge bg="secondary" key={categoria.id}>{categoria.nombre}</Badge>
        ))}
      </div>
    </Container>
  );
}
