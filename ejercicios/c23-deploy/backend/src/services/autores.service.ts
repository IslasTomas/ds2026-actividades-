import { prisma } from "../lib/prisma";
import { Autor } from "../types/autor";
import { ActualizarAutor, CrearAutor } from "../validations/autor.validation";

export function listar(): Promise<Autor[]> {
  return prisma.autor.findMany({ orderBy: { id: "asc" } });
}

// findUniqueOrThrow en vez de findUnique: si no existe tira P2025 y el
// errorHandler lo convierte en 404, asi el controller no chequea nada.
export function buscarPorId(id: number): Promise<Autor> {
  return prisma.autor.findUniqueOrThrow({ where: { id } });
}

export function crear(datos: CrearAutor): Promise<Autor> {
  return prisma.autor.create({ data: datos });
}

export function actualizar(id: number, datos: ActualizarAutor): Promise<Autor> {
  return prisma.autor.update({ where: { id }, data: datos });
}

// Si el autor todavia tiene libros, Postgres no lo deja borrar y Prisma
// tira P2003, que el errorHandler convierte en 409.
export async function eliminar(id: number): Promise<void> {
  await prisma.autor.delete({ where: { id } });
}
