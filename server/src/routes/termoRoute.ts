import { Router } from "express";
import { termoController } from "../controllers";
import { ValidateSchema } from "../middlewares/schemas";
import TermoSchema from "../schemas/termo";

const router = Router();

router.get("/", termoController.list);
router.get("/id/:termo_id", termoController.getById);
router.get("/atual/", termoController.getAtual);
router.post("/", ValidateSchema(TermoSchema.create), termoController.save);

export default router;
