import Joi from "joi";
import { Perfil } from "../entities";

const PerfilSchema = {
  create: Joi.object<Perfil>({
    usuario_id: Joi.string().required(),
    nomeCompleto: Joi.string().required(),
    email: Joi.string().required(),
    nomeSocial: Joi.string().optional(),
    cpf: Joi.string().optional(),
    endereco: Joi.string().optional(),
    telefone: Joi.string().optional(),
  }),
  update: Joi.object<Perfil>({
    usuario_id: Joi.string().required(),
    nomeCompleto: Joi.string().required(),
    email: Joi.string().required(),
    nomeSocial: Joi.string().optional(),
    cpf: Joi.string().optional(),
    endereco: Joi.string().optional(),
    telefone: Joi.string().optional(),
  }),
};

export default PerfilSchema;
