import { useState } from "react";
import { Cruz } from "../../../shared/icons/Cruz/Cruz";
import { useMercadoPago } from "../../context/MercadoPagoContext.jsx";
import { FormButton } from "../ui/FormButton.jsx";
import { FormContainer } from "../ui/FormContainer.jsx";
import { FormContainerBottom } from "../ui/FormContainerBottom.jsx";
import { FormContainerItems } from "../ui/FormContainerItems.jsx";
import { FormHeader } from "../ui/FormHeader.jsx";
import styles from "./AdministrarCuentas.module.css";

export function AdministrarCuentas() {
  const { showAdmin, setShowAdmin, setShowAdd,setShowEdit, cuentas, eliminarCuenta ,setCuentaEdit} =
    useMercadoPago();

  const [message,setMessage] = useState("");


  return (
    <FormContainer visible={showAdmin}>
      <FormHeader>
        Administrar cuentas
        <Cruz onClick={() => setShowAdmin(false)} />
      </FormHeader>
      <FormContainerItems>
        {cuentas.map((cuenta) => (
          <div
            key={cuenta.ID_MP}
            className={
              styles["container--item__item"] +
              " border-b border-solid border-gray-500 grid grid-flow-col items-center px-4 text-xl"
            }
          >
            <span>{cuenta.ALIAS}</span>
            <div className="ml-auto flex gap-4">
              <span
                className={
                  styles["container--item__item__btn--editar"] +
                  " cursor-pointer"
                }
                onClick={() => {
                  setCuentaEdit(cuenta);
                  setShowEdit(true);
                }}
              >
                Editar
              </span>
              <span
                className={
                  styles["container--item__item__btn--eliminar"] +
                  " cursor-pointer"
                }
                onClick={() => eliminarCuenta({ ID_MP: cuenta.ID_MP })}
              >
                Borrar
              </span>
            </div>
          </div>
        ))}
      </FormContainerItems>
      <FormContainerBottom>
        <FormButton onClick={(e) => setShowAdd(true)}>
          Agregar nueva cuenta
        </FormButton>
      </FormContainerBottom>
    </FormContainer>
  );
}
