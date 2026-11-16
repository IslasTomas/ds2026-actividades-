import { z } from "zod";

// Los params de la URL siempre llegan como string. El regex corta antes de
// convertir, asi "abc" devuelve un mensaje entendible en vez del error de
// tipo que tiraria coerce al recibir NaN.
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/, "El id tiene que ser un numero entero positivo")
    .transform(Number),
});

export type IdParam = z.infer<typeof idParamSchema>;
