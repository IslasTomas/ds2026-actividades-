import { Router } from "express";
import * as controlador from "../controllers/libros.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate, validateParams } from "../middlewares/validate";
import { actualizarLibroSchema, crearLibroSchema } from "../validations/libro.validation";
import { idParamSchema } from "../validations/params.validation";

const router = Router();

// Leer es publico.
router.get("/", controlador.listar);
router.get("/:id", validateParams(idParamSchema), controlador.obtener);

// Escribir es solo para ADMIN. Los middlewares de auth van antes que los de
// validacion: si el rol no alcanza no tiene sentido revisar el body.
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(crearLibroSchema),
  controlador.crear,
);
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validate(actualizarLibroSchema),
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
