import styles from "./PagoMp.module.css";
import { format } from "date-fns";


export function PagoMp({ pago, mostrarTitulares = false }) {
  const {
    id,
    date_created,
    payer,
    transaction_details,
    status,
    payer_id,
    titular,
  } = pago;
  const stylesPagoContainer = {
    approved: styles.pagoAprobado,
    inprocess: styles.pagoEnProceso,
    inmediation: styles.pagoEnProceso,
    rejected: styles.pagoRechazado,
    cancelled: styles.pagoRechazado,
    refunded: styles.pagoReintegrado,
    chargedback: styles.pagoReintegrado,
  };
  return (
    <div
      className={
        styles.pago +
        " " +
        (stylesPagoContainer[status] || stylesPagoContainer["approved"])
      }
    >
      <div className="flex justify-between">
        <span>{id}</span>
        <span className={`font-bold ${payer_id ? "text-[#ff8181]" : ""}`}>
          ${transaction_details.total_paid_amount}
        </span>
      </div>
      <div>CUIL {payer?.identification.number}</div>
      <div>{format(date_created,"dd/MM/yy HH:mm")}</div>
      <div>Estado: {status}</div>
      {mostrarTitulares && <div>{titular}</div>}
    </div>
  );
}

