// import { useEffect } from "react";
// import { AppearContainer } from "../AppearContainer";
import styles from "./AdministrarCuentas.module.css";
// import { useMercadoPago } from "../../context/MercadoPagoContext";
// import { useForm } from "react-hook-form";
import { useMercadoPago } from "../../context/MercadoPagoContext";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  FormButton,
  FormContainerBottom,
  FormContainerItems,
  FormHeader,
} from "../ui/index.js";
import { Cruz } from "../../../shared/icons/Cruz/Cruz.jsx";

export function AgregarCuentas() {
  const {
    showAdd,
    setShowAdd,
    insertarCuenta,
    getCuentas,
    errors: errorsDb,
  } = useMercadoPago();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (values) => await insertarCuenta(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer visible={showAdd}>
        <FormHeader>
          Agregar cuenta
          <Cruz onClick={() => setShowAdd(false)} />
        </FormHeader>
        <FormContainerItems>
          <div
            className={
              styles["container--item__item"] +
              " border-b border-solid border-gray-500 flex justify-between items-center px-4 text-xl"
            }
          >
            <span>Alias</span>
            <input
              className="outline-none border border-slate-300 px-2 w-3/4"
              type="text"
              placeholder="Alias de referencia"
              {...register("ALIAS", { required: true })}
            />
          </div>
          <div
            className={
              styles["container--item__item"] +
              " border-b border-solid border-gray-500 flex justify-between items-center px-4 text-xl"
            }
          >
            <span>MP Token</span>
            <input
              className="outline-none border border-slate-300 px-2 w-3/4"
              type="text"
              placeholder="Token de seguridad"
              {...register("TOKEN", { required: true })}
            />
          </div>
        </FormContainerItems>
        <FormContainerBottom>
          {errorsDb.map((error) => (
            <div className="justify-self-start px-4 text-rojo font-semibold ">
              *{error.msg}
            </div>
          ))}

          <FormButton>Agregar nueva cuenta</FormButton>
        </FormContainerBottom>
      </FormContainer>
    </form>
  );
}
