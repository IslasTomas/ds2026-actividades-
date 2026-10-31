import { z } from "zod";

// Los campos se definen una sola vez y se arman los dos schemas a partir
// de ellos: el de crear exige lo obligatorio, el de actualizar deja todo
// opcional (pero pide que venga al menos un campo).
const campos = {
  titulo: z
    .string("El titulo es obligatorio y tiene que ser texto")
    .trim()
    .min(1, "El titulo no puede estar vacio"),
  autorId: z
    .number("autorId es obligatorio y tiene que ser un numero")
    .int("autorId tiene que ser un numero entero")
    .positive("autorId tiene que ser el id de un autor"),
  imagen: z.string("imagen tiene que ser texto").trim(),
  precio: z
    .number("precio tiene que ser un numero")
    .int("El precio tiene que ser un numero entero")
    .nonnegative("El precio no puede ser negativo"),
  categoriaIds: z.array(
    z.number("Cada categoria se manda como id numerico").int().positive(),
    "categoriaIds tiene que ser una lista de ids",
  ),
};

export const crearLibroSchema = z.object({
  titulo: campos.titulo,
  autorId: campos.autorId,
  // Los opcionales tienen default solo al crear. Si tuvieran default al
  // actualizar, un PUT con un solo campo borraria los demas.
  imagen: campos.imagen.default(""),
  precio: campos.precio.default(0),
  categoriaIds: campos.categoriaIds.default([]),
});

export const actualizarLibroSchema = z
  .object(campos)
  .partial()
  .refine(
    (datos) => Object.keys(datos).length > 0,
    "Hay que mandar al menos un campo para modificar",
  );

export type CrearLibro = z.infer<typeof crearLibroSchema>;
export type ActualizarLibro = z.infer<typeof actualizarLibroSchema>;
