import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

const schema = z.object({
  titulo: z.string().min(1, 'El titulo es obligatorio'),
  autor: z.string().min(1, 'El autor es obligatorio'),
  imagen: z.string().url('Debe ser una URL valida'),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
});

type FormData = z.infer<typeof schema>;

export default function AltaLibro() {
  const [enviado, setEnviado] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.log('Libro creado:', data);
    setEnviado(true);
    reset();
  }

  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Alta de libro</h2>

      {enviado && (
        <Alert variant="success" onClose={() => setEnviado(false)} dismissible>
          Libro agregado correctamente.
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Titulo</Form.Label>
          <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
          <Form.Control.Feedback type="invalid">
            {errors.titulo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control {...register('autor')} isInvalid={!!errors.autor} />
          <Form.Control.Feedback type="invalid">
            {errors.autor?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL de imagen</Form.Label>
          <Form.Control {...register('imagen')} isInvalid={!!errors.imagen} />
          <Form.Control.Feedback type="invalid">
            {errors.imagen?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            {...register('precio')}
            isInvalid={!!errors.precio}
          />
          <Form.Control.Feedback type="invalid">
            {errors.precio?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Agregar libro
        </Button>
      </Form>
    </Container>
  );
}
