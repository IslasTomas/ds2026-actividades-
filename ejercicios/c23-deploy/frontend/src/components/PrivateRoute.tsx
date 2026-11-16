import { Navigate, Outlet } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types/auth';

export default function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!usuario) return <Navigate to="/login" replace />;

  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />;

  return <Outlet />;
}
