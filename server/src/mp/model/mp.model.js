import {getBody} from "../constants/AXIOS_BODY.js";
import axios from "axios";
import pool from "../../shared/model/mysql-pool.js";


export const getCuentasDisponibles = async (whereCondition = ["TRUE"]) => {
    const whereSql = whereCondition.join(" AND ");
    try {
        const [cuentas] = await pool.query(`SELECT * FROM mercadopago where ${whereSql} AND ACTIVO = 1`);
        return cuentas
    } catch (error) {
        throw new Error(error)
    }
}

export const insertarCuentaDB = async ({ALIAS,TOKEN}) => {
    try {
        const [resultado] = await pool.query(`INSERT INTO mercadopago (ALIAS,TOKEN) VALUES (?,?) `,[ALIAS,TOKEN]);
        return resultado
    } catch (error) {
        throw new Error(error)
    }
}

export const editarCuentaDB = async (values,{ID_MP}) => {
    try {
        const [resultado] = await pool.query(`UPDATE mercadopago SET ? WHERE ? `,[values,{ID_MP}]);
        return resultado
    } catch (error) {
        throw new Error(error)
    }
}