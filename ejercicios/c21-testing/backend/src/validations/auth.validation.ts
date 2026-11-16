import { z } from "zod";

// Al registrarse si se exige una contrasena decente.
export const registroSchema = z.object({
  email: z.email("Tenes que mandar un email valido"),
  password: z
    .string("La password es obligatoria")
    .min(8, "La password tiene que tener al menos 8 caracteres")
    .regex(/[a-zA-Z]/, "La password tiene que tener al menos una letra")
    .regex(/\d/, "La password tiene que tener al menos un numero"),
  nombre: z
    .string("El nombre es obligatorio y tiene que ser texto")
    .trim()
    .min(1, "El nombre no puede estar vacio"),
});

// El login NO valida fortaleza: solo mira que vengan los dos campos. Si
// pidiera 8 caracteres y un numero, el mensaje de error le estaria contando
// a cualquiera como son las contrasenas del sistema.
export const loginSchema = z.object({
  email: z.email("Tenes que mandar un email valido"),
  password: z.string("La password es obligatoria").min(1, "La password es obligatoria"),
});

export type Registro = z.infer<typeof registroSchema>;
export type Login = z.infer<typeof loginSchema>;
