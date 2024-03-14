import { RxCross2 } from "react-icons/rx";
import { useWhatsapp } from "../../../context/WhatsappContext";

export function WhatsappOptions({ title, toggleString, children }) {
  const { toggleShowComponent } = useWhatsapp();
  
  return (
    <div className="absolute top-12 left-0 right-0 border border-solid border-[#666] mx-auto max-w-[min(90%,22rem)] bg-white rounded-md ">
      <header className="flex justify-between items-center py-2 px-4 border-b border-[#666]">
        <span>{title}</span>
        <RxCross2
          onClick={() => toggleShowComponent(toggleString)}
          className="hover:text-[#FF6C5C] text-rojo text-3xl cursor-pointer stroke-1"
        />
      </header>
      {children}
    </div>
  );
}

export function WhatsappOption({ onClick, children, isSelected  }) {
  return (
    <div
      className={
        "bg-[#00000050] px-3.5 py-2.5 w-[90%] rounded-md cursor-pointer text-verde_wsp font-medium flex justify-between " +
        (isSelected && " outline outline-verde outline-2")
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
}
export function WhatsappOptionsContainerOptions({ children }) {
  return (
    <div className="min-h-[50vh] bg-whatsapp-bg bg-[#EFEAE2] flex flex-col items-center py-3 gap-2 max-h-[65vh] overflow-y-auto">
      {children}
    </div>
  );
}
export function WhatsappOptionsContainerButton({ children,className }) {
  return (
    <div className={"flex bor  der-t border-[#666] p-2.5 gap-2 " + className}>{children}</div>
  );
}


export function WhatsappIconsContainer({children}){
  return <div className="flex text-2xl gap-2 items-center">{children}</div>
  
}