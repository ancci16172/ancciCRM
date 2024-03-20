import { RxCross2 } from "react-icons/rx";
import { useWhatsapp } from "../../context/WhatsappContext";
import { GreenButton } from "../ui/GreenButton";
import {
  WhatsappIconsContainer,
  WhatsappOption,
  WhatsappOptions,
  WhatsappOptionsContainerButton,
  WhatsappOptionsContainerOptions,
} from "../ui/WhatsappOptions/WhatsappOptions";
import { DeleteCross } from "../ui/icons/DeleteCross.jsx";

// Convertir en renderizado e intentar separar la logica
export function LineasDisponibles() {
  const {
    availableLines,
    toggleShowComponent,
    setSelectedLine,
    selectedLine,deleteLine
  } = useWhatsapp();

  const handleEnviar = () => {
    /*Aca validamos que existe alguna linea seleccionada */
    toggleShowComponent("ContactList")
  }

  const handleAddNewLine = () => {
    toggleShowComponent("NewPhoneLine")
  }
  const handleDeleteLine = (line)  => () =>{
    if(confirm(`¿Estas seguro de eliminar la linea '${line}'?`))
    deleteLine(line)
  }
  return (
    <WhatsappOptions
      title={"Lineas disponibles"}
      toggleString={"AvailableLines"}
    >
      <WhatsappOptionsContainerOptions>
        {availableLines.map((line, i) => (
          <WhatsappOption
            key={i}
            isSelected={line == selectedLine}
            onClick={() => setSelectedLine(line)}
          >
            <span>{line}</span>
            <WhatsappIconsContainer>
              <DeleteCross  onClick={handleDeleteLine(line)}/>
            </WhatsappIconsContainer>

          </WhatsappOption>
        ))}
      </WhatsappOptionsContainerOptions>

      <WhatsappOptionsContainerButton>
        <GreenButton
          className={"flex-1 mx-0 my-0"}
          onClick={handleEnviar}
        >
          Enviar
        </GreenButton>
        <GreenButton
          className={"flex-1 mx-0 my-0"}
          onClick={handleAddNewLine}
        >
          Agregar
        </GreenButton>
      </WhatsappOptionsContainerButton>
    </WhatsappOptions>
  );
}

// function LineaOption({ onClick, line }) {
//   const { selectedLine } = useWhatsapp();
//   const isSelected = selectedLine == line;

//   return (
//     // <div className={"bg-[#33333340] px-3.5 py-2.5 w-[90%] rounded-md cursor-pointer text-verde " + (isSelected && " border border-verde")} onClick={onClick}>
//     <div
//       className={
//         "bg-[#00000050] px-3.5 py-2.5 w-[90%] rounded-md cursor-pointer text-verde_wsp font-medium " +
//         (isSelected && " outline outline-verde outline-2")
//       }
//       onClick={onClick}
//     >
//       {line}
//     </div>
//   );
// }
