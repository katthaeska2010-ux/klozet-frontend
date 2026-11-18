// AuthContext: guarda QUEM está logado e deixa qualquer tela saber disso.
// Tudo fica no localStorage (memória do navegador) até o backend existir.
// ATENÇÃO: guardar senha em texto puro é só para teste/protótipo.
// Com backend de verdade, a senha nunca fica no navegador.

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Contas de demonstração, para testar sem cadastrar
const DEMO_USERS = [
  { name: "Ryan Oliveira", email: "comprador@klozet.com", password: "123456", role: "buyer" },
  { name: "Aconchego Vintage", email: "brecho@klozet.com", password: "123456", role: "seller" },
];

// Funções que leem/gravam sem quebrar se o navegador bloquear o armazenamento
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sem armazenamento: o site continua funcionando, só não lembra */
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load("klozet_user", null));

  // Cadastro: devolve { ok: true } ou { ok: false, error: "mensagem" }
  function register({ name, email, password, phone, role }) {
    const users = [...DEMO_USERS, ...load("klozet_users", [])];
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "Este e-mail já está cadastrado." };
    }
    const newUser = { name, email, password, phone, role };
    save("klozet_users", [...load("klozet_users", []), newUser]);
    const { password: _omit, ...safeUser } = newUser; // não guarda a senha na sessão
    setUser(safeUser);
    save("klozet_user", safeUser);
    return { ok: true, role };
  }

  function login(email, password) {
    const users = [...DEMO_USERS, ...load("klozet_users", [])];
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "E-mail ou senha incorretos." };
    const { password: _omit, ...safeUser } = found;
    setUser(safeUser);
    save("klozet_user", safeUser);
    return { ok: true, role: found.role };
  }

  function logout() {
    setUser(null);
    save("klozet_user", null);
  }

  // Usado pelas telas de perfil (comprador e loja)
  function updateProfile(changes) {
    const updated = { ...user, ...changes };
    setUser(updated);
    save("klozet_user", updated);
  }

  const value = { user, isLogged: !!user, register, login, logout, updateProfile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Atalho: nas telas basta escrever  const { user } = useAuth();
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return ctx;
}