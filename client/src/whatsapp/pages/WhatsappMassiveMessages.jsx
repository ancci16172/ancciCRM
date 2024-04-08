import Container from "../../shared/components/Container.jsx";
import { AsideWhatsapp } from "../components/Aside/AsideWhatsapp";
import { MainSection } from "./MainSection.jsx";
import { LineasDisponibles } from "../components/LineasDisponibles/LineasDisponibles";
import { NewPhoneLine } from "../components/AgregarLinea/NewPhoneLine";
import { AgregarMensaje } from "../components/Mensajes/AgregarMensaje.jsx";
import { useWhatsapp } from "../context/WhatsappContext.jsx";
import { GruposDisponibles } from "../components/Mensajes/CargarMensajes.jsx";
import { NuevoGrupoDeMensajes } from "../components/Mensajes/NuevoGrupoDeMensajes.jsx";
import {EditMessage} from "../components/Mensajes/EditarMensaje.jsx"
import { ContactList } from "../components/Mensajes/SendMessage/ContactList/ContactList.jsx";
import { MessagesSent } from "../components/Mensajes/MessagesSent.jsx";
import { AvailableMedia } from "../components/Media/AvailableMedia.jsx";
import { AddContactMessage } from "../components/Mensajes/AddContactMessage.jsx";

export function WhatsappMassiveMessaged() {
  const { showComponents } = useWhatsapp();

  return (
    <Container>
      {/* SOCKET QR */}
      <NewPhoneLine />
      {/* SOCKET QR */}



      <AsideWhatsapp />
      <MainSection />

      {showComponents.AvailableLines && <LineasDisponibles />}
      {showComponents.AddMessage && <AgregarMensaje />}
      {showComponents.EditMessage && <EditMessage/>}
      {showComponents.AvailableGroups && <GruposDisponibles />}
      {showComponents.NewMessageGroupForm && <NuevoGrupoDeMensajes/>}

      {showComponents.ContactList && <ContactList/>}
      {showComponents.MessagesSent && <MessagesSent/>}
      {showComponents.AvailableMedia && <AvailableMedia/>}
      {showComponents.AddContactMessage && <AddContactMessage/>}

    </Container>
  );
}
