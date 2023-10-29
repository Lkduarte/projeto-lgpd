import { useNavigate } from 'react-router-dom';
import './headerStyles.css'

function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/4151/4151857.png" alt="Logo do Site Fictício" />
        <p>Loja de celular</p>
      </div>
      <div className="rightSide">
        <div className="cart">
          <button>Meu Carrinho</button>
        </div>
        <div className="userActions">
          <button onClick={() => navigate('/login')}>Fazer Login</button>
          <button onClick={() => navigate('/userRegister')}>Inscrever-se</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
