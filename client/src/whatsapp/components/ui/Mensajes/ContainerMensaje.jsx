import { RxCross2 } from "react-icons/rx";
import { useWhatsapp } from "../../../context/WhatsappContext";
import { AbsoluteFormContainer } from "../AbsoluteFormContainer";

export function MessageContainer({ children,className}) {

  return (
    <AbsoluteFormContainer
      className={`border border-solid border-gray-800 max-w-[min(90%,35rem)] max-h-[85vh] overflow-y-auto ` + className }
    >
      {children}
    </AbsoluteFormContainer>
  );
}

export function MessageContainerHeader({ toggleString, title }) {
  const { toggleShowComponent } = useWhatsapp();

  return (
    <header className="text-xl flex items-center justify-between px-[1.5rem] border-b border-solid border-gray-400 py-1 ">
      <span className="text-verde_wsp">{title}</span>
      <RxCross2
        onClick={() => toggleShowComponent(toggleString)}
        className="hover:text-[#FF6C5C] text-rojo text-3xl cursor-pointer stroke-1"
      />
    </header>
  );
}

export function MessageContainerBody({ children, textAreaName, register,defaultValue,propsAtRegister = {required : true} }) {
  return (
    <div className="py-3 px-4">
      <textarea
        className="bg-[#F0F0F0] w-full min-h-[min(320px,80vh)] resize-none outline-none px-2 py-1"
        {...register(textAreaName, propsAtRegister)} defaultValue={defaultValue}
      ></textarea>
      <div className="my-2 flex flex-col">{children}</div>
    </div>
  );
}

