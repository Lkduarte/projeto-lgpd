import React, { useContext, useState } from 'react';
import './homeStyles.css'
import { AuthContext } from '../../../contexts/auth-context';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    
  const { user } = useContext(AuthContext);
  return (
    <header>
      <h1>Bem-vindo à nossa loja de celulares!</h1>
      <div className="user-buttons">
        <button onClick={() => navigate('/userEdit')}>Editar perfil</button>
        {/* <button >Alterar Senha</button> */}
      </div>
    </header>
  );
};

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <section>
      <h2>Produtos em destaque</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      image: 'https://imgs.ponto.com.br/55048758/1g.jpg',
      name: 'AiPhone',
      description: 'Bateria boa, conectado na tomada',
      price: 1900.00,
    },
    {
      id: 2,
      image: 'https://imgs.ponto.com.br/55048758/1g.jpg',
      name: 'UaiPhone',
      description: 'Esse faz um pão de queijo maneiro.',
      price: 12000.00,
    },

  ]);

  return (
    <div>
      <Header />
      <main>
        <ProductList products={products} />
      </main>
    </div>
  );
};

export default Home;
