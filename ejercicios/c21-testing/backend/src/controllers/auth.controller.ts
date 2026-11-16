import { Request, Response } from "express";
import * as servicio from "../services/auth.service";

export async function registro(req: Request, res: Response) {
  res.status(201).json(await servicio.registrar(req.body));
}

export async function login(req: Request, res: Response) {
  res.json(await servicio.login(req.body));
}

// authenticate ya dejo el usuario del token en req.usuario.
export async function yo(req: Request, res: Response) {
  res.json(await servicio.buscarPorId(req.usuario!.id));
}
