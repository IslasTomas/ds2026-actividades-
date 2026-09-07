import { Autor, AutorNuevo } from "../types/autor";

const autores: Autor[] = [
  { id: 1, nombre: "Antoine de Saint-Exupery", nacionalidad: "Francia" },
  { id: 2, nombre: "Gabriel Garcia Marquez", nacionalidad: "Colombia" },
  { id: 3, nombre: "Julio Cortazar", nacionalidad: "Argentina" },
  { id: 4, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { id: 5, nombre: "Juan Rulfo", nacionalidad: "Mexico" },
];

let proximoId = 6;

export function listar(): Autor[] {
  return autores;
}

export function buscarPorId(id: number): Autor | undefined {
  return autores.find((autor) => autor.id === id);
}

export function crear(datos: AutorNuevo): Autor {
  const autor: Autor = { id: proximoId++, ...datos };
  autores.push(autor);
  return autor;
}

export function actualizar(id: number, datos: AutorNuevo): Autor | undefined {
  const autor = buscarPorId(id);
  if (!autor) return undefined;
  Object.assign(autor, datos);
  return autor;
}

export function eliminar(id: number): boolean {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return false;
  autores.splice(indice, 1);
  return true;
}
