// CartContext: o carrinho de compras, compartilhado entre Header,
// Marketplace e tela do Carrinho.

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
const SHIPPING = 21.9; // frete fixo de exemplo (igual ao protótipo)

function loadCart() {
  try {
    const raw = localStorage.getItem("klozet_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // cada item: { product, size, qty }
  const [items, setItems] = useState(loadCart);

  // Sempre que o carrinho muda, grava no navegador
  useEffect(() => {
    try {
      localStorage.setItem("klozet_cart", JSON.stringify(items));
    } catch {
      /* ignora */
    }
  }, [items]);

  function addItem(product, size) {
    setItems((current) => {
      const exists = current.find((i) => i.product.id === product.id && i.size === size);
      if (exists) {
        return current.map((i) => (i === exists ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...current, { product, size, qty: 1 }];
    });
  }

  function removeItem(productId, size) {
    setItems((current) => current.filter((i) => !(i.product.id === productId && i.size === size)));
  }

  // delta = +1 ou -1. Se chegar a zero, remove o item.
  function changeQty(productId, size, delta) {
    setItems((current) =>
      current
        .map((i) =>
          i.product.id === productId && i.size === size ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = items.length ? SHIPPING : 0;
  const total = subtotal + shipping;

  const value = { items, count, subtotal, shipping, total, addItem, removeItem, changeQty, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}