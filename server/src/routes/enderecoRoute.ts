import { Router } from "express";
import { enderecoController } from "../controllers";

const router = Router();

router.get("/list", enderecoController.list);
router.get("/getByUserId/:endereco_id", enderecoController.getById);
router.post("/create", enderecoController.save);
router.put("/update", enderecoController.update);
router.delete("/delete/:endereco_id", enderecoController.delete);

export default router;
