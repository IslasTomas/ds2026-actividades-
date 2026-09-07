import { Request, Response } from "express";
import * as servicio from "../services/libros.service";

// Express 5 reenvia solo las promesas rechazadas al middleware de errores,
// asi que los controladores no necesitan try / catch.

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
  const libro = await servicio.buscarPorId(id);
  if (!libro) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.json(libro);
}

export async function crear(req: Request, res: Response) {
  const { titulo, autor, imagen, precio } = req.body;
  if (!titulo || !autor) {
    res.status(400).json({ error: "titulo y autor son obligatorios" });
    return;
  }
  const libro = await servicio.crear({
    titulo,
    autor,
    imagen: imagen ?? "",
    precio: Number(precio) || 0,
  });
  res.status(201).json(libro);
}

export async function actualizar(req: Request, res: Response) {
  const id = leerId(req);
  if (id === null) {
    res.status(400).json({ error: "El id tiene que ser un numero entero" });
    return;
  }
  const { titulo, autor, imagen, precio } = req.body;
  if (!titulo || !autor) {
    res.status(400).json({ error: "titulo y autor son obligatorios" });
    return;
  }
  const libro = await servicio.actualizar(id, {
    titulo,
    autor,
    imagen: imagen ?? "",
    precio: Number(precio) || 0,
  });
  if (!libro) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.json(libro);
}

export async function eliminar(req: Request, res: Response) {
  const id = leerId(req);
  if (id === null) {
    res.status(400).json({ error: "El id tiene que ser un numero entero" });
    return;
  }
  const borrado = await servicio.eliminar(id);
  if (!borrado) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.status(204).send();
}
