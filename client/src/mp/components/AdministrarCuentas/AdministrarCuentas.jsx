import { Cruz } from "../../../shared/icons/Cruz/Cruz";
import { AppearContainer } from "../AppearContainer.jsx";
import styles from "./AdministrarCuentas.module.css";

export function AdministrarCuentas({ showAdmin, setShowAdmin }) {
  console.log("renderizando administrar cuentas");

  return (
    <AppearContainer
      visible={showAdmin}
      title={"Administrar cuentas"}
      btnText={"Agregar nueva cuenta"}
      setVisible={setShowAdmin}
    >
      <div
        className={
          styles["container--item__item"] +
          " border-b border-solid border-gray-500 grid grid-flow-col items-center px-4 text-xl"
        }
      >
        <span>Rodrigo</span>
        <div className="ml-auto flex gap-4">
          <span
            className={
              styles["container--item__item__btn--editar"] + " cursor-pointer"
            }
          >
            Editar
          </span>
          <span
            className={
              styles["container--item__item__btn--eliminar"] + " cursor-pointer"
            }
          >
            Borrar
          </span>
        </div>
      </div>
    </AppearContainer>
  );
}
