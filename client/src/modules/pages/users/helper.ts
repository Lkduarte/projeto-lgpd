import {
  ITermo,
  IUserRegister,
  IUserValidation,
} from "../../../utils/interfaces";

interface WizardProps {
  user: IUserRegister;
  step: WizardSteps;
  errors: IUserValidation;
  termo: ITermo | undefined;
  setErrors: (e: IUserValidation) => void;
  setStep: (e: WizardSteps) => void;
  setUser: (e: IUserRegister) => void;
  nextStep: () => void;
  backStep: () => void;
  finish: () => void;
}

enum WizardSteps {
  first_module = 1,
  second_module = 2,
  third_module = 3,
}

const defaultUser: IUserRegister = {
  email: "",
  password: "",
  passwordConfirmation: "",
  nomeCompleto: "",
  cpf: "",
  telefone: "",
  endereco: {
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  },
  permiteReceberEmailInfos: false,
  permiteReceberEmailPromocoes: false,
  termo_id: "",
  assinouTermo: false,
};

// Objeto initial de validação, quando um campo estiver NULL significa que não há erros vinculados a ele,
// quando houver alguma string associada, essa string representará a mensagem de erro
const defaultValidation = (): IUserValidation => {
  return {
    email: true,
    password: true,
    passwordConfirmation: true,
    nomeCompleto: true,
    cpf: true,
    telefone: true,
    endereco: {
      cep: true,
      rua: true,
      numero: true,
      complemento: true,
      bairro: true,
      cidade: true,
      estado: true,
    },
  };
};

const validateFirstStep = (
  user: IUserRegister,
  errors: IUserValidation,
  setErrors: (e: IUserValidation) => void
) => {
  let check = true;
  const newError = defaultValidation();

  if (!user.nomeCompleto || user.nomeCompleto.trim() === "") {
    newError.nomeCompleto = false;
    check = false;
  }
  if (!user.email || user.email.trim() === "" || !user.email.includes("@")) {
    newError.email = false;
    check = false;
  }
  if (
    !user.password ||
    user.password.trim() === "" ||
    user.password.length < 6
  ) {
    newError.password = false;
    check = false;
  }
  if (
    !user.passwordConfirmation ||
    user.passwordConfirmation !== user.password
  ) {
    newError.passwordConfirmation = false;
    check = false;
  }

  if (!check)
    setErrors({
      ...errors,
      nomeCompleto: newError.nomeCompleto,
      email: newError.email,
      password: newError.password,
      passwordConfirmation: newError.passwordConfirmation,
    });

  return check;
};

const validateName = (
  text: string,
  errors: IUserValidation,
  setErrors: (e: IUserValidation) => void
) => {
  setErrors({ ...errors, nomeCompleto: !(!text || text.trim() === "") });
};

const validateEmail = (
  text: string,
  errors: IUserValidation,
  setErrors: (e: IUserValidation) => void
) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  setErrors({
    ...errors,
    email: emailRegex.test(text),
  });
};

const validatePassword = (
  text: string,
  errors: IUserValidation,
  setErrors: (e: IUserValidation) => void
) => {
  setErrors({
    ...errors,
    password: !(!text || text.trim() === "" || text.length < 6),
  });
};

const validatePasswordConfirmation = (
  text: string,
  password: string,
  errors: IUserValidation,
  setErrors: (e: IUserValidation) => void
) => {
  setErrors({ ...errors, passwordConfirmation: !(!text || text !== password) });
};

const validateCpf = (
  text: string,
  errors: IUserValidation,
  setErrors: (e: IUserValidation) => void
) => {
  const t = text.replaceAll(".", "").replace("-", "").replaceAll("_", "");

  if (t.length !== 11) {
    setErrors({
      ...errors,
      cpf: false,
    });
    return;
  }

  const isAllDigitsEqual = /^(.)\1+$/.test(t);
  if (isAllDigitsEqual) {
    setErrors({
      ...errors,
      cpf: false,
    });
    return;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(t[i]) * (10 - i);
  }

  const remainder = (sum * 10) % 11;
  const firstVerifierDigit = remainder === 10 ? 0 : remainder;

  if (parseInt(t[9]) !== firstVerifierDigit) {
    setErrors({
      ...errors,
      cpf: false,
    });
    return;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(t[i]) * (11 - i);
  }

  const secondRemainder = (sum * 10) % 11;
  const secondVerifierDigit = secondRemainder === 10 ? 0 : secondRemainder;

  let check = parseInt(t[10]) === secondVerifierDigit;

  setErrors({
    ...errors,
    cpf: check,
  });
};

const validateTelefone = (
  text: string,
  errors: IUserValidation,
  setErrors: (e: IUserValidation) => void
) => {
  const t = text
    .replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .replaceAll("_", "")
    .replace(" ", "");

  setErrors({
    ...errors,
    telefone: !(!t || t.trim() === "" || (t.length !== 11 && t.length !== 10)),
  });
};

export {
  WizardSteps,
  defaultUser,
  defaultValidation,
  validateFirstStep,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
  validateCpf,
  validateTelefone,
};
export type { WizardProps };
