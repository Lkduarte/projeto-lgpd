import { useContext } from "react";
import { InputFieldComponent } from "../../../components/inputField/inputFieldComponent";
import { WizardContext } from "../../../../contexts/wizard-context";

export const FirstStep = () => {
  const { user, errors, setFieldValue, formik } = useContext(WizardContext);

  return (
    <div className="wizardContainerFS">
      <InputFieldComponent
        name="userName"
        idContainer="userName"
        type="text"
        htmlFor="nome"
        id="nome"
        label="Nome*"
        placeholder="Nome"
        value={user.data.name}
        onChange={(e) => {
          setFieldValue("data.name", e);
        }}
        isValid={
          formik.status === "VALIDO" ? true : !(errors.data && errors.data.name)
        }
      />
      <InputFieldComponent
        name="lastName"
        idContainer="lastName"
        type="text"
        htmlFor="sobrenome"
        id="sobrenome"
        label="Sobrenome*"
        placeholder="Sobrenome"
        value={user.data.lastName}
        onChange={(e) => {
          setFieldValue("data.lastName", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(errors.data && errors.data.lastName)
        }
      />
      <InputFieldComponent
        htmlFor="userEmail"
        type="text"
        name="userEmail"
        idContainer="userEmail"
        label="E-mail *"
        placeholder="E-mail"
        value={user.data.email}
        onChange={(e) => {
          setFieldValue("data.email", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(errors.data && errors.data.email)
        }
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
          setFieldValue("password", e);
        }}
        isValid={formik.status === "VALIDO" ? true : !errors.password}
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
          setFieldValue("passwordConfirmation", e);
        }}
        isValid={
          formik.status === "VALIDO" ? true : !errors.passwordConfirmation
        }
      />
    </div>
  );
};
