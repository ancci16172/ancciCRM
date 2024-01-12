import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  editarCuentaRequest,
  eliminarCuentaRequest,
  getCuentasRequest,
  getPagosRequest,
  insertarCuentaRequest,
} from "../api/mp.api";

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
  const [cuentas, setCuentas] = useState([]);
  const [cuentaEdit, setCuentaEdit] = useState({});
  const [pagos, setPagos] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [isLoading, setLoading] = useState(true);

  const getPagos = async (values) => {
    try {
      const pagos = await getPagosRequest(values);
      setPagos(pagos.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCuentas = async () => {
    try {
      const cuentas = await getCuentasRequest();
      setCuentas(cuentas.data);
      setLoading(false);
    } catch (error) {
      console.log("Error al consultar cuentas");
      console.log(error);
    }
  };

  const insertarCuenta = async (values) => {
    try {
      const resultado = await insertarCuentaRequest(values);
      getCuentas();
    } catch (error) {
      console.log("error", error);
    }
  };
  const eliminarCuenta = async (values) => {
    try {
      const resultado = await eliminarCuentaRequest(values.ID_MP);
      getCuentas();
    } catch (error) {
      console.log("error", error);
    }
  };

  const editCuenta = async (values) => {
    try {
      const resultado = await editarCuentaRequest(values);
      await getCuentas();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCuentas();
  }, []);

  return (
    <MercadoPagoContext.Provider
      value={{
        cuentas,
        getPagos,
        pagos,
        showAdmin,
        setShowAdmin,
        getCuentas,
        showAdd,
        setShowAdd,
        insertarCuenta,
        eliminarCuenta,
        showEdit,
        setShowEdit,
        cuentaEdit,
        setCuentaEdit,
        editCuenta,
        setFiltro,
        filtro,
        isLoading,
      }}
    >
      {!isLoading ? <Outlet /> : <div>Cargando...</div>}
    </MercadoPagoContext.Provider>
  );
}
