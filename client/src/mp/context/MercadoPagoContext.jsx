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

  const getPagos = async (values) => {
    try {
      const pagos = await getPagosRequest(values);
      setPagos(pagos.data);

      console.log(pagos.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCuentas = async () => {
    console.log("CONSULTANDO CUENTAS");
    try {
      const cuentas = await getCuentasRequest();
      setCuentas(cuentas.data);
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
      getCuentas();
    } catch (error) {
      console.log("error", error);
    }
  }

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
        editCuenta
      }}
    >
      <Outlet />
    </MercadoPagoContext.Provider>
  );
}
