import { Route, Routes } from "react-router-dom";
import Login from "./auth/pages/Login";
import NavBar from "./shared/components/NavBar/NavBar.jsx";
import { AuthProvider } from "./auth/context/AuthContext";
import { useEffect } from "react";
import { IsLoggedInRoutes, IsNotLoggedIntRoutes } from "./ProtectedRoute";
import { DashBoard } from "./shared/pages/DashBoard";
import { Mercadopago } from "./mp/pages/MercadoPago/MercadoPago.jsx";
import {
  MercadoPagoContext,
  MercadoPagoProvider,
} from "./mp/context/MercadoPagoContext.jsx";

function App() {
  return (
    <AuthProvider>
      <NavBar></NavBar>
      <Routes>
        <Route element={<IsNotLoggedIntRoutes />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<IsLoggedInRoutes />}>
          <Route path="/dashboard" element={<DashBoard />} />

          <Route path="/MercadoPago/*" element={<MercadoPagoProvider />}>
            <Route path="" element={<Mercadopago />} />
          </Route>
          
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
