import React, { useState, useContext } from "react";
// import'from'""
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth-context";
import useAlert from "../../../utils/alerts";

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
    <div className='imagem'>
      <div className='container_login'>
        <div className='wrap_login'>
          <form className='login_form' onSubmit={handleSubmit}>
            <span className='login_form_title'>Ionic Health™</span>
            <div className='wrap_input'>
              <input
                className='input'
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <span
                className='focus_input'
                data-placeholder="Endereço de e-mail"
              ></span>
            </div>
            <div className='wrap_input'>
              <input
                className='input'
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span
                className='focus_input'
                data-placeholder="Sua senha"
              ></span>
            </div>

            <div className='container_login_form_btn'>
              <button type="submit" className='login_form_btn'>
                Entrar
              </button>
            </div>
            <div>
              <button
                // onClick={passwordRecoveryHandler}
                className='recovery_password_form_btn'
              >
                Esqueci minha senha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
