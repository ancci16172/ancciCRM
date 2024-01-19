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
import { Message, MessagesContainer } from "./Messages.jsx";

export function EditarCuenta() {
  const {
    showEdit,
    setShowEdit,
    cuentaEdit: cuenta,
    editCuenta,
  } = useMercadoPago();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();
  
  const [messages,setMessage] = useState([]);


  const onSubmit = async (values) =>{
    const msg = await editCuenta({ ...values, ID_MP: cuenta.ID_MP });
    setMessage([...messages,msg])
  }

  useEffect(() => {
    if (isDirty) reset();
  }, [cuenta]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer visible={showEdit}>
        <FormHeader>
          Editar cuenta: {cuenta.ALIAS}
          <Cruz onClick={() => setShowEdit(false)} />
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
              defaultValue={cuenta.ALIAS}
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
              defaultValue={cuenta.TOKEN}
              {...register("TOKEN", { required: true })}
            />
          </div>
        </FormContainerItems>
        <FormContainerBottom>
          <MessagesContainer>
            {messages.map((message, i) => {
              return (
                <Message key={i} type={message.error ? "error" : "success"}>
                  {message.msg}
                </Message>
              );
            })}
          </MessagesContainer>
          <FormButton>Editar cuenta</FormButton>
        </FormContainerBottom>
      </FormContainer>
    </form>
  );
}
