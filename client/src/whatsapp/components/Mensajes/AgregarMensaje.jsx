import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { AbsoluteFormContainer } from "../ui/AbsoluteFormContainer.jsx";
import { GreenButtonBg } from "../ui/GreenButtonBg.jsx";
import { useWhatsapp } from "../../context/WhatsappContext.jsx";
import { MessageContainerBody } from "../ui/Mensajes/ContainerMensaje.jsx";
import { useTimeouts } from "../../../shared/hooks/useTimeouts.js";
import { PError } from "../../../shared/components/Form/PError.jsx";

export function AgregarMensaje() {
  const { addMessage, toggleShowComponent } = useWhatsapp();
  const { register, handleSubmit, reset,formState : {errors},clearErrors } = useForm();
  const {clearOnTimeout} = useTimeouts()
  const handleForm = (values) => {
    const { TEXT } = values;
    addMessage({ TEXT });
    reset();
  };
  clearOnTimeout(errors.TEXT,clearErrors,3000);
  return (
    <AbsoluteFormContainer
      className={"border border-solid border-gray-800 max-w-[min(90%,35rem)]"}
    >
      <form onSubmit={handleSubmit(handleForm)}>
        <header className="text-xl flex items-center justify-between px-[1.5rem] border-b border-solid border-gray-400 py-1 ">
          <span className="text-verde_wsp">Agregar mensaje</span>
          <RxCross2
            onClick={() => toggleShowComponent("AddMessage")}
            className="hover:text-[#FF6C5C] text-rojo text-3xl cursor-pointer stroke-1"
          />
        </header>
        <MessageContainerBody
          register={register}
          textAreaName={"TEXT"}
          propsAtRegister={{ required: "El mensaje no puede estar vacio" }}
        >
          <div className="grid">
            <GreenButtonBg>Agregar mensaje</GreenButtonBg>
          </div>
          {errors.TEXT && <PError>{errors.TEXT.message}</PError>}
        </MessageContainerBody>
      </form>
    </AbsoluteFormContainer>
  );
}
