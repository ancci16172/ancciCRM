import { FaCheck } from "react-icons/fa";
import { BackWhatsappButton } from "../ui/BackWhatsappButton";
import { useEffect } from "react";
import { useWhatsapp } from "../../context/WhatsappContext";
import { useForm } from "react-hook-form";
import { useTimeouts } from "../../../shared/hooks/useTimeouts.js";
import { PError } from "../../../shared/components/Form/PError.jsx";
//Agregar nuevo nombre o volver en la linea
export function SetName() {
  const { toggleShowComponent, insertLine } = useWhatsapp();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    // reset,
  } = useForm();
  const { clearOnTimeout } = useTimeouts();
  clearOnTimeout(errors.clientId, () => clearErrors(), 2500);

  return (
    <form onSubmit={handleSubmit(insertLine)} className="px-2.5">
      <div className="flex gap-2 py-3 border-solid">
        <div className="bg-[#F0F2F5] flex-1 flex gap-1 px-2 rounded-md">
          <span
            className="grid place-items-center text-verde_claro cursor-pointer"
            onClick={() => toggleShowComponent("NewPhoneLine")}
          >
            <BackWhatsappButton />
          </span>
          <input
            type="text"
            className="bg-transparent outline-none placeholder:text-[#777777] flex-1"
            placeholder="Nombre de la linea..."
            {...register("clientId", { required: "El nombre de la linea no puede estar vacio." })}
          />
        </div>
        <button className="grid place-items-center text-verde_claro rounded-md bg-[#F0F2F5] p-1.5  cursor-pointer hover:bg-[#D4D7DA] ">
          <FaCheck />
        </button>
      </div>
        <PError>{errors.clientId && errors.clientId.message }</PError>
    </form>
  );
}
