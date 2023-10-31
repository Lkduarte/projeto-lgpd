import "./userStyles.css";
import "../global.css";
import { useContext } from "react";
import { FirstStep } from "./steps/first-step";
import {
  WizardContext,
  WizardProvider,
  WizardSteps,
} from "../../../contexts/wizard-context";
import { SecondStep } from "./steps/second-step";
import { ThirdStep } from "./steps/third-step";
import Header from "../../components/header/header";

export const UserRegister: React.FC = () => {
  const { step, backStep, nextStep } = useContext(WizardContext);

  return (
    <div>
      <Header />
      <div className="registerContainer">
        {step === WizardSteps.first_module && <FirstStep />}
        {step === WizardSteps.second_module && <SecondStep />}
        {step === WizardSteps.third_module && <ThirdStep />}
        <div className="buttonContainer">
          {step !== WizardSteps.first_module && (
            <button className="wizardButtons" onClick={backStep}>
              Voltar
            </button>
          )}
          <button className="wizardButtons" onClick={nextStep}>
            {step === WizardSteps.third_module ? "Finalizar" : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const UserRegisterPage = () => (
  <WizardProvider>
    <UserRegister />
  </WizardProvider>
);
