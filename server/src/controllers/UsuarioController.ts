import { Request, Response } from "express";
import { Perfil, Usuario } from "../entities";
import { perfilService, usuarioService } from "../services";
import { Endereco } from "../entities/endereco";
import { usuarioRepository } from "../repositories";
import enderecoRepository from "../repositories/enderecoRepository";

const BAD_REQUEST_STATUS = 400;
const SUCCESS_STATUS = 200;
const INTERNAL_SERVER_ERROR_STATUS = 500;

class UsuarioController {
  async save(req: Request, res: Response) {
    const {
      email,
      password,
      nomeCompleto,
      cpf,
      telefone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      permiteReceberEmailInfos,
      permiteReceberEmailPromocoes,
    } = req.body;

    const saltRounds = 10; // Número de rounds de hashing (quanto maior, mais seguro, mas também mais lento)

    const hashPassword = await usuarioService.gerarHashSenha(
      password,
      saltRounds
    );

    const usuario = new Usuario();
    usuario.email = email;
    usuario.password = hashPassword; // Aqui esta aplicada a lógica de hashing da senha
    usuario.permiteReceberEmailInfos = permiteReceberEmailInfos;
    usuario.permiteReceberEmailPromocoes = permiteReceberEmailPromocoes;

    const perfil = new Perfil();
    perfil.nomeCompleto = nomeCompleto;
    perfil.cpf = cpf;
    perfil.telefone = telefone;

    const endereco = new Endereco();
    endereco.cep = cep;
    endereco.rua = rua;
    endereco.numero = numero;
    endereco.complemento = complemento;
    endereco.bairro = bairro;
    endereco.cidade = cidade;
    endereco.estado = estado;

    // Associar Perfil ao Usuario e Endereco ao Perfil
    usuario.perfil = perfil;
    perfil.usuario = usuario;
    perfil.endereco = endereco;
    endereco.perfil = perfil;

    try {
      // Verifica se o usuário com o mesmo e-mail já existe no banco de dados
      const existingUser = await usuarioRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        return res.status(BAD_REQUEST_STATUS).json({
          message: "E-mail já cadastrado",
        });
      }

      // Verifica se o usuário com o mesmo CPF já existe no banco de dados
      const existingUserByCpf = await perfilService.findByCpf(cpf);

      if (existingUserByCpf) {
        return res.status(BAD_REQUEST_STATUS).json({
          message: "CPF já cadastrado",
        });
      }

      // Se não existir um usuário com o mesmo e-mail ou CPF, continua com a criação do usuário
      await enderecoRepository.save(endereco);
      await perfilService.save(perfil);
      await usuarioRepository.save(usuario);

      res.status(201).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar usuário", error: error.message });
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
