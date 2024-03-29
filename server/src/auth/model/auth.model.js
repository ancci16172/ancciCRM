

import pool from "../../shared/model/mysql-pool.js";



export const registrarUsuarioRequest = async ({usuario,contrasenia}) => {
    
    const [response] = await pool.query(`INSERT INTO usuarios (usuario,contrasenia) VALUES (?,?)`,[usuario,contrasenia]);

    return {usuario,contrasenia}

}
export const getUsuario = async (searchObject) => {
    const [response,query] = await pool.query(`SELECT * FROM Usuarios where ?`,[searchObject]);
    return response[0];
}


