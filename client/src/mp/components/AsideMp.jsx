import { useMercadoPago } from "../context/MercadoPagoContext";
import styles from "./AsideMp.module.css";
import { AsideMpCuenta } from "./AsideMpCuenta.jsx";

export function AsideMp() {
  const { cuentas, setShowAdmin } = useMercadoPago();

  return (
    <aside
      className={
        "w-44 fixed flex flex-col  border-r border-black border-solid left-0 " +
        styles.aside
      }
    >
      <h2 className="text-center text-2xl my-2 mb-2">Cuentas</h2>
      <div className={styles["container--cuentas"]}>
        {cuentas.map((cuenta) => (
          <AsideMpCuenta cuenta={cuenta} key={cuenta.ID_MP} />
        ))}
      </div>
      <div className={styles.division} />

      <div>
        <h2 className="text-center text-2xl my-2 mb-2">Opciones</h2>
        <div className={styles["text--item"] + " flex px-7"}>
          <input type="checkbox" className={styles["check--options"]} />
          <span className="text-xs pl-2">Mostrar titulares</span>
        </div>
      </div>

      <div className="mt-auto my-5 text-center">
        <div
          className={styles["btn"] + " " + styles["btn--administrar-cuentas"]}
          onClick={(e) => setShowAdmin(true)}
        >
          Administrar cuentas
        </div>
      </div>
    </aside>
  );
}
