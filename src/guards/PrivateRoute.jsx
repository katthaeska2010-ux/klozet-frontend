// PrivateRoute: o "segurança" das páginas.
//   - Não logado        -> manda para /login (e lembra para onde ia)
//   - Papel errado      -> manda para a página certa (comprador não entra no painel)
//   - Tudo certo        -> deixa passar (<Outlet /> mostra a página filha)
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ role }) {
  const { user, isLogged } = useAuth();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to={user.role === "seller" ? "/painel" : "/marketplace"} replace />;
  }
  return <Outlet />;
}