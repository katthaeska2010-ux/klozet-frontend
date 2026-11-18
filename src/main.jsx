// Porta de entrada. Aqui "embrulhamos" o site com os provedores:
//   BrowserRouter -> habilita as rotas (endereços)
//   AuthProvider  -> disponibiliza o login para todas as telas
//   CartProvider  -> disponibiliza o carrinho para todas as telas
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./components/components.css";
import "./pages/pages.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);