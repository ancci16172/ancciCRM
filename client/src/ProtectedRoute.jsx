import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/context/AuthContext";

export function IsLoggedInRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <h1>Cargando...</h1>;
  if (!isAuthenticated ) return <Navigate to="/" replace />;

  return <Outlet />;
}


export function IsNotLoggedIntRoutes() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <h1>Cargando...</h1>;
    if (isAuthenticated  ) return <Navigate to="/dashboard" replace />;
  
    return <Outlet />;
} 