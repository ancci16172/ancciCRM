import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import {
  editarCuentaRequest,
  eliminarCuentaRequest,
  getCuentasRequest,
  getPagosRequest,
  insertarCuentaRequest,
} from "../api/mp.api";
import { getQuery } from "../../shared/lib/params";
import { getParsedLs } from "../../shared/lib/storage";

export const MercadoPagoContext = createContext();

export const useMercadoPago = () => {
  const context = useContext(MercadoPagoContext);
  if (!context)
    throw new Error(
      "No existe el MercadoPagoContext debido a que el elemento no se encuentra dentro del Provider"
    );
  return context;
};

export function MercadoPagoProvider({}) {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaEdit, setCuentaEdit] = useState({});
  const [pagos, setPagos] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLoadingPagos, setLoadingPagos] = useState(false);
  const [params, setParams] = useSearchParams();
  /*Los erros de mercado pagos siempre deben llegar como [{msg : "nombre del error"}] */
  const [errors, setErrors] = useState([]);
  const [options, setOptions] = useState(
    getParsedLs("options") || {
      mostrarEgresos: false,
      mostrarIngresos: true,
      mostrarTitulares: false,
    }
  );

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    setTimeout(()=>setErrors([]),3000);
  },[errors])

  
  const getPagos = async (values) => {
    try {
      setLoadingPagos(true);
      const pagos = await getPagosRequest(values);
      setPagos(pagos.data);
    } catch (error) {
      setErrors(error)
      console.log(error);
    } finally {
      setLoadingPagos(false);
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

  useEffect(() => {
    const query = getQuery(params);
    const { START_DATE, END_DATE, CUENTA } = query;
    if (START_DATE && END_DATE && CUENTA)
      getPagos({ ...query, mostrarTitulares: options.mostrarTitulares });
  }, [params, options.mostrarTitulares]);

  const getCuentaSeleccionada = () => {
    const query = getQuery(params);
    return cuentas.filter((cuenta) => cuenta.ID_MP == query.CUENTA)[0];
  };

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
        setParams,
        getCuentaSeleccionada,
        options,
        setOptions,
        errors,
        isLoadingPagos,
      }}
    >
      {!isLoading ? <Outlet /> : <div>Cargando...</div>}
    </MercadoPagoContext.Provider>
  );
}
