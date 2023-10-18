import { Request, Response } from "express";
import { Usuario } from "../entities";
import { usuarioService } from "../services";

const BAD_REQUEST_STATUS = 400;
const SUCCESS_STATUS = 200;
const INTERNAL_SERVER_ERROR_STATUS = 500;

class UsuarioController {
  async save(req: Request, res: Response) {
    const usuario: Usuario = req.body;

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
    const usuario: Usuario = req.body;

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

  async assinarTermo(req: Request, res: Response) {
    if (!req.params)
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: "Nenhum dado recebido." });

    const { usuario_id, termo_id } = req.params;

    if (
      !usuario_id ||
      usuario_id.trim() == "" ||
      !termo_id ||
      termo_id.trim() == ""
    )
      return res.status(BAD_REQUEST_STATUS).json({ error: "Dados inválidos" });

    try {
      const result = await usuarioService.assinarTermo(
        usuario_id,
        termo_id,
        true
      );

      return res.status(SUCCESS_STATUS).json(result);
    } catch (e) {
      console.log(e);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ error: e.message });
    }
  }
}

const usuarioController = new UsuarioController();
export default usuarioController;
