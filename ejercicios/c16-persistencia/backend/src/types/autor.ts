// Los tipos ya no se escriben a mano: los genera Prisma a partir del schema.
import type { Autor } from "../../generated/prisma/client";

export type { Autor };

export type AutorNuevo = Omit<Autor, "id">;
