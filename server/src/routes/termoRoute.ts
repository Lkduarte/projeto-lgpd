import { Router } from "express";
import { termoController } from "../controllers";

const router = Router();

router.get("/", termoController.list);
router.get("/id/:termo_id", termoController.getById);
router.get("/atual/", termoController.getAtual);
router.post("/", termoController.save);

export default router;
