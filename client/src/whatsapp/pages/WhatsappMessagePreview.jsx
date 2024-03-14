import { GreenButtonBg } from "../components/ui/GreenButtonBg.jsx";
import { SectionContainer } from "../../shared/components/SectionContainer.jsx";
import { useWhatsapp } from "../context/WhatsappContext.jsx";

export function WhatsappMessagePreview() {
  const { toggleShowComponent } = useWhatsapp();
  return (
    <SectionContainer>
      Vista previa:
      <GreenButtonBg onClick={() => toggleShowComponent("AvailableLines")}>
        Enviar mensajes
      </GreenButtonBg>
    </SectionContainer>
  );
}
