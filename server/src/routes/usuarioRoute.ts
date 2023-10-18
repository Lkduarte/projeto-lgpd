import { Router } from "express";
import { usuarioController } from "../controllers";
import { ValidateSchema } from "../middlewares/schemas";
import UsuarioSchema from "../schemas/usuario";

const router = Router();

router.get("/", usuarioController.list);
router.get("/:usuario_id", usuarioController.getById);
router.get("/name/:nomeUsuario", usuarioController.getByUsername);
router.post("/", ValidateSchema(UsuarioSchema.create), usuarioController.save);
router.put("/", ValidateSchema(UsuarioSchema.update), usuarioController.update);
router.delete("/:usuario_id", usuarioController.delete);
router.patch(
  "/assinar/:usuario_id/:termo_id",
  ValidateSchema(UsuarioSchema.assinarTermo),
  usuarioController.assinarTermo
);

export default router;
