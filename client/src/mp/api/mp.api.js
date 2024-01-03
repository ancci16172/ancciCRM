import axios from "../../shared/api/axios.js";




export const getPagosRequest = async (data) => await axios.post("/mp/getPagos",data);
