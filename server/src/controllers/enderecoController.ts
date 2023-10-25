import { Request, Response } from "express";
import { Endereco } from "../entities";
import { enderecoService } from "../services";

const BAD_REQUEST_STATUS = 400;
const SUCCESS_STATUS = 200;
const INTERNAL_SERVER_ERROR_STATUS = 500;

class EnderecoController {
  async save(req: Request, res: Response) {
    const endereco: Endereco = req.body;

    try {
      const result = await enderecoService.save(endereco);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    const endereco: Endereco = req.body;

    try {
      const result = await enderecoService.update(endereco);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const result = await enderecoService.list();

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

    const { usuario_id } = req.params;

    if (!usuario_id)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    try {
      const result = await enderecoService.getById(usuario_id);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async delete(req: Request, res: Response) {
    if (!req.params)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    const { usuario_id } = req.params;

    if (!usuario_id)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    try {
      const result = await enderecoService.deleteById(usuario_id);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }
}

const enderecoController = new EnderecoController();
export default enderecoController;
