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
import { useEffect, useState } from "react";
import { ErrorMessage, SuccessMessage } from "./Messages.jsx";

export function AgregarCuentas() {
  const { showAdd, setShowAdd, insertarCuenta, getCuentas } = useMercadoPago();
  const [messages, setMessages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    const msg = await insertarCuenta(values);
    console.log({ msg });
    setMessages([...messages, msg]);
  };
  useEffect(() => {
    console.log("useEfect");
    if (messages.length && !messages[messages.length - 1].error) {
      reset();
    }
    const intervalID = setInterval(() => {
      setMessages((prevMensajes) =>
        (prevMensajes.length > 1 ? prevMensajes.slice(1) : [])
      );
    }, 2000);
    return () => clearInterval(intervalID);
    // if (messages.length) {
    //   setTimeout(() => {
    //     setMessages(messages.slice(0, -1));
    //   }, 1000);
    // }
  }, []);

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
          {messages.map((message, i) => {
            console.log({ message });
            return message.error ? (
              <ErrorMessage key={i}>*{message.msg}</ErrorMessage>
            ) : (
              <SuccessMessage key={i}>*{message.msg}</SuccessMessage>
            );
          })}

          <FormButton>Agregar nueva cuenta</FormButton>
        </FormContainerBottom>
      </FormContainer>
    </form>
  );
}
