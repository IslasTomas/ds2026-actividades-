import { Router } from "express";
import * as controlador from "../controllers/autores.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate, validateParams } from "../middlewares/validate";
import { actualizarAutorSchema, crearAutorSchema } from "../validations/autor.validation";
import { idParamSchema } from "../validations/params.validation";

const router = Router();

// Leer es publico.
router.get("/", controlador.listar);
router.get("/:id", validateParams(idParamSchema), controlador.obtener);

// Escribir es solo para ADMIN.
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(crearAutorSchema),
  controlador.crear,
);
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validate(actualizarAutorSchema),
  controlador.actualizar,
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  controlador.eliminar,
);

export default router;
