import { useContext } from "react";
import InputFieldComponent from "../../../components/inputField/inputFieldComponent";
import { WizardContext } from "../wizard-context";

export const FirstStep = () => {
  const { setUser, user, errors } = useContext(WizardContext);

  // Esse componente é de exemplo com os inputs já aplicados com value relacionado
  // ao user e também uma demonstração de exibição de mensagens de erro

  return (
    <>
      <InputFieldComponent
        name="userName"
        idContainer="userName"
        type="text"
        htmlFor="userName"
        label="Nome Completo*"
        placeholder="Nome"
        value={user.nomeCompleto}
        onChange={(e) => setUser({ ...user, nomeCompleto: e })}
      />
      {errors.nomeCompleto && <label>{errors.nomeCompleto}</label>}
      <InputFieldComponent
        htmlFor="userEmail"
        type="text"
        name="userEmail"
        idContainer="userEmail"
        label="E-mail *"
        placeholder="E-mail"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e })}
      />
      {errors.email && <label>{errors.email}</label>}
      <InputFieldComponent
        htmlFor="password"
        type="password"
        name="password"
        idContainer="password"
        label="Senha *"
        placeholder="Senha"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e })}
      />
      {errors.password && <label>{errors.password}</label>}
      <InputFieldComponent
        htmlFor="passwordConfirmation"
        type="password"
        name="passwordConfirmation"
        idContainer="passwordConfirmation"
        label="Confirmação de Senha *"
        placeholder="Confirmação de Senha"
        value={user.passwordConfirmation}
        onChange={(e) => setUser({ ...user, passwordConfirmation: e })}
      />
      {errors.passwordConfirmation && (
        <label>{errors.passwordConfirmation}</label>
      )}
    </>
  );
};
