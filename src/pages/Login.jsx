// Login: entra com e-mail e senha. Valida antes de enviar e mostra
// erros claros. Depois do login, o brechó vai ao painel e o comprador
// ao marketplace (ou volta para a página que tentou abrir antes).
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Field from "../components/Field";

export default function Login() {
  const { login, isLogged, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname; // página que a pessoa queria

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  // Quem já está logado não precisa ver o login
  if (isLogged) {
    return <Navigate to={user.role === "seller" ? "/painel" : "/marketplace"} replace />;
  }

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Digite seu e-mail.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Digite um e-mail válido, como voce@exemplo.com.";
    if (!password) e.password = "Digite sua senha.";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setFormError("");
    if (Object.keys(e).length) return;

    const result = login(email.trim(), password);
    if (!result.ok) return setFormError(result.error);
    navigate(from || (result.role === "seller" ? "/painel" : "/marketplace"), { replace: true });
  }

  return (
    <div className="container auth-wrap">
      <div className="card auth-card">
        <h1>Bem-vindo de volta!</h1>
        <p className="sub">Seu armário virtual te espera. Entre com seus dados.</p>

        {formError && <p role="alert" className="form-alert">{formError}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <Field id="email" label="E-mail" type="email" autoComplete="email"
            placeholder="você@exemplo.com" value={email}
            onChange={(e) => setEmail(e.target.value)} error={errors.email} />

          <Field id="senha" label="Senha" type={showPassword ? "text" : "password"}
            autoComplete="current-password" placeholder="Sua senha" value={password}
            onChange={(e) => setPassword(e.target.value)} error={errors.password} />

          <label className="check">
            <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
            Mostrar senha
          </label>

          <button type="submit" className="btn block" style={{ marginTop: "1rem" }}>Entrar</button>
        </form>

        <p className="center">
          Ainda não possui uma conta? <Link to="/cadastro">Criar conta</Link>
        </p>

        <div className="demo-box">
          <strong>Contas de teste (senha 123456):</strong>
          <br />comprador@klozet.com
          <br />brecho@klozet.com
        </div>
        <p className="field-hint center">Seus dados estão protegidos e suas roupas também.</p>
      </div>
    </div>
  );
}