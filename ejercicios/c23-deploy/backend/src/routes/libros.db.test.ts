import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

// Necesita la DB levantada y con el seed: npm run test:db
describe("GET /api/libros", () => {
  it("devuelve los libros con su autor", async () => {
    const res = await request(app).get("/api/libros");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].autor).toBeDefined();
  });
});
