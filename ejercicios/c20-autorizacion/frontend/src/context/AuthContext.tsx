import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch, EVENTO_SESION_EXPIRADA } from '../services/api';
import { borrarToken, guardarToken, leerToken } from '../services/sesion';
import type { Credenciales, Rol, Sesion, Usuario } from '../types/auth';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(leerToken() !== null);

  // Al recargar, le pregunto al back quien soy
  useEffect(() => {
    if (!leerToken()) return;
    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  const logout = useCallback(() => {
    borrarToken();
    setUsuario(null);
  }, []);

  useEffect(() => {
    window.addEventListener(EVENTO_SESION_EXPIRADA, logout);
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, logout);
  }, [logout]);

  async function login(credenciales: Credenciales) {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  }

  const value: AuthContextType = {
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol: (rol) => usuario?.rol === rol,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return contexto;
}
