import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { libros } from '../data/librosData';

export default function LibroDetail() {
  const { id } = useParams();
  const libro = libros.find((l) => l.id === Number(id));

  if (!libro) {
    return <Container className="my-5"><p>Libro no encontrado.</p></Container>;
  }

  return (
    <Container className="my-5">
      <img src={libro.imagen} alt={libro.titulo} className="mb-4" />
      <h1>{libro.titulo}</h1>
      <p className="text-muted">{libro.autor}</p>
      <p className="fw-bold fs-4">${libro.precio}</p>
    </Container>
  );
}
