import { Router } from "express";
import * as controlador from "../controllers/autores.controller";

const router = Router();

router.get("/", controlador.listar);
router.get("/:id", controlador.obtener);
router.post("/", controlador.crear);
router.put("/:id", controlador.actualizar);
router.delete("/:id", controlador.eliminar);

export default router;
