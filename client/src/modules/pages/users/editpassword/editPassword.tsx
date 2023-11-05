import { useFormik } from "formik";
import * as yup from "yup";
import { InputFieldComponent } from "../../../components/inputField/inputFieldComponent";
import userController from "../../../../services/controllers/userController";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import useAlert from "../../../../utils/alerts";
import "./editPasswordStyles.css";

const data = {
  password: "",
  newPassword: "",
  newPasswordConfirmation: "",
};

const validation = yup.object().shape({
  password: yup.string().required(),
  newPassword: yup.string().required(),
  newPasswordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")]),
});

export const EditPassword = () => {
  const { user } = useContext(AuthContext);
  const alert = useAlert();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: data,
    validationSchema: validation,
    onSubmit: async (values) => {
      const response = await userController.updatePassword(
        user?._id ?? "",
        values.password,
        values.newPassword
      );

      if (response.response && response.response.status !== 200) {
        let error = response.response.data.message ?? "";
        if (error.includes("unauthorized")) {
          error = "Senha informada é inválida";
        } else {
          error = "Ocorreu um erro ao atualizar sua senha";
        }

        alert.criarAlerta({
          title: "Opss...",
          html: error,
        });
      } else {
        navigate("/home");
      }
    },
  });

  return (
    <div className="editPasswordContainer">
      <div className="">
        <InputFieldComponent
          label="Senha Atual"
          htmlFor="senhaAtual"
          idContainer="senha"
          value={formik.values.password}
          type="password"
          onChange={(e) => {
            formik.setFieldValue("password", e);
          }}
          id="senhaAtual"
          name="passwordAtual"
          isValid={!formik.errors.password}
        />
        <InputFieldComponent
          label="Nova Senha"
          htmlFor="senhaNova"
          idContainer="senha"
          value={formik.values.newPassword}
          type="password"
          onChange={(e) => {
            formik.setFieldValue("newPassword", e);
          }}
          id="senhaNova"
          name="password"
          isValid={!formik.errors.newPassword}
        />
        <InputFieldComponent
          label="Confirmação de Senha"
          htmlFor="senhaConfirmation"
          idContainer="senha"
          value={formik.values.newPasswordConfirmation}
          type="password"
          onChange={(e) => {
            formik.setFieldValue("newPasswordConfirmation", e);
          }}
          id="senhaConfirmation"
          name="passwordConfirmation"
          isValid={!formik.errors.newPasswordConfirmation}
        />
      </div>
      <div className="editButtonContainer">
        <button
          onClick={() => navigate("/userEdit")}
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
  );
};
