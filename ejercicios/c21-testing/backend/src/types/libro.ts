import type { Prisma } from "../../generated/prisma/client";

export type { Libro } from "../../generated/prisma/client";

// Los tipos de las respuestas con relaciones salen de GetPayload: si manana
// cambia el include del service, el tipo se rompe solo y TypeScript avisa.

// Lo que devuelve el listado: cada libro con su autor.
export type LibroListado = Prisma.LibroGetPayload<{ include: { autor: true } }>;

// Lo que devuelve el detalle: el autor y ademas las categorias.
export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;
