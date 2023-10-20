import { useContext } from "react";
import { InputFieldComponent } from "../../../components/inputField/inputFieldComponent";
import { WizardContext } from "../wizard-context";

export const ThirdStep = () => {
  const { setUser, user, errors, setErrors } = useContext(WizardContext);

  // Esse componente é de exemplo com os inputs já aplicados com value relacionado
  // ao user e também uma demonstração de exibição de mensagens de erro

  return (
    <div className="wizardContainerFS">
      <InputFieldComponent
        htmlFor="document"
        type="text"
        name="userDocument"
        id="document"
        idContainer="userDocument"
        label="Documento *"
        placeholder="Documento"
        value={user.cpf}
        onChange={(e) => setUser({ ...user, cpf: e })}
      />
      {errors.cpf && <label>{errors.cpf}</label>}
      <InputFieldComponent
        htmlFor="phone"
        type="text"
        name="userPhone"
        id="phone"
        idContainer="userPhone"
        label="Telefone"
        placeholder="Telefone"
        value={user.telefone}
        onChange={(e) => setUser({ ...user, telefone: e })}
      />
      {errors.telefone && <label>{errors.telefone}</label>}
      <InputFieldComponent
        htmlFor="zipCode"
        type="text"
        name="userZipCode"
        id="zipCode"
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
        htmlFor="street"
        type="text"
        name="userStreet"
        id="street"
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
        htmlFor="number"
        type="text"
        name="houseNumber"
        idContainer="houseNumber"
        id="number"
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
        name="userComplement"
        id="complement"
        idContainer="userComplement"
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
        htmlFor="neighborhood"
        type="text"
        name="userNeighborhood"
        id="neighborhood"
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
        htmlFor="city"
        type="text"
        name="userCity"
        id="city"
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
        htmlFor="state"
        type="text"
        name="userState"
        id="state"
        idContainer="userState"
        label="Estado"
        placeholder="Estado"
        value={user.endereco.estado}
        onChange={(e) =>
          setUser({ ...user, endereco: { ...user.endereco, estado: e } })
        }
      />
      {errors.endereco.estado && <label>{errors.endereco.estado}</label>}
    </div>
  );
};
