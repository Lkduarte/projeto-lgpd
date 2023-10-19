import { useContext } from "react";
import InputFieldComponent from "../../../components/inputField/inputFieldComponent";
import { WizardContext } from "../wizard-context";

export const SecondStep = () => {
  const { setUser, user, errors, setErrors } = useContext(WizardContext);

  // Esse componente é de exemplo com os inputs já aplicados com value relacionado
  // ao user e também uma demonstração de exibição de mensagens de erro.
  // Também adicionei no campo de CEP um exemplo de como definir um erro para o campo!

  return (
    <>
      <InputFieldComponent
        htmlFor="userZipCode"
        type="text"
        name="userZipCode"
        idContainer="userZipCode"
        label="CEP"
        placeholder="CEP"
        value={user.endereco.cep}
        onChange={(e) => {
          setUser({ ...user, endereco: { ...user.endereco, cep: e } });
          setErrors({
            ...errors,
            endereco: { ...errors.endereco, cep: "CEP inválido!" },
          });
        }}
      />
      {errors.endereco.cep && <label>{errors.endereco.cep}</label>}
      <InputFieldComponent
        htmlFor="userStreet"
        type="text"
        name="userStreet"
        idContainer="userStreet"
        label="Rua/Avenida"
        placeholder="Rua/Avenida"
        value={user.endereco.rua}
        onChange={(e) =>
          setUser({ ...user, endereco: { ...user.endereco, rua: e } })
        }
      />
      {errors.endereco.rua && <label>{errors.endereco.rua}</label>}
      <InputFieldComponent
        htmlFor="houseNumber"
        type="text"
        name="houseNumber"
        idContainer="houseNumber"
        label="Número"
        placeholder="Número"
        value={user.endereco.numero}
        onChange={(e) =>
          setUser({ ...user, endereco: { ...user.endereco, numero: e } })
        }
      />
      {errors.endereco.numero && <label>{errors.endereco.numero}</label>}
      <InputFieldComponent
        htmlFor="complement"
        type="text"
        name="complement"
        idContainer="complement"
        label="Complemento"
        placeholder="Complemento"
        value={user.endereco.complemento}
        onChange={(e) =>
          setUser({ ...user, endereco: { ...user.endereco, complemento: e } })
        }
      />
      {errors.endereco.complemento && (
        <label>{errors.endereco.complemento}</label>
      )}
      <InputFieldComponent
        htmlFor="userNeighborhood"
        type="text"
        name="userNeighborhood"
        idContainer="userNeighborhood"
        label="Bairro"
        placeholder="Bairro"
        value={user.endereco.bairro}
        onChange={(e) =>
          setUser({ ...user, endereco: { ...user.endereco, bairro: e } })
        }
      />
      {errors.endereco.bairro && <label>{errors.endereco.bairro}</label>}
      <InputFieldComponent
        htmlFor="userCity"
        type="text"
        name="userCity"
        idContainer="userCity"
        label="Cidade"
        placeholder="Cidade"
        value={user.endereco.cidade}
        onChange={(e) =>
          setUser({ ...user, endereco: { ...user.endereco, cidade: e } })
        }
      />
      {errors.endereco.cidade && <label>{errors.endereco.cidade}</label>}
      <InputFieldComponent
        htmlFor="userState"
        type="text"
        name="userState"
        idContainer="userState"
        label="Estado"
        placeholder="Estado"
        value={user.endereco.estado}
        onChange={(e) =>
          setUser({ ...user, endereco: { ...user.endereco, estado: e } })
        }
      />
      {errors.endereco.estado && <label>{errors.endereco.estado}</label>}
    </>
  );
};
