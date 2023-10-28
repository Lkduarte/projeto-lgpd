import { useContext } from "react";
import { InputFieldComponent } from "../../../components/inputField/inputFieldComponent";
import { WizardContext } from "../../../../contexts/wizard-context";

export const ThirdStep = () => {
  const { setFieldValue, user, errors, formik } = useContext(WizardContext);

  return (
    <div className="wizardContainerFS">
      <InputFieldComponent
        htmlFor="document"
        type="text"
        name="userDocument"
        id="document"
        idContainer="userDocument"
        label="CPF *"
        placeholder="CPF"
        maxLength={14}
        mask="999.999.999-99"
        value={user.data.cpf}
        onChange={(e) => {
          setFieldValue("data.cpf", e);
        }}
        isValid={
          formik.status === "VALIDO" ? true : !(errors.data && errors.data.cpf)
        }
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
        value={user.data.phone}
        onChange={(e) => {
          setFieldValue("data.phone", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(errors.data && errors.data.phone)
        }
      />
      <InputFieldComponent
        htmlFor="zipCode"
        type="text"
        name="userZipCode"
        id="zipCode"
        idContainer="userZipCode"
        label="CEP"
        placeholder="CEP"
        value={user.data.address.cep}
        onChange={(e) => {
          setFieldValue("data.address.cep", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(errors.data && errors.data.address && errors.data.address.cep)
        }
      />
      <InputFieldComponent
        htmlFor="street"
        type="text"
        name="userStreet"
        id="street"
        idContainer="userStreet"
        label="Rua/Avenida"
        placeholder="Rua/Avenida"
        value={user.data.address.street}
        onChange={(e) => {
          setFieldValue("data.address.street", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(
                errors.data &&
                errors.data.address &&
                errors.data.address.street
              )
        }
      />
      <InputFieldComponent
        htmlFor="number"
        type="text"
        name="houseNumber"
        idContainer="houseNumber"
        id="number"
        label="Número"
        placeholder="Número"
        value={user.data.address.number}
        onChange={(e) => {
          setFieldValue("data.address.number", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(
                errors.data &&
                errors.data.address &&
                errors.data.address.number
              )
        }
      />
      <InputFieldComponent
        htmlFor="complement"
        type="text"
        name="userComplement"
        id="complement"
        idContainer="userComplement"
        label="Complemento"
        placeholder="Complemento"
        value={user.data.address.complement}
        onChange={(e) => {
          setFieldValue("data.address.complement", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(
                errors.data &&
                errors.data.address &&
                errors.data.address.complement
              )
        }
      />
      <InputFieldComponent
        htmlFor="neighborhood"
        type="text"
        name="userNeighborhood"
        id="neighborhood"
        idContainer="userNeighborhood"
        label="Bairro"
        placeholder="Bairro"
        value={user.data.address.neighborhood}
        onChange={(e) => {
          setFieldValue("data.address.neighborhood", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(
                errors.data &&
                errors.data.address &&
                errors.data.address.neighborhood
              )
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
        value={user.data.address.city}
        onChange={(e) => {
          setFieldValue("data.address.city", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(errors.data && errors.data.address && errors.data.address.city)
        }
      />
      <InputFieldComponent
        htmlFor="state"
        type="text"
        name="userState"
        id="state"
        idContainer="userState"
        label="Estado"
        placeholder="Estado"
        value={user.data.address.state}
        onChange={(e) => {
          setFieldValue("data.address.state", e);
        }}
        isValid={
          formik.status === "VALIDO"
            ? true
            : !(errors.data && errors.data.address && errors.data.address.state)
        }
      />
    </div>
  );
};
