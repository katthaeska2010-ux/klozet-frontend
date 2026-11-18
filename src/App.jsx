// App: o "esqueleto" do site. O Header fica sempre no topo,
// e o <AppRoutes /> troca o conteúdo conforme o endereço.
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <AppRoutes />
      </main>
      <footer className="footer">
        <div className="container">
          <p>© 2026 Klozet. Desapegue do que passou.</p>
        </div>
      </footer>
    </>
  );
}