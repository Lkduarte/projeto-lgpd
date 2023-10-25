import { DeleteResult, Repository } from "typeorm";
import { Endereco, Perfil, Usuario } from "../entities";
import { usuarioRepository, usuarioTermoRepository } from "../repositories";
import { UsuarioTermo } from "../entities/UsuarioTermo";
import { IUsuarioTermo } from "../interfaces/entities";
import * as bcrypt from "bcrypt";

class UsuarioService {
  repository: Repository<Usuario> = usuarioRepository;
  repositoryUsuarioTermo: Repository<UsuarioTermo> = usuarioTermoRepository;

  public getById = (usuario_id: string): Promise<Usuario | null> => {
    return this.repository.findOne({
      where: { usuario_id },
      relations: { perfil: true },
    });
  };

  // public getByUsername = (nomeUsuario: string): Promise<Usuario | null> => {
  //   return this.repository.findOne({
  //     where: { nomeUsuario },
  //     relations: { perfil: true },
  //   });
  // };

  public save = (usuario: Usuario): Promise<Usuario> => {
    return this.repository.save(usuario);
  };

  public update = (usuario: Usuario): Promise<Usuario> => {
    return this.repository.save(usuario);
  };

  public list = (): Promise<Usuario[]> => {
    return this.repository.find({ relations: { perfil: { endereco: true } } });
  };

  public deleteById = (usuario_id: string): Promise<DeleteResult> => {
    // Salvar id do usuário na tabela de apoio.
    return this.repository.delete({ usuario_id });
  };

  public assinarTermo = (
    usuario_id: string,
    termo_id: string,
    aceito: boolean
  ) => {
    const relation: IUsuarioTermo = {
      aceito,
      usuario_id,
      termo_id,
    };

    return this.repositoryUsuarioTermo.save(relation);
  };

  async gerarHashSenha(password: string, saltRounds: number): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      throw new Error("Erro ao criar hash da senha: " + error.message);
    }
  }

  serializeUsuario(usuario: Usuario): any {
    const {
      usuario_id,
      email,
      permiteReceberEmailPromocoes,
      permiteReceberEmailInfos,
      perfil,
      termosAssinados,
      created_at,
      updated_at,
    } = usuario;
    const serializedPerfil = perfil ? this.serializePerfil(perfil) : null;

    return {
      usuario_id,
      email,
      permiteReceberEmailPromocoes,
      permiteReceberEmailInfos,
      perfil: serializedPerfil,
      created_at,
      updated_at,
    };
  }

  serializePerfil(perfil: Perfil): any {
    const {
      perfil_id,
      nomeCompleto,
      cpf,
      telefone,
      endereco,
      usuario,
      created_at,
      updated_at,
    } = perfil;
    const serializedEndereco = endereco
      ? this.serializeEndereco(endereco)
      : null;
    const serializedUsuario = usuario ? this.serializeUsuario(usuario) : null;

    return {
      perfil_id,
      nomeCompleto,
      cpf,
      telefone,
      endereco: serializedEndereco,
      usuario: serializedUsuario,
      created_at,
      updated_at,
    };
  }

  serializeEndereco(endereco: Endereco): any {
    const {
      endereco_id,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      perfil,
      created_at,
      updated_at,
      deleted_at,
    } = endereco;
    const serializedPerfil = perfil ? this.serializePerfil(perfil) : null;

    return {
      endereco_id,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      perfil: serializedPerfil,
      created_at,
      updated_at,
      deleted_at,
    };
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
