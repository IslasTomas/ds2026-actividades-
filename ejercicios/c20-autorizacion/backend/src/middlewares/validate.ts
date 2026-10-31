import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

// Valida el body contra un schema de zod. Si no pasa, el ZodError sigue
// viaje al errorHandler, que es el unico que arma respuestas de error.
// Si pasa, reemplaza el body por el dato ya parseado (con los defaults
// puestos), asi el controller recibe algo con la forma correcta.
export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);
    if (!resultado.success) {
      next(resultado.error);
      return;
    }
    req.body = resultado.data;
    next();
  };
}

// Lo mismo pero para los params de la URL (el :id).
export function validateParams(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.params);
    if (!resultado.success) {
      next(resultado.error);
      return;
    }
    next();
  };
}
