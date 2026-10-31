import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { apiFetch, ApiError } from '../services/api';
import useFetch from '../hooks/useFetch';
import type { Autor, Libro } from '../types/libros';

const schema = z.object({
  titulo: z.string().min(1, 'El titulo es obligatorio'),
  autorId: z.number('Elegi un autor').int().positive('Elegi un autor'),
  imagen: z.url('Debe ser una URL valida'),
  precio: z.number('El precio es obligatorio').int().nonnegative('El precio no puede ser negativo'),
});

type FormData = z.infer<typeof schema>;

export default function AltaLibro() {
  const [creado, setCreado] = useState<Libro | null>(null);
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const { data: autores } = useFetch<Autor[]>('/autores');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(datos: FormData) {
    setErrorApi(null);
    setCreado(null);
    try {
      const libro = await apiFetch<Libro>('/libros', {
        method: 'POST',
        body: JSON.stringify(datos),
      });
      setCreado(libro);
      reset();
    } catch (error: unknown) {
      setErrorApi(
        error instanceof ApiError ? error.message : 'No se pudo conectar con la API',
      );
    }
  }

  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Alta de libro</h2>

      {creado && (
        <Alert variant="success" onClose={() => setCreado(null)} dismissible>
          Se agrego "{creado.titulo}" con el id {creado.id}.
        </Alert>
      )}

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

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
          <Form.Select
            {...register('autorId', { valueAsNumber: true })}
            isInvalid={!!errors.autorId}
            defaultValue=""
          >
            <option value="" disabled>Elegi un autor</option>
            {autores?.map((autor) => (
              <option key={autor.id} value={autor.id}>{autor.nombre}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.autorId?.message}
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
            {...register('precio', { valueAsNumber: true })}
            isInvalid={!!errors.precio}
          />
          <Form.Control.Feedback type="invalid">
            {errors.precio?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Agregar libro
        </Button>
      </Form>
    </Container>
  );
}
