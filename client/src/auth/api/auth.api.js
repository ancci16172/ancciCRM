import axios from "../../shared/api/axios.js";




export const singInRequest = async (data) => await axios.post("/auth/iniciarSesion",data);

export const verifyTokenRequest = async (token) => await axios.get("/auth/verify",token)