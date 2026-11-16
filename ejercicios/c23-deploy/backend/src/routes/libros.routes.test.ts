import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";

// Casos de la matriz de permisos que se cortan antes de llegar a la DB.
describe("POST /api/libros", () => {
  const libro = { titulo: "Ficciones", autorId: 1 };

  it("sin token devuelve 401", async () => {
    const res = await request(app).post("/api/libros").send(libro);

    expect(res.status).toBe(401);
  });

  it("como CLIENTE devuelve 403", async () => {
    const token = jwt.sign({ id: 2, rol: "CLIENTE" }, process.env.JWT_SECRET!);

    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${token}`)
      .send(libro);

    expect(res.status).toBe(403);
  });
});
