import { Router } from "express";
import usuarioRouter from "./usuarioRoute";
import termoRouter from "./termoRoute";

const router = Router();

router.use("/usuario", usuarioRouter);
router.use("/termo", termoRouter);

export default router;
