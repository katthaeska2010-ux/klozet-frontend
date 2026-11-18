// NotFound: aparece quando o endereço não existe (erro 404).
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container center" style={{ padding: "3rem 1rem" }}>
      <h1>Página não encontrada</h1>
      <p className="sub">Esse endereço não existe ou foi movido.</p>
      <Link to="/" className="btn">Voltar para o início</Link>
    </div>
  );
}