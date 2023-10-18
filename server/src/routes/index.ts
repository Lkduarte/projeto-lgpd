import { Router } from "express";
import usuarioRouter from "./usuarioRoute";
import termoRouter from "./termoRoute";
import perfilRouter from "./perfilRoute";

const router = Router();

router.use("/usuario", usuarioRouter);
router.use("/termo", termoRouter);
router.use("/perfil", perfilRouter);

export default router;
