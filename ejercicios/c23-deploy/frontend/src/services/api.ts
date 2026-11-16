import { leerToken } from './sesion';

const BASE_URL = import.meta.env.VITE_API_URL;

export const EVENTO_SESION_EXPIRADA = 'sesion-expirada';

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
    // 401 con token = sesion vencida
    if (respuesta.status === 401 && token) {
      window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA));
    }

    // Se muestra el mensaje que mando la API, no uno generico del front.
    const { error, detalles } = (cuerpo ?? {}) as ErrorDeApi;
    const mensaje = error ?? `Error ${respuesta.status}`;
    const detalle = detalles?.map((item) => item.mensaje).join('. ');
    throw new ApiError(respuesta.status, detalle ? `${mensaje}: ${detalle}` : mensaje);
  }

  return cuerpo as T;
}
