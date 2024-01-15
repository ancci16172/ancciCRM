import { getQuery } from "../../shared/lib/params.js";
import { getParsedLs } from "../../shared/lib/storage.js";
import { useMercadoPago } from "../context/MercadoPagoContext";
import styles from "./AsideMp.module.css";
import { AsideMpCuenta } from "./AsideMpCuenta.jsx";
import { BtnCeleste } from "./ui/BtnCeleste.jsx";
import { OptionsCheckBox } from "./ui/OptionsCheckBox.jsx";

export function AsideMp() {
  const { cuentas, setShowAdmin, setParams, setOptions, options } =
    useMercadoPago();

  //Esta funcion envia a la URL el resultado del check, con el nombre "key"
  const handleCheckBox = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

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
        {/* <OptionsCheckBox>Mostrar titulares</OptionsCheckBox> */}
        <OptionsCheckBox
          onChange={handleCheckBox("mostrarEgresos")}
          checked={options.mostrarEgresos}
        >
          Mostrar egresos
        </OptionsCheckBox>
        <OptionsCheckBox
          onChange={handleCheckBox("mostrarIngresos")}
          checked={options.mostrarIngresos}
        >
          Mostrar ingresos
        </OptionsCheckBox>
        <OptionsCheckBox
          onChange={(e) => {
            !e.target.checked ||
            confirm(
              "Activar la visualización de titulares de cuentas podría tener un impacto en el rendimiento. ¿Desea continuar de todos modos?"
            )
              ? handleCheckBox("mostrarTitulares")(e)
              : e.preventDefault();
          }}
          checked={options.mostrarTitulares}
        >
          Mostrar titulares
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
