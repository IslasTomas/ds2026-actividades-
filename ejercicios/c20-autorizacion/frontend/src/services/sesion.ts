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
