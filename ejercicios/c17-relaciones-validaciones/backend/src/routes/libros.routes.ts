import { Router } from "express";
import * as controlador from "../controllers/libros.controller";
import { validate, validateParams } from "../middlewares/validate";
import { actualizarLibroSchema, crearLibroSchema } from "../validations/libro.validation";
import { idParamSchema } from "../validations/params.validation";

const router = Router();

// Cada ruta declara que valida antes de llegar al controlador.
router.get("/", controlador.listar);
router.get("/:id", validateParams(idParamSchema), controlador.obtener);
router.post("/", validate(crearLibroSchema), controlador.crear);
router.put(
  "/:id",
  validateParams(idParamSchema),
  validate(actualizarLibroSchema),
  controlador.actualizar,
);
router.delete("/:id", validateParams(idParamSchema), controlador.eliminar);

export default router;
