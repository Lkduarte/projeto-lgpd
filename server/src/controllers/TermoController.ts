import { Request, Response } from "express";
import { Termo } from "../entities";
import { termoValidator } from "../utils/validators";
import { termoService } from "../services";

const BAD_REQUEST_STATUS = 400;
const SUCCESS_STATUS = 200;
const INTERNAL_SERVER_ERROR_STATUS = 500;

class TermoController {
  async save(req: Request, res: Response) {
    if (!req.body)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    const termo: Termo = req.body;
    const validate = termoValidator.validateSave(termo);

    if (validate)
      return res.status(BAD_REQUEST_STATUS).json({ error: validate });

    try {
      const result = await termoService.save(termo);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const result = await termoService.list();

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async getById(req: Request, res: Response) {
    if (!req.params)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    const { termo_id } = req.params;

    if (!termo_id)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    try {
      const result = await termoService.getById(termo_id);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async getAtual(req: Request, res: Response) {
    try {
      const result = await termoService.getAtual();

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }
}

const termoController = new TermoController();
export default termoController;
