import { Router } from "express";
import { perfilController } from "../controllers";
import { ValidateSchema } from "../middlewares/schemas";
import PerfilSchema from "../schemas/perfil";

const router = Router();

router.get("/", perfilController.list);
router.get("/:usuario_id", perfilController.getById);
router.post("/", ValidateSchema(PerfilSchema.create), perfilController.save);
router.put("/", ValidateSchema(PerfilSchema.update), perfilController.update);
router.delete("/:usuario_id", perfilController.delete);

export default router;
