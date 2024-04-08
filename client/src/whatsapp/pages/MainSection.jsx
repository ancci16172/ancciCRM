import { GreenButtonBg } from "../components/ui/GreenButtonBg.jsx";
import { SectionContainer } from "../../shared/components/SectionContainer.jsx";
import { useWhatsapp } from "../context/WhatsappContext.jsx";
import { PersistentLines } from "../components/AgregarLinea/PersistentLines/PersistentLines.jsx";

export function MainSection() {
  const { toggleShowComponent } = useWhatsapp();
  return (
    <SectionContainer>
      <GreenButtonBg onClick={() => toggleShowComponent("AvailableLines")}>
        Enviar mensajes
      </GreenButtonBg>
        <PersistentLines/>
    </SectionContainer>
  );
}
