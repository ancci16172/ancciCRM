import { Aside } from "../../shared/components/Aside.jsx";
import { useMercadoPago } from "../context/MercadoPagoContext";
import styles from "./AsideMp.module.css";
import { AsideMpCuenta } from "./AsideMpCuenta.jsx";
import { BtnCeleste } from "./ui/BtnCeleste.jsx";
import { LinkConsultarMes } from "./ui/LinkConsultarMes.jsx";
import { OptionsCheckBox } from "../../shared/components/ui/CheckBox/OptionsCheckBox.jsx";

export function AsideMp() {
  const { cuentas, setShowAdmin, setParams, setOptions, options } =
    useMercadoPago();

  //Esta funcion envia a la URL el resultado del check, con el nombre "key"
  const handleCheckBox = (key) => (e) => {
    setOptions({ ...options, [key]: e.target.checked });
  };

  return (
    <Aside title={"Cuentas"}>
      <div className={styles["container--cuentas"]}>
        {cuentas.map((cuenta) => (
          <AsideMpCuenta cuenta={cuenta} key={cuenta.ID_MP} />
        ))}

        <LinkConsultarMes
          MonthString={new Date().toISOString().substring(0,7)}
          cuenta={{ ALIAS: "General", ID_MP: -1 }}
          
        ><div className="text-center hover:text-celeste">Ver todo</div></LinkConsultarMes>
      </div>
      <div className={styles.division} />

      <div className="px-7">
        <h2 className="text-center text-2xl my-2 mb-2">Opciones</h2>
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
    </Aside>
  );
}
