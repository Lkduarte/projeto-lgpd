import { Router } from "express";
import { usuarioController } from "../controllers";

const router = Router();

router.get("/", usuarioController.list);
router.get("/:usuario_id", usuarioController.getById);
router.get("/name/:nomeUsuario", usuarioController.getByUsername);
router.post("/", usuarioController.save);
router.put("/", usuarioController.update);
router.delete("/:usuario_id", usuarioController.delete);

export default router;
