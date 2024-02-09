import { Aside } from "../../../shared/components/Aside";
import { GreenButton } from "./GreenButton";
import { OrderMessages } from "./OrderMessages";

export function AsideWhatsapp() {
  return (
    <Aside title={"Personalizar"}>
      <GreenButton className={"mt-1"}>Agregar mensaje</GreenButton>
      <GreenButton className={"mt-1.5"}>Agregar multimedia</GreenButton>
      <OrderMessages></OrderMessages>
      <GreenButton className={"mt-auto text-ellipsis overflow-hidden whitespace-nowrap"}>Guardar mensajes</GreenButton>
      <GreenButton className={"mt-1.5 mb-2"}>Cargar mensajes</GreenButton>
    </Aside>
  );
}
