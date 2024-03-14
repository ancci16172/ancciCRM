import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { AbsoluteFormContainer } from "../ui/AbsoluteFormContainer.jsx";
import { GreenButtonBg } from "../ui/GreenButtonBg.jsx";
import { useWhatsapp } from "../../context/WhatsappContext.jsx";

export function AgregarMensaje() {
  const { addMessage, toggleShowComponent } = useWhatsapp();
  const { register, handleSubmit, reset } = useForm();

  const handleForm = (values) => {
    const { TEXT } = values;
    addMessage({ TEXT });
    reset();
  };

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
        <div className="py-3 px-4">
          <div>
            <textarea
              className="bg-[#F0F0F0] w-full min-h-[190px] resize-none outline-none px-2 py-1"
              {...register("TEXT", { required: true })}
            ></textarea>
          </div>
          <div className="my-2 flex">
            <GreenButtonBg className={"flex-1"}>Agregar mensaje</GreenButtonBg>
          </div>
        </div>
      </form>
    </AbsoluteFormContainer>
  );
}
