import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppNavbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types/auth';

vi.mock('../context/AuthContext');

function loguearComo(rol: Rol) {
  vi.mocked(useAuth).mockReturnValue({
    usuario: { id: 1, email: 'test@libreria.com', nombre: 'Test', rol },
    cargando: false,
    estaAutenticado: true,
    tieneRol: (r) => r === rol,
    login: vi.fn(),
    logout: vi.fn(),
  });
}

function renderNavbar() {
  render(
    <MemoryRouter>
      <AppNavbar />
    </MemoryRouter>,
  );
}

describe('Navbar', () => {
  it('muestra "Nuevo libro" a un ADMIN', () => {
    loguearComo('ADMIN');
    renderNavbar();

    expect(screen.getByText('Nuevo libro')).toBeInTheDocument();
    expect(screen.getByText('Hola, Test')).toBeInTheDocument();
  });

  it('no muestra "Nuevo libro" a un CLIENTE', () => {
    loguearComo('CLIENTE');
    renderNavbar();

    expect(screen.queryByText('Nuevo libro')).not.toBeInTheDocument();
  });
});
