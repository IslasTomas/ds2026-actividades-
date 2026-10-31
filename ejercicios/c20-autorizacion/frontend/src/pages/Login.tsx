import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { ApiError } from '../services/api';
import { useAuth } from '../context/AuthContext';

const schema = z.object({
  email: z.email('Tenes que poner un email valido'),
  password: z.string().min(1, 'La password es obligatoria'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorApi, setErrorApi] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(datos: FormData) {
    setErrorApi(null);
    try {
      await login(datos);
      navigate('/catalogo');
    } catch (error: unknown) {
      setErrorApi(
        error instanceof ApiError ? error.message : 'No se pudo conectar con la API',
      );
    }
  }

  return (
    <Container className="my-5" style={{ maxWidth: '480px' }}>
      <h2 className="mb-4">Iniciar sesion</h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register('email')} isInvalid={!!errors.email} />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Entrar
        </Button>
      </Form>
    </Container>
  );
}
