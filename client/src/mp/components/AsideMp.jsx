import { getQuery } from "../../shared/lib/params.js";
import { useMercadoPago } from "../context/MercadoPagoContext";
import styles from "./AsideMp.module.css";
import { AsideMpCuenta } from "./AsideMpCuenta.jsx";
import { BtnCeleste } from "./ui/BtnCeleste.jsx";
import { OptionsCheckBox } from "./ui/OptionsCheckBox.jsx";

export function AsideMp() {
  const { cuentas, setShowAdmin, setParams } = useMercadoPago();

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
        <OptionsCheckBox>Mostrar titulares</OptionsCheckBox>
        <OptionsCheckBox
          onChange={(e) =>
            setParams((prev) => {
              const query = getQuery(prev);
              return { ...query, mostrarEgresos: 0 };
            })
          }
        >
          Mostrar egresos
        </OptionsCheckBox>
      </div>

      <div className="mt-auto my-5 text-center">
        <BtnCeleste onClick={(e) => setShowAdmin(true)}>
          Administrar cuentas
        </BtnCeleste>
      </div>
    </aside>
  );
}
