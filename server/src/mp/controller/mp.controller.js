
import { limitDates } from "../../shared/lib/dates.js";
import { getPayments } from "../model/mp.model.js";


//recibe
/*{
    user
} */
export const getPagos = async (req, res) => {
    try {

        const { MES } = req.body;
        const { START, END } = limitDates(MES);
        const {results : pagos} = await getPayments({ START, END });

        
        res.json(pagos.map(pago => ({
            id : pago.id,
            date_created : pago.date_created,
            date_approved : pago.date_approved,
            operation_type : pago.operation_type,
            transaction_details : pago.transaction_details,
            payer_id  : pago.payer_id,
            status : pago.status
        })))

    } catch (error) {
        console.log(error);
        res.send("error")
    }
}






