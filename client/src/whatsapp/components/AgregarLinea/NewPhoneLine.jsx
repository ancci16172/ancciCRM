import { SetName } from "./SetName";
import { useWhatsapp } from "../../context/WhatsappContext";
import { ShowQr } from "./ShowQr";
import { AbsoluteFormContainer } from "../ui/AbsoluteFormContainer";

//Interfaz para agregar una nueva linea(renderizado)
export function NewPhoneLine() {
  const { showComponents,qr  } = useWhatsapp();

  if (showComponents.NewPhoneLine)
    return (
      <AbsoluteFormContainer className={"max-w-[min(90%,26rem)]"}>

        {/* Selecionar un nombre */}

        {showComponents.SetName && !qr.qrProcessRunning && <SetName />}

        {/* Mostrar QR o error */}
        {<ShowQr />}

        {/*showComponents.ShowQr && <ShowQr/> */}
      </AbsoluteFormContainer>
    );
}
