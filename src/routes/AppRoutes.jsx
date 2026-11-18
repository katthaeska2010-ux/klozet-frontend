// AppRoutes: o mapa do site. Cada <Route> liga um endereço a uma tela.
// As telas que ainda não existem usam <ComingSoon />. Conforme criarmos
// cada uma, trocamos aqui pelo componente real.
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../guards/PrivateRoute";
import ComingSoon from "../components/ComingSoon";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas: qualquer pessoa acessa */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      {/* Só comprador logado */}
      <Route element={<PrivateRoute role="buyer" />}>
        <Route path="/marketplace" element={<ComingSoon title="Marketplace" />} />
        <Route path="/doacao" element={<ComingSoon title="Doação" />} />
        <Route path="/carrinho" element={<ComingSoon title="Carrinho" />} />
        <Route path="/perfil" element={<ComingSoon title="Meu perfil" />} />
      </Route>

      {/* Só brechó logado */}
      <Route element={<PrivateRoute role="seller" />}>
        <Route path="/painel" element={<ComingSoon title="Painel do brechó" />} />
        <Route path="/painel/produtos" element={<ComingSoon title="Meus produtos" />} />
        <Route path="/painel/pedidos" element={<ComingSoon title="Pedidos" />} />
        <Route path="/painel/campanhas" element={<ComingSoon title="Campanhas de doação" />} />
        <Route path="/painel/loja" element={<ComingSoon title="Perfil da loja" />} />
      </Route>

      {/* Qualquer outro endereço */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}