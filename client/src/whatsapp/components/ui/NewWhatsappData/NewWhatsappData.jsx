import { useWhatsapp } from "../../../context/WhatsappContext";
import { BackWhatsappButton } from "../BackWhatsappButton.jsx";
import { FaCheck } from "react-icons/fa";

// import {FaCheck} from "react-icons/fa"
export function NewWhatsappData({
  children,
  handleSubmit,
  functionOnSubmit
}) {
  return (
    <form
      className="flex gap-2 px-2.5 py-3 border-solid "
      onSubmit={handleSubmit(functionOnSubmit)}
    >
      {children}
      <button className="grid place-items-center text-verde_claro rounded-md bg-[#F0F2F5] p-1.5  cursor-pointer hover:bg-[#D4D7DA] ">
        <FaCheck />
      </button>
    </form>
  );
}
export function InputContainer({ children,toggleString }) {
  const { toggleShowComponent } = useWhatsapp();

  return (
    <div className="bg-[#F0F2F5] flex-1 flex gap-1 px-2 rounded-md">
      <span
        className="grid place-items-center text-verde_claro cursor-pointer"
        onClick={() => toggleShowComponent(toggleString)}
      >
        <BackWhatsappButton />
      </span>
      {children}
    </div>
  );
}
export function Input({ register, name, errorMessage }) {
  return (
    <input
      type="text"
      className="bg-transparent outline-none placeholder:text-[#777777] flex-1"
      placeholder="Nombre de la linea..."
      {...register(name, { required: errorMessage })}
    />
  );
}
