import Joi from "joi";
import { Usuario } from "../entities";

const UsuarioSchema = {
  create: Joi.object<Usuario>({
    nomeUsuario: Joi.string().required(),
    password: Joi.string().required(),
    permiteReceberEmailInfos: Joi.boolean().required(),
    permiteReceberEmailPromocoes: Joi.boolean().required(),
  }),
  update: Joi.object<Usuario>({
    usuario_id: Joi.string().required(),
    nomeUsuario: Joi.string().required(),
    password: Joi.string().required(),
    permiteReceberEmailInfos: Joi.boolean().required(),
    permiteReceberEmailPromocoes: Joi.boolean().required(),
  }),
  assinarTermo: Joi.object({
    aceito: Joi.boolean().required(),
  }),
};

export default UsuarioSchema;
