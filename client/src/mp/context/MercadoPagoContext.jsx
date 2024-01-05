import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { getPagosRequest } from "../api/mp.api";

export const MercadoPagoContext = createContext();

export const useMercadoPago = () => {
  const context = useContext(MercadoPagoContext);
  if (!context)
    throw new Error(
      "No existe el MercadoPagoContext debido a que el elemento no se encuentra dentro del Provider"
    );
  return context;
};

export function MercadoPagoProvider({ children }) {
  const [cuentas, setCuentas] = useState([
    {
      ALIAS: "Rodrigo",
    },
    {
      ALIAS: "Alberto",
    },
  ]);
  const [pagos,setPagos] = useState([]);
  const [data,setData] = useState({MES : null,CUENTA : null})
  

  const getPagos = async (values) => {
    try {
      const pagos = await getPagosRequest(values);
      setPagos(pagos.data);

      console.log(pagos.data);
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <MercadoPagoContext.Provider
      value={{
        cuentas,
        getPagos,
        pagos,
        setData
      }}
    >
      <Outlet/>
    </MercadoPagoContext.Provider>
  );
}
