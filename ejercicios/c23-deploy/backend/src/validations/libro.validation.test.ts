import { describe, it, expect } from "vitest";
import { crearLibroSchema } from "./libro.validation";

describe("crearLibroSchema", () => {
  it("acepta un libro valido y completa los defaults", () => {
    const resultado = crearLibroSchema.safeParse({ titulo: "Ficciones", autorId: 1 });

    expect(resultado.success).toBe(true);
    expect(resultado.data?.precio).toBe(0);
  });

  it("rechaza un precio negativo", () => {
    const resultado = crearLibroSchema.safeParse({ titulo: "Ficciones", autorId: 1, precio: -5 });

    expect(resultado.success).toBe(false);
  });
});
