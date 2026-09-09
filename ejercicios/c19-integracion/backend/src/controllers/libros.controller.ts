import { Request, Response } from "express";
import * as servicio from "../services/libros.service";

// Cero try / catch: los middlewares ya validaron el request, y cualquier
// promesa rechazada la reenvia Express 5 sola al errorHandler.

export async function listar(_req: Request, res: Response) {
  res.json(await servicio.listar());
}

export async function obtener(req: Request, res: Response) {
  res.json(await servicio.buscarPorId(Number(req.params.id)));
}

export async function crear(req: Request, res: Response) {
  res.status(201).json(await servicio.crear(req.body));
}

export async function actualizar(req: Request, res: Response) {
  res.json(await servicio.actualizar(Number(req.params.id), req.body));
}

export async function eliminar(req: Request, res: Response) {
  await servicio.eliminar(Number(req.params.id));
  res.status(204).send();
}
