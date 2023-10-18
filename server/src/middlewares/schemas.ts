import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (e) {
      const { details } = e;
      let error = "Dados inválidos.";

      if (details && details.length) {
        error = details[0].message.replace("is required", "é obrigatório.");
      }

      return res.status(422).json({ error });
    }
  };
};
