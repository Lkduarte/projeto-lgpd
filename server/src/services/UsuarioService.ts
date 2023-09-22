import { DeleteResult, Repository } from "typeorm";
import { Usuario } from "../entities";
import { usuarioRepository } from "../repositories";

class UsuarioService {
  repository: Repository<Usuario> = usuarioRepository;

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
}

const usuarioService = new UsuarioService();
export default usuarioService;
