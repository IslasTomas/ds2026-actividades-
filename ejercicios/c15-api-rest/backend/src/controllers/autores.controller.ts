import { Request, Response } from "express";
import * as servicio from "../services/autores.service";

export function listar(_req: Request, res: Response) {
  res.json(servicio.listar());
}

export function obtener(req: Request, res: Response) {
  const autor = servicio.buscarPorId(Number(req.params.id));
  if (!autor) {
    res.status(404).json({ error: "Autor no encontrado" });
    return;
  }
  res.json(autor);
}

export function crear(req: Request, res: Response) {
  const { nombre, nacionalidad } = req.body;
  if (!nombre) {
    res.status(400).json({ error: "nombre es obligatorio" });
    return;
  }
  const autor = servicio.crear({ nombre, nacionalidad: nacionalidad ?? "" });
  res.status(201).json(autor);
}

export function actualizar(req: Request, res: Response) {
  const { nombre, nacionalidad } = req.body;
  if (!nombre) {
    res.status(400).json({ error: "nombre es obligatorio" });
    return;
  }
  const autor = servicio.actualizar(Number(req.params.id), {
    nombre,
    nacionalidad: nacionalidad ?? "",
  });
  if (!autor) {
    res.status(404).json({ error: "Autor no encontrado" });
    return;
  }
  res.json(autor);
}

export function eliminar(req: Request, res: Response) {
  const borrado = servicio.eliminar(Number(req.params.id));
  if (!borrado) {
    res.status(404).json({ error: "Autor no encontrado" });
    return;
  }
  res.status(204).send();
}
