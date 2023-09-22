import { Usuario } from "../../entities";
import { usuarioService } from "../../services";

class UsuarioValidator {
  public validateSave = (usuario: Usuario): string | null => {
    if (
      !usuario.nomeUsuario ||
      usuario.nomeUsuario === "" ||
      usuario.nomeUsuario === " "
    )
      return "Você deve informar o nome de usuário.";
    if (
      !usuario.password ||
      usuario.password === "" ||
      usuario.password === " "
    )
      return "Você deve informar uma senha válida.";
    if (
      usuario.password.length < 8 ||
      !/\d/.test(usuario.password) ||
      !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(usuario.password)
    )
      return "Você deve informar uma senha válida.";

    return null;
  };

  public validateUpdate = (usuario: Usuario): string | null => {
    if (!usuario.usuario_id || usuario.usuario_id === "")
      return "O usuário informado não existe.";

    return this.validateSave(usuario);
  };
  public validateLogin = async (usuario: Usuario): Promise<string | null> => {
    const user = await usuarioService.getById(usuario.usuario_id);
    if (!user || user.password !== user.password)
      return "Usuário ou senha incorreto(a).";

    return null;
  };
}

const usuarioValidator = new UsuarioValidator();
export default usuarioValidator;
