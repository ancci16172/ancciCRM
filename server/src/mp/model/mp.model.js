import {getBody} from "../constants/AXIOS_BODY.js";
import axios from "axios";
import pool from "../../shared/model/mysql-pool.js";

export const getPayments = async ({ MP_TOKEN = "APP_USR-1480419045433997-010116-082925371a6bdb414c95811e543c5e35-759250915", START, END, filtered = false }) => {
    try {

        const { data: raw_payments } = await axios.get(`https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&range=date_created&begin_date=${START}&end_date=${END}&limit=200`, getBody(MP_TOKEN))
        // const { data: raw_payments } = await axios.get(`https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&range=date_created&begin_date=${START}&end_date=${END}&status=approved&limit=200`, getBody(MP_TOKEN))

        // if (filtered) {
        //     const payments = raw_payments.results.filter(payment => !payment.payer_id && payment.transaction_amount > 100);
        //     return payments
        // }

        return raw_payments



    } catch (error) {
        console.log("ERROR AL BUSCAR PAGOS EN MP")
        console.log(error);
        throw new Error(error);
    }

}



export const getCuentasDisponibles = async () => {
    try {
        const [cuentas] = await pool.query(`SELECT * FROM mercadopago where ACTIVO = 1`);
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