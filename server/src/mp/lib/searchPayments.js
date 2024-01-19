import { searchPagosEnCuenta } from "../model/mp.model.js";
import { formatPayments } from "./formatPayments.js";





export const searchPayments = async ({ START_DATE, END_DATE, accounts = [], mostrarTitulares = false }) => {

    const [results] = await Promise.all(accounts.map(async account => {
        const payments = await searchPagosEnCuenta({ START_DATE, END_DATE, TOKEN: account.TOKEN });
        const paymentsFormated = await formatPayments(payments.results, mostrarTitulares, account.ALIAS);
        return paymentsFormated
    }))
    return results;

}



