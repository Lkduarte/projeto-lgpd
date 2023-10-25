import Joi from "joi";
import { Perfil } from "../entities";

const PerfilSchema = {
  create: Joi.object<Perfil>({
    perfil_id: Joi.string().required(),
    cpf: Joi.string().optional(),
    endereco: Joi.string().optional(),
    telefone: Joi.string().optional(),
  }),
  update: Joi.object<Perfil>({
    perfil_id: Joi.string().required(),
    nomeCompleto: Joi.string().required(),
    cpf: Joi.string().optional(),
    endereco: Joi.string().optional(),
    telefone: Joi.string().optional(),
  }),
};

export default PerfilSchema;
