import React, { useState } from 'react';
import Cart from './Cart';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleCart={toggleCart} />
      <div className="flex flex-grow overflow-hidden">
        <main className="flex-grow overflow-y-auto p-4">
            <Outlet/>
        </main>
      </div>
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      <Footer/>
    </div>
  );
};

export default Layout;
