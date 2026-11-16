import { describe, it, expect, vi } from "vitest";
import { Request, Response } from "express";
import { authorize } from "./auth.middleware";
import { HttpError } from "./errorHandler";

describe("authorize", () => {
  it("deja pasar a un ADMIN", () => {
    const req = { usuario: { id: 1, rol: "ADMIN" } } as Request;
    const next = vi.fn();

    authorize("ADMIN")(req, {} as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("corta con 403 a un CLIENTE", () => {
    const req = { usuario: { id: 2, rol: "CLIENTE" } } as Request;
    const next = vi.fn();

    authorize("ADMIN")(req, {} as Response, next);

    const error = next.mock.calls[0][0] as HttpError;
    expect(error.status).toBe(403);
  });
});
