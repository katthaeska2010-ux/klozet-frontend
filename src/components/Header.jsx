// Header: o cabeçalho. O menu muda conforme quem está logado:
//   ninguém logado -> Entrar / Criar conta
//   comprador      -> Marketplace, Doação, Carrinho, Meu perfil
//   brechó         -> Painel, Meus produtos, Pedidos, Campanhas, Perfil da loja

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { getInitials } from "../utils/format";

const BUYER_LINKS = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/doacao", label: "Doação" },
  { to: "/carrinho", label: "Meu carrinho" },
  { to: "/perfil", label: "Meu perfil" },
];

const SELLER_LINKS = [
  { to: "/painel", label: "Painel", end: true },
  { to: "/painel/produtos", label: "Meus produtos" },
  { to: "/painel/pedidos", label: "Pedidos" },
  { to: "/painel/campanhas", label: "Campanhas" },
  { to: "/painel/loja", label: "Perfil da loja" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // menu aberto no celular?

  const links = !user ? [] : user.role === "seller" ? SELLER_LINKS : BUYER_LINKS;

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo" aria-label="Klozet, página inicial">
          Klozet
        </Link>

        {/* Botão hambúrguer: só aparece em telas pequenas */}
        <button
          className="menu-toggle btn outline small"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fechar" : "Menu"}
        </button>

        <nav id="menu-principal" className={`nav ${open ? "open" : ""}`} aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
              {/* Bolinha com a quantidade no carrinho */}
              {l.to === "/carrinho" && count > 0 && (
                <span className="badge" aria-label={`${count} itens`}>
                  {count}
                </span>
              )}
            </NavLink>
          ))}

          {!user ? (
            <>
              <Link to="/login" className="btn outline small" onClick={() => setOpen(false)}>
                Entrar
              </Link>
              <Link to="/cadastro" className="btn small" onClick={() => setOpen(false)}>
                Criar conta
              </Link>
            </>
          ) : (
            <>
              <span className="user-chip">
                <span className="avatar" aria-hidden="true">
                  {getInitials(user.name)}
                </span>
                {user.name}
              </span>
              <button className="btn outline small" onClick={handleLogout}>
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}