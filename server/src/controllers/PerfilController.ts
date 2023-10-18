import { Request, Response } from "express";
import { Perfil } from "../entities";
import { perfilService } from "../services";

const BAD_REQUEST_STATUS = 400;
const SUCCESS_STATUS = 200;
const INTERNAL_SERVER_ERROR_STATUS = 500;

class PerfilController {
  async save(req: Request, res: Response) {
    const perfil: Perfil = req.body;

    try {
      const result = await perfilService.save(perfil);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    const perfil: Perfil = req.body;

    try {
      const result = await perfilService.update(perfil);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const result = await perfilService.list();

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
      const result = await perfilService.getById(usuario_id);

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
      const result = await perfilService.deleteById(usuario_id);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }
}

const perfilController = new PerfilController();
export default perfilController;
