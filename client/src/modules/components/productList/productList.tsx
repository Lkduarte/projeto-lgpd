import { Product } from "../../../utils/interfaces";
import React, { useState } from "react";
import ProductItem from "./product";
import "./productStyles.css";

export const ProductListIphone: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      image: "https://images.tcdn.com.br/img/img_prod/737218/iphone_14_128gb_seminovo_8895_1_c84c9b2ce6dffe03c9fddf0566f20d2a.jpg",
      name: "AiPhone",
      description: "iPhone 14 128GB",
      price: 'R$ 4.299,00',
    },
    {
      id: 2,
      image: "https://images.tcdn.com.br/img/img_prod/737218/iphone_14_pro_128gb_seminovo_8939_1_b5f76e36b75ff83f96ea8fb46e7c5d13.jpg",
      name: "UaiPhone",
      description: "iPhone 14 Pro 128GB",
      price:'R$ 5.799,00',
    },
    {
      id: 3,
      image: "https://images.tcdn.com.br/img/img_prod/737218/iphone_11_pro_64gb_seminovo_7747_1_25dd2bb440dcd78c77e1974d76d5698e.jpg",
      name: "UaiPhone",
      description: "iPhone 11 Pro 256GB",
      price: 'R$ 3.999,00',
    },
    {
      id: 4,
      image: "https://images.tcdn.com.br/img/img_prod/737218/iphone_13_pro_256gb_seminovo_8865_1_3dc7900c3140477d2484553a75bd8b30.jpg",
      name: "AiPhone",
      description: "iPhone 13 Pro 256GB",
      price: 'R$ 5.199,00',
    },
  ]);

  return (
    <section>
      <h2 className="titleProducts">Iphone</h2>
      <div className="productList">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export const ProductListAndroid: React.FC = () => {
    const [products] = useState<Product[]>([
      {
        id: 1,
        image: "https://images.tcdn.com.br/img/img_prod/737218/smartphone_samsung_galaxy_s23_2568gb_seminovo_8901_1_b140e8bad775a32627de2b1f7a2c591e.jpg",
        name: "AiPhone",
        description: "Samsung Galaxy S23 256GB",
        price: 'R$ 3.499,00',
      },
      {
        id: 2,
        image: "https://images.tcdn.com.br/img/img_prod/737218/smartphone_samsung_galaxy_a33_5g_128gb_seminovo_8575_1_dbff4fb3fac93effa422e335133bd73e.jpg",
        name: "UaiPhone",
        description: "Samsung Galaxy A33 5G 128GB",
        price: 'R$ 1.349,00',
      },
      {
        id: 3,
        image: "https://images.tcdn.com.br/img/img_prod/737218/smartphone_motorola_moto_e22_128gb_vitrine_8905_1_065f10d9a125ead5d4026450502f47fb.jpg",
        name: "AiPhone",
        description: "Motorola Moto E22 128GB",
        price: 'R$ 1.149,00',
      },
      {
        id: 4,
        image: "https://images.tcdn.com.br/img/img_prod/737218/smartphone_samsung_galaxy_s22_256gb_seminovo_8147_1_86f9f6cd5cd6bc483d341734e2d23429.jpg",
        name: "UaiPhone",
        description: "Samsung Galaxy S22 256GB",
        price: 'R$ 2.999,00',
      },
    ]);
  
    return (
      <section>
        <h2 className="titleProducts">Android</h2>
        <div className="productList">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  };

