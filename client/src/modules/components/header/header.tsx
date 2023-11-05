import { useLocation, useNavigate } from "react-router-dom";
import "./headerStyles.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-context";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, logout } = useContext(AuthContext);

  return (
    <header>
      <div className="logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4151/4151857.png"
          alt="Logo do Site Fictício"
        />
        <p>Loja de celular</p>
      </div>
      <div className="rightSide">
        <div className="cart">
          <button>Meu Carrinho</button>
        </div>
        <div className="userActions">
          {authenticated ? (
            <>
              <button onClick={() => navigate("/userEdit")}>Meu perfil</button>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Fazer Login</button>
              {location.pathname !== "/userRegister" && (
                <button onClick={() => navigate("/userRegister")}>
                  Inscrever-se
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
