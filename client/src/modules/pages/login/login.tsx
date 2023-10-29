import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";
import useAlert from "../../../utils/alerts";
import "./loginStyles.css";
import { InputFieldComponent } from "../../components/inputField/inputFieldComponent";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      email == null ||
      email === "" ||
      email === " " ||
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

    login(email, password);
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    navigate("/userRegister");
  };

  return (
    <div className="loginContainer">
      <p className="login">Login</p>
      <div className="loginForm">
        <InputFieldComponent
          label="E-mail"
          htmlFor="email"
          idContainer="loginEmail"
          value={email}
          type="email"
          onChange={(e) => {
            setEmail(e);
          }}
          id="email"
          name="email"
          isValid={true}
        />
        <InputFieldComponent
          label="Senha"
          htmlFor="senha"
          idContainer="loginSenha"
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e);
          }}
          id="senha"
          name="password"
          isValid={true}
        />

        <div className="loginButtonContainer">
          <button
            onClick={handleSubmit}
            type="submit"
            className="confirmButton"
          >
            Entrar
          </button>
          {/* <button className='linkButton'>
            Esqueci minha senha
          </button> */}
          <button onClick={handleRegister} className="linkButton">
            Não possui conta? Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
