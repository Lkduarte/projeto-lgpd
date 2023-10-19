import { useContext } from "react";
import InputFieldComponent from "../../../components/inputField/inputFieldComponent";
import { WizardContext } from "../wizard-context";

export const ThirdStep = () => {
  const { setUser, user, errors } = useContext(WizardContext);

  // Esse componente é de exemplo com os inputs já aplicados com value relacionado
  // ao user e também uma demonstração de exibição de mensagens de erro

  return (
    <>
      <InputFieldComponent
        htmlFor="userDocument"
        type="text"
        name="userDocument"
        idContainer="userDocument"
        label="Documento *"
        placeholder="Documento"
        value={user.cpf}
        onChange={(e) => setUser({ ...user, cpf: e })}
      />
      {errors.cpf && <label>{errors.cpf}</label>}
      <InputFieldComponent
        htmlFor="userPhone"
        type="text"
        name="userPhone"
        idContainer="userPhone"
        label="Telefone"
        placeholder="Telefone"
        value={user.telefone}
        onChange={(e) => setUser({ ...user, telefone: e })}
      />
      {errors.telefone && <label>{errors.telefone}</label>}
    </>
  );
};
