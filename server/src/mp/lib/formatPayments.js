import { nomPropio } from "../../shared/lib/formats.js";
import { getContribuyente } from "../model/afip.model.js";


// PUEDE EJECUTAR UN THROW
// FORMATEA LOS PAGOS Y AGREGA LOS TITULARES EN CASO QUE HAGA FALTA
export const formatPayments = async (results, mostrarTitulares = false,alias) => {

    const resultado = await Promise.all(results.map(async pago => {
        const { id, date_created, date_approved, operation_type, transaction_details, payer_id, status, payer } = pago;
        const CUIT = payer ? pago.payer.identification.number : null;

        const date_createdDate = new Date(date_created);
        const date_approvedDate = new Date(date_approved);


        const contribuyente = (CUIT && mostrarTitulares ) ? await getContribuyente({ CUIT }) : null;
        return {
            id,
            date_created: date_createdDate.toISOString(),
            date_approved: date_approvedDate.toISOString(),
            operation_type, transaction_details, payer_id, status, payer,
            esIngreso: !payer_id, esEgreso: !!payer_id,
            titular: (CUIT && mostrarTitulares && contribuyente) ? nomPropio(contribuyente.nombre) : null,
            alias 
        }

    }))


    // for (const pago of results) {

    //     const { id, date_created, date_approved, operation_type, transaction_details, payer_id, status, payer } = pago;
    //     const CUIT = payer ? pago.payer.identification.number : null;

    //     const date_createdDate = new Date(date_created);
    //     const date_approvedDate = new Date(date_approved);
    //     // date_approvedDate.setUTCHours(date_approvedDate.getUTCHours() - 3)
    //     // date_createdDate.setUTCHours(date_createdDate.getUTCHours() - 3)

    //     const contribuyente = (CUIT && mostrarTitulares) ? await getContribuyente({ CUIT }) : null;
    //     resultado.push({
    //         id,
    //         date_created: date_createdDate.toISOString(),
    //         date_approved: date_approvedDate.toISOString(),
    //         operation_type, transaction_details, payer_id, status, payer,
    //         esIngreso: !payer_id, esEgreso: !!payer_id,
    //         titular: (CUIT && mostrarTitulares) ? nomPropio(contribuyente.nombre) : null,
    //         alias 
    //     })



    return resultado;


    }


