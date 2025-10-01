import React, { createContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {

  const addToCart = async (product) => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product),
      }) 
      .then((response) => response.json())
      .then((data) => console.log(data))

      } catch (error) {
      console.error("Erro ao adicionar:", error);
  }
  };

const removeFromCart = async (id) => {
  try {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE"
    });
    console.log("Removido produto com id:", id);
  } catch (error) {
    console.error("Erro ao remover:", error);
  }
};

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}