// Home: a página de entrada (landing), com os 4 pilares do protótipo.
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const FEATURES = [
  { icon: "🛍️", title: "Monte sua vitrine", text: "Cadastre suas peças e venda do seu jeito." },
  { icon: "👗", title: "Garimpe roupas", text: "Peças únicas de brechós perto de você." },
  { icon: "💛", title: "Campanhas de doação", text: "Dê um destino especial às peças paradas." },
  { icon: "👤", title: "Tenha seu próprio perfil", text: "Guarde seus favoritos e acompanhe pedidos." },
];

export default function Home() {
  const { user } = useAuth();
  const homeLink = user?.role === "seller" ? "/painel" : "/marketplace";

  return (
    <div className="container">
      <section className="hero">
        <h1>Desapegue do que passou. Descubra um novo look.</h1>
        <p className="sub">O fim do guarda-roupa de alguém é o começo do seu próximo look favorito.</p>
        <div className="row hero-actions">
          {user ? (
            <Link to={homeLink} className="btn">Ir para o meu espaço</Link>
          ) : (
            <>
              <Link to="/cadastro" className="btn">Criar conta</Link>
              <Link to="/login" className="btn outline">Entrar</Link>
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="titulo-pilares">
        <h2 id="titulo-pilares" className="sr-only">O que você encontra no Klozet</h2>
        <div className="grid cols-4">
          {FEATURES.map((f) => (
            <article key={f.title} className="card feature">
              <span className="feature-icon" aria-hidden="true">{f.icon}</span>
              <h3>{f.title}</h3>
              <p className="sub">{f.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}