import { Libro, LibroNuevo } from "../types/libro";

const libros: Libro[] = [
  { id: 1, titulo: "El principito", autor: "Saint-Exupery", imagen: "https://picsum.photos/seed/libro1/400/240", precio: 8990 },
  { id: 2, titulo: "Cien anos de soledad", autor: "Garcia Marquez", imagen: "https://picsum.photos/seed/libro2/400/240", precio: 12500 },
  { id: 3, titulo: "Rayuela", autor: "Cortazar", imagen: "https://picsum.photos/seed/libro3/400/240", precio: 9800 },
  { id: 4, titulo: "Ficciones", autor: "Borges", imagen: "https://picsum.photos/seed/libro4/400/240", precio: 7990 },
  { id: 5, titulo: "Pedro Paramo", autor: "Rulfo", imagen: "https://picsum.photos/seed/libro5/400/240", precio: 6500 },
  { id: 6, titulo: "Martin Fierro", autor: "Hernandez", imagen: "https://picsum.photos/seed/libro6/400/240", precio: 4990 },
];

let proximoId = 7;

export function listar(): Libro[] {
  return libros;
}

export function buscarPorId(id: number): Libro | undefined {
  return libros.find((libro) => libro.id === id);
}

export function crear(datos: LibroNuevo): Libro {
  const libro: Libro = { id: proximoId++, ...datos };
  libros.push(libro);
  return libro;
}

export function actualizar(id: number, datos: LibroNuevo): Libro | undefined {
  const libro = buscarPorId(id);
  if (!libro) return undefined;
  Object.assign(libro, datos);
  return libro;
}

export function eliminar(id: number): boolean {
  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice === -1) return false;
  libros.splice(indice, 1);
  return true;
}
