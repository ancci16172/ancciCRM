import { Link } from "react-router-dom";
import { useMercadoPago } from "../context/MercadoPagoContext";
import styles from "./AsideMp.module.css";
export function AsideMp() {
  const { cuentas } = useMercadoPago();

  return (
    <aside
      className={
        "w-44 fixed flex flex-col  border-r border-black border-solid left-0 " + styles.aside
      }
    >
      <div>
        <h2 className="text-center text-2xl my-2 mb-2">Cuentas</h2>

        <div className={"px-7 " + styles["cuenta"]}>
          <div className={" " + styles["cuenta__container--title"]}>
            <span className={styles["cuenta__title"]}>Rodrigo</span>
            <span className={styles["cuenta__flecha"] + " my-auto"}></span>
          </div>

          <ul className={styles["text--item"]}>
            <li className="my-2"><Link to="/MercadoPago?CUENTA=Rodrigo&MES=2024-01">Enero</Link></li>
            <li className="my-2"><Link to="/MercadoPago?CUENTA=Rodrigo&MES=2023-12">Diciembre</Link></li>
          </ul>
        </div>

        <div className={styles.division} />
      </div>

      <div>
        <h2 className="text-center text-2xl my-2 mb-2">Opciones</h2>
        <div className={styles["text--item"] + " flex px-7"}>
          <input type="checkbox" className={styles["check--options"]}/>
          <span className="text-xs pl-2">Mostrar titulares</span>
        </div>
      </div>

      <div className="mt-auto my-5 text-center">
        <div className={styles["btn"] + " " + styles["btn--administrar-cuentas"] }>Administrar cuentas</div>
      </div>
    </aside>
  );
}
