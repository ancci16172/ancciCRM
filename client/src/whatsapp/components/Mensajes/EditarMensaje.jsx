import { useForm } from "react-hook-form";

import {
  MessageContainer,
  MessageContainerBody,
  MessageContainerHeader,
} from "../ui/Mensajes/ContainerMensaje";
import { GreenButtonBg } from "../ui/GreenButtonBg";
import { useWhatsapp } from "../../context/WhatsappContext";
import {useTimeouts} from "../../../shared/hooks/useTimeouts.js";
import { useEffect, useState } from "react";
import {PError} from "../../../shared/components/Form/PError.jsx"
export function EditMessage() {
  
  const { register, handleSubmit,formState : {errors} ,clearErrors} = useForm();
  const {editableMessage : message,editMessage} = useWhatsapp();
  const {clearOnTimeout} = useTimeouts()
  const [successMessage,setSuccessMessage] = useState(null);

  // clearOnTimeout(successMessage,() => setSuccessMessage(null),2500)
  // clearOnTimeout(errors.TEXT,() => clearErrors(),2500)
  useEffect(() => {
    console.log("RENDERIZAOD DE EDIT MESSAGE")
  },[])

  const onSubmit = (messageNewData) => {
    editMessage(message,messageNewData);
    setSuccessMessage("Mensaje editado con exito.")
  };

  return (
    <MessageContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MessageContainerHeader
          title={"Editar mensaje"}
          toggleString={"EditMessage"}
        />
        <MessageContainerBody
          register={register}
          textAreaName={"TEXT"}
          defaultValue={message.TEXT}
          propsAtRegister={{required : "El mensaje no puede estar vacio."}}
        >
          <GreenButtonBg className={"flex-1"}>Editar mensaje</GreenButtonBg>
          {errors.TEXT && <PError>{errors.TEXT.message}</PError>}
          <p className="text-verde_wsp">{successMessage}</p>
        </MessageContainerBody>
      </form>
    </MessageContainer>
  );
}
