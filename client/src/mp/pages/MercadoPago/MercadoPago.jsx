import { useLocation } from "react-router-dom";
import { AsideMp } from "../../components/AsideMp";
import styles from "./MercadoPago.module.css";
import { useMercadoPago } from "../../context/MercadoPagoContext";
import { useEffect } from "react";

export function Mercadopago() {
  const { pagos, getPagos, setData } = useMercadoPago();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const CUENTA = query.get("CUENTA");
  const MES = query.get("MES");

  useEffect(() => {
    getPagos({ MES });
  }, [CUENTA, MES]);




  return (
    <main className="">
      <AsideMp />
      <section className={styles.section}>Aca irian los pagos</section>
    </main>
  );
}
