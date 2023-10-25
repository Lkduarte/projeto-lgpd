import { Router } from "express";
import usuarioRouter from "./usuarioRoute";
import termoRouter from "./termoRoute";
import perfilRouter from "./perfilRoute";
import enderecoRouter from "./enderecoRoute";

const router = Router();

router.use("/usuario", usuarioRouter);
router.use("/termo", termoRouter);
router.use("/perfil", perfilRouter);
router.use("/endereco", enderecoRouter);

export default router;
