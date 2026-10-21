import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    let updatedCart = [...cart];

    // Capital 'P' aur 'I' use karein (ProductId)
    const targetId = product.ProductId || product.productId;

    const existing = updatedCart.find(
      (item) => (item.ProductId || item.productId) === targetId
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      updatedCart.push({
        ...product,
        quantity: 1,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);