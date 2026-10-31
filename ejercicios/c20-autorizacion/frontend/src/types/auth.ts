export type Rol = 'ADMIN' | 'CLIENTE';

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
}

export interface Credenciales {
  email: string;
  password: string;
}

// Lo que devuelve POST /auth/login.
export interface Sesion {
  token: string;
  usuario: Usuario;
}
