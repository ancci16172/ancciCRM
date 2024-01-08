import axios from "../../shared/api/axios.js";




export const getPagosRequest = async (data) => await axios.post("/mp/getPagos",data);
export const getCuentasRequest = async () => await axios.get("/mp/getCuentas");
export const insertarCuentaRequest = async (data) => await axios.post("/mp/insertarCuenta",data);
export const eliminarCuentaRequest = async (data) => await axios.delete(`/mp/eliminarCuenta/${data}`);
export const editarCuentaRequest = async (data) => await axios.put(`/mp/editarCuenta`,data);


