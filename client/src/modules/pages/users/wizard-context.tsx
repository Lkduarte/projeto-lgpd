import React, { createContext, useEffect, useState } from "react";
import {
  ITermo,
  IUserRegister,
  IUserValidation,
} from "../../../utils/interfaces";

interface WizardProps {
  user: IUserRegister;
  step: WizardSteps;
  errors: IUserValidation;
  termo: ITermo;
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
};

// Objeto initial de validação, quando um campo estiver NULL significa que não há erros vinculados a ele,
// quando houver alguma string associada, essa string representará a mensagem de erro
const defaultValidation: IUserValidation = {
  email: null,
  password: null,
  passwordConfirmation: null,
  nomeCompleto: null,
  cpf: null,
  telefone: null,
  endereco: {
    cep: null,
    rua: null,
    numero: null,
    complemento: null,
    bairro: null,
    cidade: null,
    estado: null,
  },
};

const WizardContext = createContext({} as WizardProps);

const WizardProvider = ({ children }: any) => {
  const [user, setUser] = useState(defaultUser);
  const [step, setStep] = useState(WizardSteps.first_module);
  const [errors, setErrors] = useState(defaultValidation);
  const [termo, setTermo] = useState<ITermo>({} as ITermo);

  const finish = () => {
    //VALIDAR CAMPOS
    //ENVIAR DADOS
  };

  const nextStep = () => {
    const currentStep = step;

    if (currentStep === WizardSteps.first_module) {
      if (validateStep()) setStep(WizardSteps.second_module);
    } else if (currentStep === WizardSteps.second_module) {
      if (validateStep()) setStep(WizardSteps.third_module);
    } else if (currentStep === WizardSteps.third_module) {
      if (validateStep()) finish();
    }
  };

  const backStep = () => {
    const currentStep = step;

    if (currentStep === WizardSteps.second_module) {
      //REMOVER CAMPOS PREENCHIDOS OU APENAS VOLTAR?
      setStep(WizardSteps.first_module);
    } else if (currentStep === WizardSteps.third_module) {
      //REMOVER CAMPOS PREENCHIDOS OU APENAS VOLTAR?
      setStep(WizardSteps.second_module);
    }
  };

  const validateStep = () => {
    const currentStep = step;

    if (currentStep === WizardSteps.first_module) {
      // VALIDAR CAMPOS A PARTIR DO SEGUINTE EXEMPLO:

      return !(
        errors.nomeCompleto ||
        errors.email ||
        errors.password ||
        errors.passwordConfirmation ||
        errors.password !== errors.passwordConfirmation
      );
    } else if (currentStep === WizardSteps.second_module) {
      // VALIDAR CAMPOS A PARTIR DO SEGUINTE EXEMPLO:

      return !(
        errors.endereco.cep ||
        errors.endereco.rua ||
        errors.endereco.bairro ||
        errors.endereco.cidade ||
        errors.endereco.complemento ||
        errors.endereco.estado
      );
    } else if (currentStep === WizardSteps.third_module) {
      // VALIDAR CAMPOS A PARTIR DO SEGUINTE EXEMPLO:

      return !(errors.telefone || errors.cpf);
    }

    return true;
  };

  useEffect(() => {
    //loadTermo();
  }, []);

  return (
    <WizardContext.Provider
      value={{
        user,
        setUser,
        step,
        setStep,
        nextStep,
        backStep,
        finish,
        errors,
        setErrors,
        termo,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardSteps, WizardContext, WizardProvider };
