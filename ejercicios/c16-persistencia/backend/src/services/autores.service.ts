import { prisma } from "../lib/prisma";
import { Autor, AutorNuevo } from "../types/autor";

export function listar(): Promise<Autor[]> {
  return prisma.autor.findMany({ orderBy: { id: "asc" } });
}

export function buscarPorId(id: number): Promise<Autor | null> {
  return prisma.autor.findUnique({ where: { id } });
}

export function crear(datos: AutorNuevo): Promise<Autor> {
  return prisma.autor.create({ data: datos });
}

export async function actualizar(id: number, datos: AutorNuevo): Promise<Autor | null> {
  const existe = await buscarPorId(id);
  if (!existe) return null;
  return prisma.autor.update({ where: { id }, data: datos });
}

export async function eliminar(id: number): Promise<boolean> {
  const existe = await buscarPorId(id);
  if (!existe) return false;
  await prisma.autor.delete({ where: { id } });
  return true;
}
