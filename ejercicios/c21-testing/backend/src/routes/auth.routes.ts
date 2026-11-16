import { Router } from "express";
import * as controlador from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { loginSchema, registroSchema } from "../validations/auth.validation";

const router = Router();

router.post("/registro", validate(registroSchema), controlador.registro);
router.post("/login", validate(loginSchema), controlador.login);
router.get("/yo", authenticate, controlador.yo);

export default router;
