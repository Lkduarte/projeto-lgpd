import { Router } from "express";
import { usuarioController } from "../controllers";
import { ValidateSchema } from "../middlewares/schemas";
import UsuarioSchema from "../schemas/usuario";

const router = Router();

router.get("/list", usuarioController.list);
router.get("/getById/:usuario_id", usuarioController.getById);
router.post("/create", usuarioController.save);
router.put("/update/:usuario_id", usuarioController.update);
router.delete("/delete/:usuario_id", usuarioController.delete);
router.patch(
  "/assinar/:usuario_id/:termo_id",
  ValidateSchema(UsuarioSchema.assinarTermo),
  usuarioController.assinarTermo
);

export default router;
