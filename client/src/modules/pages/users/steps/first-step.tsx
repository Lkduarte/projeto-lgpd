import { useContext } from "react";
import { InputFieldComponent } from "../../../components/inputField/inputFieldComponent";
import { WizardContext } from "../wizard-context";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
} from "../helper";

export const FirstStep = () => {
  const { setUser, setErrors, user, errors } = useContext(WizardContext);

  return (
    <div className="wizardContainerFS">
      <InputFieldComponent
        name="userName"
        idContainer="userName"
        type="text"
        htmlFor="userName"
        label="Nome Completo*"
        placeholder="Nome"
        value={user.nomeCompleto}
        onChange={(e) => {
          validateName(e, errors, setErrors);
          setUser({ ...user, nomeCompleto: e });
        }}
        isValid={errors.nomeCompleto}
      />
      <InputFieldComponent
        htmlFor="userEmail"
        type="text"
        name="userEmail"
        idContainer="userEmail"
        label="E-mail *"
        placeholder="E-mail"
        value={user.email}
        onChange={(e) => {
          validateEmail(e, errors, setErrors);
          setUser({ ...user, email: e });
        }}
        isValid={errors.email}
      />
      <InputFieldComponent
        htmlFor="password"
        type="password"
        name="password"
        idContainer="password"
        label="Senha *"
        placeholder="Senha"
        value={user.password}
        onChange={(e) => {
          validatePassword(e, errors, setErrors);
          setUser({ ...user, password: e });
        }}
        isValid={errors.password}
      />
      <InputFieldComponent
        htmlFor="passwordConfirmation"
        type="password"
        name="passwordConfirmation"
        idContainer="passwordConfirmation"
        label="Confirmação de Senha *"
        placeholder="Confirmação de Senha"
        value={user.passwordConfirmation}
        onChange={(e) => {
          validatePasswordConfirmation(e, user.password, errors, setErrors);
          setUser({ ...user, passwordConfirmation: e });
        }}
        isValid={errors.passwordConfirmation}
      />
    </div>
  );
};
