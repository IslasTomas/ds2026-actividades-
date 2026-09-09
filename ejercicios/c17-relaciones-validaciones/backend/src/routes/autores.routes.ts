import { Router } from "express";
import * as controlador from "../controllers/autores.controller";
import { validate, validateParams } from "../middlewares/validate";
import { actualizarAutorSchema, crearAutorSchema } from "../validations/autor.validation";
import { idParamSchema } from "../validations/params.validation";

const router = Router();

router.get("/", controlador.listar);
router.get("/:id", validateParams(idParamSchema), controlador.obtener);
router.post("/", validate(crearAutorSchema), controlador.crear);
router.put(
  "/:id",
  validateParams(idParamSchema),
  validate(actualizarAutorSchema),
  controlador.actualizar,
);
router.delete("/:id", validateParams(idParamSchema), controlador.eliminar);

export default router;
