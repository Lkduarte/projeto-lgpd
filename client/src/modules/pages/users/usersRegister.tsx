import "./userStyles.css";
import "../global.css";
import { useContext } from "react";
import { FirstStep } from "./steps/first-step";
import { WizardContext, WizardProvider, WizardSteps } from "./wizard-context";
import { SecondStep } from "./steps/second-step";
import { ThirdStep } from "./steps/third-step";

export const UserRegister: React.FC = () => {
  const { step, backStep, nextStep } = useContext(WizardContext);

  return (
    <div className="registerContainer">
      {step === WizardSteps.first_module && <FirstStep />}
      {step === WizardSteps.second_module && <SecondStep />}
      {step === WizardSteps.third_module && <ThirdStep />}
      <div className="botoes-wizard">
        {step !== WizardSteps.first_module && (
          <button onClick={backStep}>Voltar</button>
        )}
        <button onClick={nextStep}>
          {step === WizardSteps.third_module ? "Finalizar" : "Continuar"}
        </button>
      </div>
    </div>
  );
};

export const UserRegisterPage = () => (
  <WizardProvider>
    <UserRegister />
  </WizardProvider>
);
