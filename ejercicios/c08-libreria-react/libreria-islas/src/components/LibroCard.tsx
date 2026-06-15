import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { Libro } from '../data/libros';


type Props = { libro: Libro };

export default function LibroCard({ libro }: Props) {
    const [meGusta, setMeGusta] = useState(false);

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={libro.imagen} alt={libro.titulo} />
        <Card.Body className="d-flex flex-column">
        <Card.Title>{libro.titulo}</Card.Title>
        <Card.Text className="text-muted">{libro.autor}</Card.Text>
        <Card.Text className="fw-bold">${libro.precio}</Card.Text>
            <div className="mt-auto d-flex gap-2">
          <Button variant="primary" size="sm">Ver más</Button>
          <Button
            key={String(meGusta)}
            variant={meGusta ? 'danger' : 'outline-danger'}
            size="sm"
            onClick={() => setMeGusta(!meGusta)}
          >
            {meGusta ? '♥ Me gusta' : '♡ Me gusta'}
          </Button>
        </div>
      </Card.Body>
        </Card>
    );
}