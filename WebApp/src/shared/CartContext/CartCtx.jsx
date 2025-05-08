'use client';

import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(cartItems.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    console.log(item);
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(cartItems.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  useEffect(() => {
    let i =  localStorage?.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : [];
    if(i) setCartItems(i);
  
  }, []);
  useEffect(() => {
    if (cartItems != []) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
