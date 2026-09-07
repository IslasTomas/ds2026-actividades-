// Los tipos ya no se escriben a mano: los genera Prisma a partir del schema.
import type { Libro } from "../../generated/prisma/client";

export type { Libro };

export type LibroNuevo = Omit<Libro, "id">;
