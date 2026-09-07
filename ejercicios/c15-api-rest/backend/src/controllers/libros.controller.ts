import { Request, Response } from "express";
import * as servicio from "../services/libros.service";

export function listar(_req: Request, res: Response) {
  res.json(servicio.listar());
}

export function obtener(req: Request, res: Response) {
  const libro = servicio.buscarPorId(Number(req.params.id));
  if (!libro) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.json(libro);
}

export function crear(req: Request, res: Response) {
  const { titulo, autor, imagen, precio } = req.body;
  if (!titulo || !autor) {
    res.status(400).json({ error: "titulo y autor son obligatorios" });
    return;
  }
  const libro = servicio.crear({ titulo, autor, imagen: imagen ?? "", precio: precio ?? 0 });
  res.status(201).json(libro);
}

export function actualizar(req: Request, res: Response) {
  const { titulo, autor, imagen, precio } = req.body;
  if (!titulo || !autor) {
    res.status(400).json({ error: "titulo y autor son obligatorios" });
    return;
  }
  const libro = servicio.actualizar(Number(req.params.id), {
    titulo,
    autor,
    imagen: imagen ?? "",
    precio: precio ?? 0,
  });
  if (!libro) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.json(libro);
}

export function eliminar(req: Request, res: Response) {
  const borrado = servicio.eliminar(Number(req.params.id));
  if (!borrado) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.status(204).send();
}
