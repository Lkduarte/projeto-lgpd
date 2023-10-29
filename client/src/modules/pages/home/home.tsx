import React from 'react';
import Header from '../../components/header/header';
import { ProductListAndroid, ProductListIphone } from '../../components/productList/productList';
import PaymentList from '../../components/detailInfos/paymentList';
import Footer from '../../components/footer/footer';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <ProductListIphone />
        <ProductListAndroid />
        <PaymentList />
        <Footer />
      </main>
    </div>
  );
};

export default Home;

