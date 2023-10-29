import { FormikErrors } from "formik";
import {
  IAddress,
  ISignedTerm,
  ITerm,
  IUser,
  IUserData,
} from "../utils/interfaces";
import * as yup from "yup";

interface WizardProps {
  formik: any;
  user: IUser;
  errors: FormikErrors<IUser>;
  step: WizardSteps;
  term: ITerm | undefined;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IUser>>;
  nextStep: () => void;
  backStep: () => void;
  finish: () => void;
}

enum WizardSteps {
  first_module = 1,
  second_module = 2,
  third_module = 3,
}

const defaultUser: IUser = {
  _id: undefined,
  email: "",
  password: "",
  passwordConfirmation: "",
  data: {
    name: "",
    lastName: "",
    cpf: "",
    phone: "",
    address: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "Brasil",
    },
  },
  signedTerms: [],
};

const validation = yup.object<IUser>().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),
  signedTerms: yup
    .array<ISignedTerm[]>()
    .test("signed-term", "Termo obrigatório", (values) => {
      if (!values || values?.length === 0) return false;

      const signTerm: ISignedTerm = values[0];

      return signTerm.isAccepted;
    }),
  data: yup.object<IUserData>().shape({
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
  }),
});

const validateFirstStep = (errors: FormikErrors<IUser>) => {
  return !(
    errors.email ||
    errors.password ||
    errors.passwordConfirmation ||
    (errors.data && (errors.data.name || errors.data.lastName))
  );
};

const validateSecondStep = (errors: FormikErrors<IUser>) => {
  return !errors.signedTerms;
};

const validateThirdStep = (errors: FormikErrors<IUser>) => {
  return !(
    errors.data &&
    errors.data.cpf &&
    errors.data.phone &&
    errors.data.address
  );
};

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

export type { WizardProps };
export {
  WizardSteps,
  defaultUser,
  validation,
  validateFirstStep,
  validateSecondStep,
  validateThirdStep,
};
