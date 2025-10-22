import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    try {
      const response = await fetch('http://192.168.15.4:3000/products', { // Substitua pelo seu IP local
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto');
      }

      setCart([...cart, product]);
    } catch (error) {
      console.error('Erro ao adicionar:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://192.168.15.4:3000/products/${productId}`, { // Substitua pelo seu IP local
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao remover produto');
      }

      setCart(cart.filter((item) => item.id !== productId));
    } catch (error) {
      console.error('Erro ao remover:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}