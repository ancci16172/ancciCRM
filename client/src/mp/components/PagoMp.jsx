


import styles from "./PagoMp.module.css"

export function PagoMp({pago}) {
    const {id,date_created,payer,transaction_details,status} = pago;

    return (
        <div className={styles.pago}>
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









