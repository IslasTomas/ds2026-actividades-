import { Request, Response } from "express";
import * as servicio from "../services/autores.service";

function leerId(req: Request): number | null {
  const id = Number(req.params.id);
  return Number.isInteger(id) ? id : null;
}

export async function listar(_req: Request, res: Response) {
  res.json(await servicio.listar());
}

export async function obtener(req: Request, res: Response) {
  const id = leerId(req);
  if (id === null) {
    res.status(400).json({ error: "El id tiene que ser un numero entero" });
    return;
  }
  const autor = await servicio.buscarPorId(id);
  if (!autor) {
    res.status(404).json({ error: "Autor no encontrado" });
    return;
  }
  res.json(autor);
}

export async function crear(req: Request, res: Response) {
  const { nombre, nacionalidad } = req.body;
  if (!nombre) {
    res.status(400).json({ error: "nombre es obligatorio" });
    return;
  }
  const autor = await servicio.crear({ nombre, nacionalidad: nacionalidad ?? "" });
  res.status(201).json(autor);
}

export async function actualizar(req: Request, res: Response) {
  const id = leerId(req);
  if (id === null) {
    res.status(400).json({ error: "El id tiene que ser un numero entero" });
    return;
  }
  const { nombre, nacionalidad } = req.body;
  if (!nombre) {
    res.status(400).json({ error: "nombre es obligatorio" });
    return;
  }
  const autor = await servicio.actualizar(id, { nombre, nacionalidad: nacionalidad ?? "" });
  if (!autor) {
    res.status(404).json({ error: "Autor no encontrado" });
    return;
  }
  res.json(autor);
}

export async function eliminar(req: Request, res: Response) {
  const id = leerId(req);
  if (id === null) {
    res.status(400).json({ error: "El id tiene que ser un numero entero" });
    return;
  }
  const borrado = await servicio.eliminar(id);
  if (!borrado) {
    res.status(404).json({ error: "Autor no encontrado" });
    return;
  }
  res.status(204).send();
}
