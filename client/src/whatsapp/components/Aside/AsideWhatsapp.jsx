import { Aside } from "../../../shared/components/Aside";
import { useWhatsapp } from "../../context/WhatsappContext";
import { GreenButton } from "../ui/GreenButton";
import { OrderMessages } from "../Mensajes/OrderMessages";
import { useState } from "react";
import { useTimeouts } from "../../../shared/hooks/useTimeouts.js";
import { Options } from "./Options.jsx";

export function AsideWhatsapp() {
  const { toggleShowComponent, updateMessagesGroup, changedSaved } =
    useWhatsapp();
  const [savedMessagesMessage, setSavedMessagesMessage] = useState("");
  const { clearOnTimeout } = useTimeouts();

  const handleSaveMessages = () => {
    updateMessagesGroup();
    setSavedMessagesMessage("Mensajes guardados.");
  };
  clearOnTimeout(savedMessagesMessage, () => setSavedMessagesMessage(""), 1500);

  const handleAddMessage = () => toggleShowComponent("AddMessage");

  const handleShowAddMedia = () => toggleShowComponent("AvailableMedia");

  const handleAddContact = () => toggleShowComponent("AddContactMessage")

  return (
    <Aside title={"Personalizar"}>
      <GreenButton className={"mt-1"} onClick={handleAddMessage}>
        Agregar mensaje
      </GreenButton>

      <GreenButton className={"mt-1.5"} onClick={handleShowAddMedia}>
        Agregar multimedia
      </GreenButton>

      <GreenButton className={"mt-1.5"} onClick={handleAddContact}>
        Agregar contacto
      </GreenButton>

      <OrderMessages />
      <Options />

      <span className="mt-auto">
        {savedMessagesMessage && (
          <p className="text-verde_wsp text-center">Mensajes guardados.</p>
        )}
      </span>
      <GreenButton
        className={"text-ellipsis overflow-hidden whitespace-nowrap"}
        onClick={handleSaveMessages}
      >
        {!changedSaved && "*"}Guardar cambios
      </GreenButton>
      <GreenButton
        className={"mt-1.5 mb-2"}
        onClick={() => toggleShowComponent("AvailableGroups")}
      >
        Cargar mensajes
      </GreenButton>
    </Aside>
  );
}
