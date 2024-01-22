import { getBody } from "../constants/AXIOS_BODY.js";
import axios from "axios";
import pool from "../../shared/model/mysql-pool.js";
import { MercadoPagoConfig, Payment, PaymentMethod } from "mercadopago"


export const getCuentasDisponibles = async (whereCondition = ["TRUE"]) => {
    const whereSql = whereCondition.join(" AND ");
    try {
        const [cuentas] = await pool.query(`SELECT * FROM mercadopago where ${whereSql} AND ACTIVO = 1`);
        return cuentas
    } catch (error) {
        throw new Error(error)
    }
}

export const insertarCuentaDB = async ({ ALIAS, TOKEN }) => {
    try {
        const [resultado] = await pool.query(`INSERT INTO mercadopago (ALIAS,TOKEN) VALUES (?,?) `, [ALIAS, TOKEN]);
        return resultado
    } catch (error) {
        throw new Error(error)
    }
}

export const editarCuentaDB = async (values, { ID_MP }) => {
    try {
        const [resultado] = await pool.query(`UPDATE mercadopago SET ? WHERE ? `, [values, { ID_MP }]);
        return resultado
    } catch (error) {
        throw new Error(error)
    }
}

//Puede recibir Tipo date o bien tipo string
export const searchPagosEnCuenta = async ({ TOKEN, END_DATE, START_DATE }) => {

    const client = new MercadoPagoConfig({ accessToken: TOKEN });
    const payment = new Payment(client);
    const endDateObj = new Date(END_DATE);
    endDateObj.setUTCDate(endDateObj.getUTCDate() + 1);

    const payments = await payment.search({
        options: {
            criteria: "desc", begin_date: new Date(START_DATE).toISOString(),
            end_date: endDateObj.toISOString(), limit: 200
        }
    })
    return payments
}