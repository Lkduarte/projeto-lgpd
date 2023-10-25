import { createContext, useEffect, useState } from "react";
import { ITermo } from "../../../utils/interfaces";
import termoController from "../../../services/controllers/termoController";
import {
  WizardProps,
  WizardSteps,
  defaultUser,
  defaultValidation,
  validateFirstStep,
} from "./helper";

const WizardContext = createContext({} as WizardProps);

const WizardProvider = ({ children }: any) => {
  const [user, setUser] = useState(defaultUser);
  const [step, setStep] = useState(WizardSteps.first_module);
  const [errors, setErrors] = useState(defaultValidation());
  const [termo, setTermo] = useState<ITermo | undefined>();

  const finish = () => {
    //VALIDAR CAMPOS
    //ENVIAR DADOS
    console.log("DAR FETCH");
    console.log(user);
  };

  const nextStep = () => {
    const currentStep = step;

    if (currentStep === WizardSteps.first_module) {
      if (validate()) setStep(WizardSteps.second_module);
    } else if (currentStep === WizardSteps.second_module) {
      if (validate()) setStep(WizardSteps.third_module);
    } else if (currentStep === WizardSteps.third_module) {
      if (validate()) finish();
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

  const validate = () => {
    const currentStep = step;

    if (currentStep === WizardSteps.first_module) {
      return validateFirstStep(user, errors, setErrors);
    } else if (currentStep === WizardSteps.second_module) {
      return user.assinouTermo;
    } else if (currentStep === WizardSteps.third_module) {
      return !(errors.cpf || errors.telefone);
    } else {
      return true;
    }
  };

  const loadTermo = async () => {
    const term = await termoController.getAtual();
    setTermo(term);
  };

  useEffect(() => {
    loadTermo();
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
