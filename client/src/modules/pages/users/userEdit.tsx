import { useContext, useState } from "react";
import { InputFieldComponent } from "../../components/inputField/inputFieldComponent";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";

export const UserEdit = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [usuario, setUsuario] = useState(user);
  
  if (!usuario) {
    navigate("/home");

    return <></>
  }


  return (
    <div className="editContainer">
      <div className="wizardContainerFS">
        <InputFieldComponent
          name="userName"
          idContainer="userName"
          type="text"
          id="nome"
          htmlFor="nome"
          label="Nome *"
          placeholder="Nome"
          value={usuario?.data.name}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, name: e}})}
        />
        <InputFieldComponent
          name="lastName"
          idContainer="lastName"
          type="text"
          id="sobrenome"
          htmlFor="sobrenome"
          label="Sobrenome *"
          placeholder="Sobrenome"
          value={usuario?.data.lastName}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, lastName: e}})}
        />
        <InputFieldComponent
          htmlFor="document"
          type="text"
          name="userDocument"
          id="document"
          idContainer="userDocument"
          label="Documento *"
          placeholder="Documento"
          value={usuario?.data.cpf}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, cpf: e}})}
        />
        <InputFieldComponent
          htmlFor="phone"
          type="text"
          name="userPhone"
          id="phone"
          idContainer="userPhone"
          label="Telefone"
          placeholder="Telefone"
          value={usuario?.data.phone}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, phone: e}})}
        />
        <InputFieldComponent
          htmlFor="zipCode"
          type="text"
          name="userZipCode"
          id="zipCode"
          idContainer="userZipCode"
          label="CEP"
          placeholder="CEP"
          value={usuario?.data.address.cep}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, address: {...usuario.data.address, cep: e} }})}
        />
        <InputFieldComponent
          htmlFor="street"
          type="text"
          name="userStreet"
          id="street"
          idContainer="userStreet"
          label="Rua/Avenida"
          placeholder="Rua/Avenida"
          value={usuario?.data.address.street}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, address: {...usuario.data.address, street: e} }})}
        />
        <InputFieldComponent
          htmlFor="number"
          type="text"
          name="houseNumber"
          idContainer="houseNumber"
          id="number"
          label="Número"
          placeholder="Número"
          value={usuario?.data.address.number}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, address: {...usuario.data.address, number: e} }})}
        />
        <InputFieldComponent
          htmlFor="complement"
          type="text"
          name="userComplement"
          id="complement"
          idContainer="userComplement"
          label="Complemento"
          placeholder="Complemento"
          value={usuario?.data.address.complement}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, address: {...usuario.data.address, complement: e} }})}
        />

        <InputFieldComponent
          htmlFor="neighborhood"
          type="text"
          name="userNeighborhood"
          id="neighborhood"
          idContainer="userNeighborhood"
          label="Bairro"
          placeholder="Bairro"
          value={usuario?.data.address.neighborhood}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, address: {...usuario.data.address, neighborhood: e} }})}
        />
        <InputFieldComponent
          htmlFor="city"
          type="text"
          name="userCity"
          id="city"
          idContainer="userCity"
          label="Cidade"
          placeholder="Cidade"
          value={usuario?.data.address.city}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, address: {...usuario.data.address, city: e} }})}
        />
        <InputFieldComponent
          htmlFor="state"
          type="text"
          name="userState"
          id="state"
          idContainer="userState"
          label="Estado"
          placeholder="Estado"
          value={usuario?.data.address.state}
          onChange={(e) => setUsuario({...usuario, data: {...usuario.data, address: {...usuario.data.address, state: e} }})}
        />
        {/* <InputFieldComponent
          htmlFor="userEmail"
          type="text"
          name="userEmail"
          idContainer="userEmail"
          label="E-mail *"
          placeholder="E-mail"
        /> */}
        <div className="editButtonContainer">
          <button
            onClick={() => navigate("/home")}
            type="submit"
            className="button cancelButton"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate("/editConfirm", {state: usuario} )}
            type="submit"
            className="button loginButton"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
