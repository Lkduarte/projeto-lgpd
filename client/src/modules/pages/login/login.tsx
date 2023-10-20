import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";
import useAlert from "../../../utils/alerts";
import './loginStyles.css'
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

  return (

    <div className='loginContainer'>
      <form className='loginForm' onSubmit={handleSubmit}>
        <InputFieldComponent
          label="E-mail"
          htmlFor="email"
          idContainer="loginEmail"
          value={email}
          type="email"
          onChange={(e) => { setEmail(e.target.value) }}
          id="email"
          name="email"
        />
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

        
        <div className='buttonContainer'>
          <button type="submit" className='loginButton'>
            Entrar
          </button>
          <button className='linkButton'>
            Esqueci minha senha
          </button>
          <button className='linkButton'>
            Não possui conta? Cadastre-se
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
