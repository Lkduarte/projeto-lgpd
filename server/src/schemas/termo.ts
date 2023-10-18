import Joi from "joi";
import { ITermo } from "../interfaces/entities";

const TermoSchema = {
  create: Joi.object<ITermo>({
    nomeTermo: Joi.string().required(),
    isAtual: Joi.boolean().required(),
  }),
};

export default TermoSchema;
