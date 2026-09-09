const BASE_URL = import.meta.env.VITE_API_URL;
const CLAVE_TOKEN = 'token';

export function guardarToken(token: string): void {
  localStorage.setItem(CLAVE_TOKEN, token);
}

export function leerToken(): string | null {
  return localStorage.getItem(CLAVE_TOKEN);
}

export function borrarToken(): void {
  localStorage.removeItem(CLAVE_TOKEN);
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.status = status;
  }
}

type ErrorDeApi = {
  error?: string;
  detalles?: { campo: string; mensaje: string }[];
};

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = leerToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const respuesta = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const cuerpo: unknown = await respuesta.json();

  if (!respuesta.ok) {
    // Se muestra el mensaje que mando la API, no uno generico del front.
    const { error, detalles } = (cuerpo ?? {}) as ErrorDeApi;
    const mensaje = error ?? `Error ${respuesta.status}`;
    const detalle = detalles?.map((item) => item.mensaje).join('. ');
    throw new ApiError(respuesta.status, detalle ? `${mensaje}: ${detalle}` : mensaje);
  }

  return cuerpo as T;
}
