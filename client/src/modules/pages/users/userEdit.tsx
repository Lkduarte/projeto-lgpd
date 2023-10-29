import { useContext } from "react";
import { InputFieldComponent } from "../../components/inputField/inputFieldComponent";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";

export const UserEdit = () => {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);


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
                    value=""
                />
                <InputFieldComponent
                    name="lastName"
                    idContainer="lastName"
                    type="text"
                    id="sobrenome"
                    htmlFor="sobrenome"
                    label="Sobrenome *"
                    placeholder="Sobrenome"
                    value=""
                />
                <InputFieldComponent
                    htmlFor="document"
                    type="text"
                    name="userDocument"
                    id="document"
                    idContainer="userDocument"
                    label="Documento *"
                    placeholder="Documento"
                />
                <InputFieldComponent
                    htmlFor="phone"
                    type="text"
                    name="userPhone"
                    id="phone"
                    idContainer="userPhone"
                    label="Telefone"
                    placeholder="Telefone"
                />
                <InputFieldComponent
                    htmlFor="zipCode"
                    type="text"
                    name="userZipCode"
                    id="zipCode"
                    idContainer="userZipCode"
                    label="CEP"
                    placeholder="CEP"
                />
                <InputFieldComponent
                    htmlFor="street"
                    type="text"
                    name="userStreet"
                    id="street"
                    idContainer="userStreet"
                    label="Rua/Avenida"
                    placeholder="Rua/Avenida"

                />
                <InputFieldComponent
                    htmlFor="number"
                    type="text"
                    name="houseNumber"
                    idContainer="houseNumber"
                    id="number"
                    label="Número"
                    placeholder="Número"
                />
                <InputFieldComponent
                    htmlFor="complement"
                    type="text"
                    name="userComplement"
                    id="complement"
                    idContainer="userComplement"
                    label="Complemento"
                    placeholder="Complemento"
                />

                <InputFieldComponent
                    htmlFor="neighborhood"
                    type="text"
                    name="userNeighborhood"
                    id="neighborhood"
                    idContainer="userNeighborhood"
                    label="Bairro"
                    placeholder="Bairro"

                />
                <InputFieldComponent
                    htmlFor="city"
                    type="text"
                    name="userCity"
                    id="city"
                    idContainer="userCity"
                    label="Cidade"
                    placeholder="Cidade"

                />
                <InputFieldComponent
                    htmlFor="state"
                    type="text"
                    name="userState"
                    id="state"
                    idContainer="userState"
                    label="Estado"
                    placeholder="Estado"

                />
                <InputFieldComponent
                    htmlFor="userEmail"
                    type="text"
                    name="userEmail"
                    idContainer="userEmail"
                    label="E-mail *"
                    placeholder="E-mail"
                />
                <div className='editButtonContainer'>
                    <button onClick={() => navigate('/home')} type="submit" className='button cancelButton'>
                        Voltar
                    </button>
                    <button onClick={() => navigate('/editConfirm')} type="submit" className='button loginButton'>
                        Confirmar
                    </button>
                </div>
            </div>

        </div>
    );
};
