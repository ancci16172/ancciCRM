import { useForm } from "react-hook-form";

import {
  MessageContainer,
  MessageContainerBody,
  MessageContainerHeader,
} from "../ui/Mensajes/ContainerMensaje";
import { GreenButtonBg } from "../ui/GreenButtonBg";
import { useWhatsapp } from "../../context/WhatsappContext";

export function EditMessage() {
  const { register, handleSubmit } = useForm();
  const {editableMessage : message,editMessage} = useWhatsapp();

  const onSubmit = (messageNewData) => {
    editMessage(message,messageNewData);
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
        >
          <GreenButtonBg className={"flex-1"}>Editar mensaje</GreenButtonBg>
        </MessageContainerBody>
      </form>
    </MessageContainer>
  );
}
