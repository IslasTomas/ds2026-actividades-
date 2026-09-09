import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";

// Los codigos de Prisma que sabemos traducir a una respuesta HTTP.
const codigosPrisma: Record<string, { status: number; mensaje: string }> = {
  // Violacion de una restriccion unique (titulo o nombre repetido).
  P2002: { status: 409, mensaje: "Ya existe un registro con ese valor" },
  // La fila que se quiso leer, modificar o borrar no existe.
  P2025: { status: 404, mensaje: "No se encontro el registro" },
  // Violacion de clave foranea: o el id referenciado no existe, o se quiso
  // borrar algo que todavia tiene filas apuntandole.
  P2003: { status: 409, mensaje: "La operacion rompe una referencia entre tablas" },
};

// Express lo toma como manejador de errores porque tiene 4 parametros.
// Es el unico lugar del backend que decide codigos de estado de error.
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: "Datos invalidos",
      detalles: error.issues.map((issue) => ({
        campo: issue.path.join(".") || "(body)",
        mensaje: issue.message,
      })),
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const conocido = codigosPrisma[error.code];
    if (conocido) {
      res.status(conocido.status).json({ error: conocido.mensaje, codigo: error.code });
      return;
    }
  }

  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
}
