import type { PayloadToken } from "../services/auth.service";

// authenticate deja el usuario del token colgado del request. Este archivo
// es el que hace que TypeScript sepa que req.usuario existe.
declare global {
  namespace Express {
    interface Request {
      usuario?: PayloadToken;
    }
  }
}

export {};
