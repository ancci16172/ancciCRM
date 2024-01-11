
import { limitDates } from "../../shared/lib/dates.js";
import { editarCuentaDB, getCuentasDisponibles, insertarCuentaDB } from "../model/mp.model.js";
import { MercadoPagoConfig, Payment, PaymentMethod } from "mercadopago"
import fs from "fs"
//recibe
/*{
    user
} */

export const getPagos = async (req, res) => {


    try {
        const { CUENTA, START_DATE, END_DATE } = req.body;
        const [accounts] = await getCuentasDisponibles([`ID_MP = ${CUENTA}`] );
        if(!accounts)
            return res.status(404).json({msg : "No se encontro la cuenta"})
        

        const client = new MercadoPagoConfig({ accessToken : accounts.TOKEN });
        const payment = new Payment(client);


        const payments = await payment.search({
            options: { begin_date: new Date(START_DATE).toISOString(), end_date: new Date(END_DATE).toISOString(), limit: 200 }
        })

        const resultados = payments.results.map(pago => ({
            id: pago.id,
            date_created: pago.date_created,
            date_approved: pago.date_approved,
            operation_type: pago.operation_type,
            transaction_details: pago.transaction_details,
            payer_id: pago.payer_id,
            status: pago.status,
            payer: pago.payer,
        }));
        res.status(200).json(resultados)

    } catch (error) {
        console.log("error:", error)
        res.status(500).json({ msg: "Error al consultar los pagos de la cuenta" })
    }

    console.log("termino");

}




export const getCuentas = async (req, res) => {

    try {
        const cuentas = await getCuentasDisponibles();
        res.status(200).json(cuentas);

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "No se pudieron consultar las cuentas disponibles" });
    }
}

export const insertarCuenta = async (req, res) => {
    /*req.body = {ALIAS : 'Juan', TOKEN : 'asdasñdhuojasd'}
    */
    try {

        const resultado = await insertarCuentaDB(req.body);
        res.status(200).json({ msg: "Cuentas insertadas correctamente" })
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "No se pudo insertar la nueva cuenta" });
    }

}

export const eliminarCuenta = async (req, res) => {
    const { ID_MP } = req.params
    try {

        const resultado = await editarCuentaDB({ ACTIVO: 0 }, { ID_MP });
        res.status(200).json({ msg: "Cuentas eliminadas correctamente" })

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "No se pudo eliminar la cuenta" });
    }
}

export const editarCuenta = async (req, res) => {
    const { ALIAS, TOKEN, ID_MP } = req.body;

    try {
        const resultado = await editarCuentaDB({ ALIAS, TOKEN }, { ID_MP });
        res.status(200).json({ msg: "Cuentas editada correctamente" })

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "No se pudo editar la cuenta" });
    }
}