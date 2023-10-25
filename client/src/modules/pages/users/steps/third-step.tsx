import { useContext } from "react";
import { InputFieldComponent } from "../../../components/inputField/inputFieldComponent";
import { WizardContext } from "../wizard-context";
import { validateCpf, validateTelefone } from "../helper";

export const ThirdStep = () => {
  const { setUser, user, errors, setErrors } = useContext(WizardContext);

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
        maxLength={14}
        mask="999.999.999-99"
        value={user.cpf}
        onChange={(e) => {
          validateCpf(e, errors, setErrors);
          setUser({ ...user, cpf: e });
        }}
        isValid={errors.cpf}
      />
      <InputFieldComponent
        htmlFor="phone"
        type="text"
        name="userPhone"
        id="phone"
        idContainer="userPhone"
        label="Telefone"
        maxLength={15}
        placeholder="Telefone"
        mask={"(99) 99999-9999"}
        value={user.telefone}
        onChange={(e) => {
          validateTelefone(e, errors, setErrors);
          setUser({ ...user, telefone: e });
        }}
        isValid={errors.telefone}
      />
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
        }}
        isValid={errors.endereco.cep}
      />
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
        isValid={errors.endereco.rua}
      />
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
        isValid={errors.endereco.numero}
      />
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
        isValid={errors.endereco.complemento}
      />
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
        isValid={errors.endereco.bairro}
      />
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
        isValid={errors.endereco.cidade}
      />
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
        isValid={errors.endereco.estado}
      />
    </div>
  );
};
