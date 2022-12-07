import NavBar from '../components/NavBar';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  <Head>
    <meta
      name='viewport'
      content='width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0'
    />
  </Head>;
  useEffect(() => {
    // console.log('i am useEffect from app.js');
  }, []);

  const [cart, setCart] = useState([]);
  const [reloadKey, setReloadKey] = useState(1);
  const [viewNav, setViewNav] = useState(false);
  const addToCart = (item, qty, price) => {
    let newCart = cart;
    for (let i = 0; i < qty; i++) {
      newCart.push([item, price]);
    }

    setCart(newCart);
    setReloadKey(Math.random());
  };
  setTimeout(() => {
    setViewNav(true);
  }, 5000);
  const removeFromCart = (item, qty) => {};

  const clearCart = (item) => {};
  return (
    <>
      {viewNav && <NavBar key={reloadKey} cart={cart} />}

      <Component
        setViewNav={setViewNav}
        cart={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        clearCart={clearCart}
        {...pageProps}
      />
    </>
  );
}

export default MyApp;
