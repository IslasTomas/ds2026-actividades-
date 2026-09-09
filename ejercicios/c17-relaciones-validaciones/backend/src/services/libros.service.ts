import { prisma } from "../lib/prisma";
import { LibroDetalle, LibroListado } from "../types/libro";
import { ActualizarLibro, CrearLibro } from "../validations/libro.validation";

// El detalle siempre viaja con autor y categorias.
const detalle = { autor: true, categorias: true };

// El listado trae cada libro con su autor (la 1:N).
export function listar(): Promise<LibroListado[]> {
  return prisma.libro.findMany({
    include: { autor: true },
    orderBy: { id: "asc" },
  });
}

// findUniqueOrThrow en vez de findUnique: si no existe tira P2025 y el
// errorHandler lo convierte en 404, asi el controller no chequea nada.
export function buscarPorId(id: number): Promise<LibroDetalle> {
  return prisma.libro.findUniqueOrThrow({ where: { id }, include: detalle });
}

export function crear(datos: CrearLibro): Promise<LibroDetalle> {
  const { categoriaIds, ...libro } = datos;
  return prisma.libro.create({
    data: {
      ...libro,
      // connect engancha el libro con categorias que ya existen (la N:M).
      categorias: { connect: categoriaIds.map((id) => ({ id })) },
    },
    include: detalle,
  });
}

export function actualizar(id: number, datos: ActualizarLibro): Promise<LibroDetalle> {
  const { categoriaIds, ...libro } = datos;
  return prisma.libro.update({
    where: { id },
    data: {
      ...libro,
      // set reemplaza la lista entera de categorias. Si no vino el campo,
      // las categorias quedan como estaban.
      ...(categoriaIds && { categorias: { set: categoriaIds.map((id) => ({ id })) } }),
    },
    include: detalle,
  });
}

export async function eliminar(id: number): Promise<void> {
  await prisma.libro.delete({ where: { id } });
}
