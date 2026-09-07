import { prisma } from "../lib/prisma";
import { Libro, LibroNuevo } from "../types/libro";

export function listar(): Promise<Libro[]> {
  return prisma.libro.findMany({ orderBy: { id: "asc" } });
}

export function buscarPorId(id: number): Promise<Libro | null> {
  return prisma.libro.findUnique({ where: { id } });
}

export function crear(datos: LibroNuevo): Promise<Libro> {
  return prisma.libro.create({ data: datos });
}

export async function actualizar(id: number, datos: LibroNuevo): Promise<Libro | null> {
  const existe = await buscarPorId(id);
  if (!existe) return null;
  return prisma.libro.update({ where: { id }, data: datos });
}

export async function eliminar(id: number): Promise<boolean> {
  const existe = await buscarPorId(id);
  if (!existe) return false;
  await prisma.libro.delete({ where: { id } });
  return true;
}
