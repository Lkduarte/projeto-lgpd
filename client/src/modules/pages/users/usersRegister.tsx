import InputFieldComponent from '../../components/inputField/inputFieldComponent';
import './userStyles.css'
import '../global.css'

const UserRegister: React.FC = () => {
    return (
        <div className="registerContainer">
            <InputFieldComponent
                name='userName'
                idContainer='userName'
                type='text'
                htmlFor='userName'
                label='Nome *'
                placeholder='Nome'
            />
            <InputFieldComponent
                htmlFor="userEmail"
                type="text"
                name="userEmail"
                idContainer="userEmail"
                label='E-mail *'
                placeholder='E-mail'
            />
            <InputFieldComponent
                htmlFor="userDocument"
                type="text"
                name="userDocument"
                idContainer="userDocument"
                label='Documento *'
                placeholder='Documento'
            />
            <InputFieldComponent
                htmlFor="userPhone"
                type="text"
                name="userPhone"
                idContainer="userPhone"
                label='Telefone'
                placeholder='Telefone'
            />
            <InputFieldComponent
                htmlFor="userZipCode"
                type="text"
                name="userZipCode"
                idContainer="userZipCode"
                label='CEP'
                placeholder='CEP'
            />
            <InputFieldComponent
                htmlFor="userStreet"
                type="text"
                name="userStreet"
                idContainer="userStreet"
                label='Rua/Avenida'
                placeholder='Rua/Avenida'
            />
            <InputFieldComponent
                htmlFor="houseNumber"
                type="text"
                name="houseNumber"
                idContainer="houseNumber"
                label='Número'
                placeholder='Número'
            />
            <InputFieldComponent
                htmlFor="userNeighborhood"
                type="text"
                name="userNeighborhood"
                idContainer="userNeighborhood"
                label='Bairro'
                placeholder='Bairro'
            />
            <InputFieldComponent
                htmlFor="userCity"
                type="text"
                name="userCity"
                idContainer="userCity"
                label='Cidade'
                placeholder='Cidade'
            />
            <InputFieldComponent
                htmlFor="userState"
                type="text"
                name="userState"
                idContainer="userState"
                label='Estado'
                placeholder='Estado'
            />
            <InputFieldComponent
                htmlFor="userCountry"
                type="text"
                name="userCountry"
                idContainer="userCountry"
                label='País'
                placeholder='País'
            />
        </div>
    )
}

export default UserRegister;