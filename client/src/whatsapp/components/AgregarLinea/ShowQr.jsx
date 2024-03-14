import { useWhatsapp } from "../../context/WhatsappContext";
import { QRCode } from "react-qr-code";
import { ring2 } from "ldrs";
import { PError } from "../../../shared/components/Form/PError.jsx";
import { useEffect } from "react";

/*Si muestra si existe algun nombre escrito y la respuesta de la insercion del nombre este OK */
export function ShowQr() {
  const { qr } = useWhatsapp();
  const { isLoading, data, error, message,successful } = qr;

  // {qr.data}</Qrdata>

  //   if (true) return loadingQr();
  if (isLoading) return loadingQr({ message });

  if (error)
    return (
      <QrContainer>
        <QrError message={message} />
      </QrContainer>
    );

  if (successful) {
    return (
        <QrContainer>
            <QRSuccessfull message={message}/>
        </QrContainer>
    )   
  }

  if (!data)
    return (
      <QrContainer>
        <div>QR no solicitado.</div>
      </QrContainer>
    );

  return (
    <QrContainer>
      <QRCode className=" h-fit" value={data} />
    </QrContainer>
  );
}

function loadingQr({ message }) {
  ring2.register();

  // Default values shown

  return (
    <QrContainer className={"cursor-wait"}>
      <l-ring-2
        size="40"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8"
        color="black"
      ></l-ring-2>
      {message}
    </QrContainer>
  );
}

function QrContainer({ children, className }) {
  const { newLineName } = useWhatsapp();

  return (
    <div>
      <header className="text-xl flex justify-center ">
        <span className="text-verde_wsp">{newLineName}</span>
      </header>
      <div className={"grid place-items-center p-4 pb-4 " + className}>
        {children}
      </div>
    </div>
  );
}

function QrError({ message }) {
  return (
    <div>
      <PError>{message}</PError>
    </div>
  );
}

function QRSuccessfull({ message }) {
    return (
      <div>
        <p className="text-verde_wsp">{message}</p>
      </div>
    );
  }
