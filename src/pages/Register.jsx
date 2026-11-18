// Register: cria a conta. A pessoa escolhe se quer COMPRAR ou VENDER;
// isso define o "role" que o Header e os guards usam.
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Field from "../components/Field";

// (35) 99910-1653: deixa só números e coloca parênteses/hífen
function maskPhone(value) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function Register() {
  const { register, isLogged, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "buyer", name: "", email: "", phone: "", password: "", confirm: "", terms: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  if (isLogged) {
    return <Navigate to={user.role === "seller" ? "/painel" : "/marketplace"} replace />;
  }

  // Atualiza um campo do formulário por nome
  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: field === "phone" ? maskPhone(value) : value });
  };

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Digite um nome com pelo menos 2 letras.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Digite um e-mail válido, como voce@exemplo.com.";
    if (form.phone && form.phone.replace(/\D/g, "").length < 10) e.phone = "Digite o telefone com DDD.";
    if (form.password.length < 6) e.password = "A senha precisa ter pelo menos 6 caracteres.";
    if (form.confirm !== form.password) e.confirm = "As senhas não são iguais.";
    if (!form.terms) e.terms = "Aceite os termos para criar a conta.";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setFormError("");
    if (Object.keys(e).length) return;

    const result = register({
      name: form.name.trim(), email: form.email.trim(),
      phone: form.phone, password: form.password, role: form.role,
    });
    if (!result.ok) return setFormError(result.error);
    navigate(form.role === "seller" ? "/painel" : "/marketplace", { replace: true });
  }

  const isSeller = form.role === "seller";

  return (
    <div className="container auth-wrap">
      <div className="card auth-card">
        <h1>Criar conta</h1>
        <p className="sub">Leva menos de um minuto.</p>

        {formError && <p role="alert" className="form-alert">{formError}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="role-options">
            <legend>Eu quero</legend>
            <label className={!isSeller ? "selected" : ""}>
              <input type="radio" name="role" value="buyer" checked={!isSeller} onChange={set("role")} />
              Comprar e doar peças
            </label>
            <label className={isSeller ? "selected" : ""}>
              <input type="radio" name="role" value="seller" checked={isSeller} onChange={set("role")} />
              Vender no meu brechó
            </label>
          </fieldset>

          <Field id="nome" label={isSeller ? "Nome da loja" : "Nome de usuário"} autoComplete="name"
            placeholder={isSeller ? "Escolha o nome da loja" : "Escolha um nome de usuário"}
            value={form.name} onChange={set("name")} error={errors.name} />

          <Field id="email" label="E-mail" type="email" autoComplete="email"
            placeholder="Digite seu e-mail" value={form.email} onChange={set("email")} error={errors.email} />

          <Field id="telefone" label="Telefone (opcional)" type="tel" autoComplete="tel"
            placeholder="Ex: (35) 99910-1653" value={form.phone} onChange={set("phone")} error={errors.phone} />

          <div className="grid cols-2">
            <Field id="senha" label="Senha" type="password" autoComplete="new-password"
              placeholder="Crie uma senha" hint="Mínimo de 6 caracteres."
              value={form.password} onChange={set("password")} error={errors.password} />
            <Field id="confirmar" label="Confirmar senha" type="password" autoComplete="new-password"
              placeholder="Confirme sua senha" value={form.confirm} onChange={set("confirm")} error={errors.confirm} />
          </div>

          <label className="check">
            <input type="checkbox" checked={form.terms} onChange={set("terms")}
              aria-invalid={errors.terms ? "true" : undefined} />
            Eu concordo com os Termos de Uso e a Política de Privacidade do Klozet
          </label>
          {errors.terms && <p className="field-error">{errors.terms}</p>}

          <button type="submit" className="btn block" style={{ marginTop: "1rem" }}>Criar conta</button>
        </form>

        <p className="center">
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}