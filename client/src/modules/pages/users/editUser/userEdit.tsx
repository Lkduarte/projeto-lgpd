import { useContext } from "react";
import { InputFieldComponent } from "../../../components/inputField/inputFieldComponent";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/auth-context";
import { useFormik } from "formik";
import validation from "./userEdit.helper";
import { defaultUser } from "../../../../contexts/wizard-context.helper";

export const UserEdit = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: user ? user.data : defaultUser.data,
    validateOnMount: false,
    validateOnBlur: true,
    validationSchema: validation,
    onSubmit(values) {
      navigate("/editConfirm", { state: { _id: user?._id, data: values } });
    },
  });

  if (!user) {
    navigate("/home");

    return <></>;
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
          value={formik.values.name}
          onChange={(e) => formik.setFieldValue("name", e)}
          isValid={!formik.errors.name}
        />
        <InputFieldComponent
          name="lastName"
          idContainer="lastName"
          type="text"
          id="sobrenome"
          htmlFor="sobrenome"
          label="Sobrenome *"
          placeholder="Sobrenome"
          value={formik.values.lastName}
          onChange={(e) => formik.setFieldValue("lastName", e)}
          isValid={!formik.errors.lastName}
        />
        <InputFieldComponent
          htmlFor="document"
          type="text"
          name="userDocument"
          id="document"
          idContainer="userDocument"
          label="Documento *"
          placeholder="Documento"
          value={formik.values.cpf}
          onChange={(e) => formik.setFieldValue("cpf", e)}
          isValid={!formik.errors.cpf}
        />
        <InputFieldComponent
          htmlFor="phone"
          type="text"
          name="userPhone"
          id="phone"
          idContainer="userPhone"
          label="Telefone"
          placeholder="Telefone"
          value={formik.values.phone}
          onChange={(e) => formik.setFieldValue("phone", e)}
          isValid={!formik.errors.phone}
        />
        <InputFieldComponent
          htmlFor="zipCode"
          type="text"
          name="userZipCode"
          id="zipCode"
          idContainer="userZipCode"
          label="CEP"
          placeholder="CEP"
          value={formik.values.address.cep}
          onChange={(e) => formik.setFieldValue("address.cep", e)}
          isValid={!(formik.errors.address && formik.errors.address.cep)}
        />
        <InputFieldComponent
          htmlFor="street"
          type="text"
          name="userStreet"
          id="street"
          idContainer="userStreet"
          label="Rua/Avenida"
          placeholder="Rua/Avenida"
          value={formik.values.address.street}
          onChange={(e) => formik.setFieldValue("address.street", e)}
          isValid={!(formik.errors.address && formik.errors.address.street)}
        />
        <InputFieldComponent
          htmlFor="number"
          type="text"
          name="houseNumber"
          idContainer="houseNumber"
          id="number"
          label="Número"
          placeholder="Número"
          value={formik.values.address.number}
          onChange={(e) => formik.setFieldValue("address.number", e)}
          isValid={!(formik.errors.address && formik.errors.address.number)}
        />
        <InputFieldComponent
          htmlFor="complement"
          type="text"
          name="userComplement"
          id="complement"
          idContainer="userComplement"
          label="Complemento"
          placeholder="Complemento"
          value={formik.values.address.complement}
          onChange={(e) => formik.setFieldValue("address.complement", e)}
          isValid={!(formik.errors.address && formik.errors.address.complement)}
        />

        <InputFieldComponent
          htmlFor="neighborhood"
          type="text"
          name="userNeighborhood"
          id="neighborhood"
          idContainer="userNeighborhood"
          label="Bairro"
          placeholder="Bairro"
          value={formik.values.address.neighborhood}
          onChange={(e) => formik.setFieldValue("address.neighborhood", e)}
          isValid={
            !(formik.errors.address && formik.errors.address.neighborhood)
          }
        />
        <InputFieldComponent
          htmlFor="city"
          type="text"
          name="userCity"
          id="city"
          idContainer="userCity"
          label="Cidade"
          placeholder="Cidade"
          value={formik.values.address.city}
          onChange={(e) => formik.setFieldValue("address.city", e)}
          isValid={!(formik.errors.address && formik.errors.address.city)}
        />
        <InputFieldComponent
          htmlFor="state"
          type="text"
          name="userState"
          id="state"
          idContainer="userState"
          label="Estado"
          placeholder="Estado"
          value={formik.values.address.state}
          onChange={(e) => formik.setFieldValue("address.state", e)}
          isValid={!(formik.errors.address && formik.errors.address.state)}
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
            onClick={() => formik.submitForm()}
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
