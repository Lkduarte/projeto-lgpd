import { DeleteResult, Repository } from "typeorm";
import { Usuario } from "../entities";
import { usuarioRepository, usuarioTermoRepository } from "../repositories";
import { UsuarioTermo } from "../entities/UsuarioTermo";
import { IUsuarioTermo } from "../interfaces/entities";

class UsuarioService {
  repository: Repository<Usuario> = usuarioRepository;
  repositoryUsuarioTermo: Repository<UsuarioTermo> = usuarioTermoRepository;

  public getById = (usuario_id: string): Promise<Usuario | null> => {
    return this.repository.findOne({
      where: { usuario_id },
      relations: { perfil: true },
    });
  };

  public getByUsername = (nomeUsuario: string): Promise<Usuario | null> => {
    return this.repository.findOne({
      where: { nomeUsuario },
      relations: { perfil: true },
    });
  };

  public save = (usuario: Usuario): Promise<Usuario> => {
    return this.repository.save(usuario);
  };

  public update = (usuario: Usuario): Promise<Usuario> => {
    return this.repository.save(usuario);
  };

  public list = (): Promise<Usuario[]> => {
    return this.repository.find();
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
}

const usuarioService = new UsuarioService();
export default usuarioService;
