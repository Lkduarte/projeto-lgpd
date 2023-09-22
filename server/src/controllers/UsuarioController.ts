import { Request, Response } from "express";
import { Usuario } from "../entities";
import { usuarioValidator } from "../utils/validators";
import { usuarioService } from "../services";

const BAD_REQUEST_STATUS = 400;
const SUCCESS_STATUS = 200;
const INTERNAL_SERVER_ERROR_STATUS = 500;

class UsuarioController {
  async save(req: Request, res: Response) {
    if (!req.body)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    const usuario: Usuario = req.body;
    const validate = usuarioValidator.validateSave(usuario);

    if (validate)
      return res.status(BAD_REQUEST_STATUS).json({ error: validate });

    try {
      const result = await usuarioService.save(usuario);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    if (!req.body)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    const usuario: Usuario = req.body;
    const validate = usuarioValidator.validateUpdate(usuario);

    if (validate)
      return res.status(BAD_REQUEST_STATUS).json({ error: validate });

    try {
      const result = await usuarioService.update(usuario);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const result = await usuarioService.list();

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
      const result = await usuarioService.getById(usuario_id);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }

  async getByUsername(req: Request, res: Response) {
    if (!req.params)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    const { nomeUsuario } = req.params;

    if (!nomeUsuario)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    try {
      const result = await usuarioService.getByUsername(nomeUsuario);

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
      const result = await usuarioService.deleteById(usuario_id);

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }
}

const usuarioController = new UsuarioController();
export default usuarioController;
