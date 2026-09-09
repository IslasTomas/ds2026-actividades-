import { z } from "zod";

const campos = {
  nombre: z
    .string("El nombre es obligatorio y tiene que ser texto")
    .trim()
    .min(1, "El nombre no puede estar vacio"),
  nacionalidad: z.string("nacionalidad tiene que ser texto").trim(),
};

export const crearAutorSchema = z.object({
  nombre: campos.nombre,
  nacionalidad: campos.nacionalidad.default(""),
});

export const actualizarAutorSchema = z
  .object(campos)
  .partial()
  .refine(
    (datos) => Object.keys(datos).length > 0,
    "Hay que mandar al menos un campo para modificar",
  );

export type CrearAutor = z.infer<typeof crearAutorSchema>;
export type ActualizarAutor = z.infer<typeof actualizarAutorSchema>;
