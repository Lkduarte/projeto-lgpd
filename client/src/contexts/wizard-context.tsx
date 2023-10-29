/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { ISignedOption, ISignedTerm, ITerm } from "../utils/interfaces";
import termoController from "../services/controllers/termoController";
import useAlert from "../utils/alerts";
import authController from "../services/controllers/authController";
import { useNavigate } from "react-router-dom";
import {
  WizardProps,
  WizardSteps,
  defaultUser,
  validateFirstStep,
  validateSecondStep,
  validateThirdStep,
  validation,
} from "./wizard-context.helper";
import { useFormik } from "formik";

const WizardContext = createContext({} as WizardProps);

const WizardProvider = ({ children }: any) => {
  const [step, setStep] = useState(WizardSteps.first_module);
  const [termo, setTermo] = useState<ITerm | undefined>();
  const alert = useAlert();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: defaultUser,
    validateOnMount: false,
    validateOnBlur: true,
    initialStatus: "VALIDO",
    validationSchema: validation,
    onSubmit(values) {
      alert.criarConfirmacao({
        html: "Deseja realmente cadastrar-se no sistema?",
        confirmAction: async () => {
          const { _id, passwordConfirmation, ...data } = values;
          const result = await authController.register(data);

          alert.criarAlerta({
            html: result.error
              ? "Ocorreu um erro ao cadastrar-se."
              : "Cadastro realizado com sucesso!",
            confirmAction: () => {
              navigate("/login");
            },
          });
        },
      });
    },
  });

  const finish = () => {
    formik.submitForm();
  };

  const nextStep = () => {
    const currentStep = step;

    if (currentStep === WizardSteps.first_module) {
      if (validate()) setStep(WizardSteps.second_module);
    } else if (currentStep === WizardSteps.second_module) {
      if (validate()) {
        setStep(WizardSteps.third_module);
        formik.setStatus("VALIDO");
      }
    } else if (currentStep === WizardSteps.third_module) {
      if (validate()) finish();
    }
  };

  const backStep = () => {
    const currentStep = step;

    if (currentStep === WizardSteps.second_module) {
      setStep(WizardSteps.first_module);
    } else if (currentStep === WizardSteps.third_module) {
      setStep(WizardSteps.second_module);
    }
  };

  const validate = () => {
    const currentStep = step;
    formik.setStatus("");
    formik.validateForm();

    if (currentStep === WizardSteps.first_module) {
      return validateFirstStep(formik.errors);
    } else if (currentStep === WizardSteps.second_module) {
      return validateSecondStep(formik.errors);
    } else if (currentStep === WizardSteps.third_module) {
      return validateThirdStep(formik.errors);
    } else {
      return true;
    }
  };

  const loadTermo = async () => {
    const term = await termoController.getAtual();
    if (term) {
      const termAsInterface = term as ITerm;
      setTermo(term);

      const signedOptions: ISignedOption[] = [];

      termAsInterface.options.forEach((option) => {
        signedOptions.push({ optionId: option._id, isAccepted: false });
      });

      formik.setFieldValue("signedTerms", [
        {
          termId: term._id,
          date: new Date(),
          isAccepted: false,
          signedOptions,
        },
      ] as ISignedTerm[]);
    }
  };

  useEffect(() => {
    if (!termo) loadTermo();
  }, []);

  return (
    <WizardContext.Provider
      value={{
        backStep,
        nextStep,
        finish,
        setFieldValue: formik.setFieldValue,
        errors: formik.errors,
        step,
        term: termo,
        user: formik.values,
        formik,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardSteps, WizardContext, WizardProvider };
