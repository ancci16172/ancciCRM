import { useLocation } from "react-router-dom";
import { AsideMp } from "../../components/AsideMp";
import styles from "./MercadoPago.module.css";
import { useMercadoPago } from "../../context/MercadoPagoContext";
import { useEffect, useState } from "react";
import {PagoMp} from "../../components/PagoMp.jsx";
import { AdministrarCuentas } from "../../components/AdministrarCuentas/AdministrarCuentas.jsx";
import { AgregarCuentas } from "../../components/AdministrarCuentas/AgregarCuentas.jsx";


export function Mercadopago() {
  const { pagos, getPagos, setData } = useMercadoPago();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const CUENTA = query.get("CUENTA");
  const MES = query.get("MES");

  const [showAdmin,setShowAdmin] = useState(false);
  const [showAdd,setShowAdd] = useState(true);

  useEffect(() => {
    getPagos({ MES });
  }, [CUENTA, MES]);




  return (
    <main >
      <AsideMp setShowAdmin={setShowAdmin}/>
      <AdministrarCuentas showAdmin={showAdmin} setShowAdmin={setShowAdmin}/>
      <AgregarCuentas showAdd={showAdd} setShowAdd={setShowAdd}/>
      
      <section className={styles.section}>
        <div>Menu de busqueda y filtro de fechas</div>

        <div className={styles["list--pagos"]}>

          {pagos.map((pago,i) => <PagoMp key={i}/>)}

        </div>
      </section>
    </main>
  );
}
