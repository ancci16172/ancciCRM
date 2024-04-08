import { BackWhatsappButton } from "../BackWhatsappButton.jsx";
import { FaCheck } from "react-icons/fa";

export function OneDataForm({ handleBack, children }) {
  return (
    <div className="flex gap-2  border-solid">
      <div className="bg-[#F0F2F5] flex-1 flex gap-1  px-2 rounded-md">
        <span
          className="grid place-items-center text-verde_claro cursor-pointer"
          onClick={handleBack}
        >
          <BackWhatsappButton />
        </span>

        {children}
      </div>
      <button className="grid place-items-center text-verde_claro rounded-md bg-[#F0F2F5] p-1.5  cursor-pointer hover:bg-[#D4D7DA] ">
        <FaCheck />
      </button>
    </div>
  );
}
export function OneDataFormContainer({ children }) {
  return <div className="px-2 py-3">{children}</div>;
}

export function OneDataInput({registration,type,placeholder}) {
  return (
    <input
      type={type}
      className="bg-transparent outline-none placeholder:text-[#777777] flex-1"
      placeholder={placeholder}
      {...registration}
    />
  );
}
