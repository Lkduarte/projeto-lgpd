import * as yup from "yup";
import { IAddress, IUserData } from "../../../../utils/interfaces";

const validation = yup.object<IUserData>().shape({
  name: yup.string().required(),
  lastName: yup.string().required(),
  cpf: yup
    .string()
    .required()
    .test("cpf-validation", "CPF inválido", (value) => validateCPF(value)),
  phone: yup
    .string()
    .required()
    .matches(/^(?:\(\d{2}\)\s\d{5}-\d{4}|\(\d{2}\)\s\d{5}-\d{3})$/),
  address: yup.object<IAddress>().shape({
    cep: yup
      .string()
      .required()
      .test("cep-validation", "CEP inválido", (value) => validateCEP(value)),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().optional(),
    neighborhood: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    country: yup.string().required(),
  }),
});

function validateCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
  if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

function validateCEP(cep: string) {
  if (!cep) return false; // Verifica se o valor está presente

  // Remove qualquer caractere que não seja um dígito
  cep = cep.replace(/[^\d]/g, "");

  // Verifica se o CEP possui exatamente 8 dígitos
  if (cep.length !== 8) return false;

  return true;
}

export default validation;
