import { NextFunction, Request, Response } from "express";
import { Rol } from "../../generated/prisma/client";
import { verificarToken } from "../services/auth.service";
import { HttpError } from "./errorHandler";

// Lee el header Authorization: Bearer <token>, lo verifica y deja el usuario
// en req.usuario. Si algo falla, corta con 401.
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next(new HttpError(401, "Falta el token"));
    return;
  }

  const payload = verificarToken(header.slice("Bearer ".length));
  if (!payload) {
    next(new HttpError(401, "Token invalido o vencido"));
    return;
  }

  req.usuario = payload;
  next();
}

// Se usa siempre despues de authenticate: mira que el rol del token este
// entre los permitidos. 401 es "no se quien sos", 403 es "se quien sos y no
// te alcanza".
export function authorize(...roles: Rol[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.usuario) {
      next(new HttpError(401, "Falta el token"));
      return;
    }
    if (!roles.includes(req.usuario.rol)) {
      next(new HttpError(403, "No tenes permiso para hacer esto"));
      return;
    }
    next();
  };
}
