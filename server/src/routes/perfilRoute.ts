import { Router } from "express";
import { perfilController } from "../controllers";
import { ValidateSchema } from "../middlewares/schemas";
import PerfilSchema from "../schemas/perfil";

const router = Router();

router.get("/list", perfilController.list);
router.get("/getByUserId/:perfil_id", perfilController.getById);
router.post(
  "/create",
  ValidateSchema(PerfilSchema.create),
  perfilController.save
);
router.put(
  "/update",
  ValidateSchema(PerfilSchema.update),
  perfilController.update
);
router.delete("/delete/:perfil_id", perfilController.delete);

export default router;
