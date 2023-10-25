import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../../../utils/alerts";
import './userStyles.css'
import { InputFieldComponent } from "../../components/inputField/inputFieldComponent";

export const EditConfirm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const alert = useAlert();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      password == null ||
      password === "" ||
      password === " "
    ) {
      alert.criarAlerta({
        title: "Opss...",
        html: "E-mail ou senha inválidos.",
      });
      return;
    }

    // login(email, password);
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    // navigate('/userRegister')
  };

  return (

    <div className='loginContainer'>
      <div className='loginForm'>
        <InputFieldComponent
          label="Senha"
          htmlFor="senha"
          idContainer="loginSenha"
          value={password}
          type="password"
          onChange={(e) => { setPassword(e.target.value) }}
          id="senha"
          name="password"
        />
        <div className='loginButtonContainer'>
          <button onClick={() => navigate('/userEdit')} type="submit" className='button cancelButton'>
            Voltar
          </button>
          <button onClick={handleSubmit} type="submit" className='button loginButton'>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditConfirm;
