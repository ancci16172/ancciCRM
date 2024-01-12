


import styles from "./PagoMp.module.css"

export function PagoMp({ pago }) {
    const { id, date_created, payer, transaction_details, status } = pago;
    const stylesPagoContainer = {
        "approved": styles.pagoAprobado,
        "inprocess": styles.pagoEnProceso,
        "inmediation": styles.pagoEnProceso,
        "rejected": styles.pagoRechazado,
        "cancelled": styles.pagoRechazado,
        "refunded": styles.pagoReintegrado,
        "chargedback": styles.pagoReintegrado,
    }
    console.log(status);
    return (
        <div className={styles.pago + " " + (stylesPagoContainer[status] || stylesPagoContainer["approved"])}>
            <div className="flex justify-between">
                <span>{id}</span>
                <span className="font-bold">${transaction_details.total_paid_amount}</span>
            </div>
            <div>CUIL {payer?.identification.number}</div>
            <div>{date_created}</div>
            <div>Estado: {status}</div>
        </div>
    )


}










