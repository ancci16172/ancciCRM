import { useWhatsapp } from "../../context/WhatsappContext";
import { QRCode } from "react-qr-code";
import { PError } from "../../../shared/components/Form/PError.jsx";
import { useEffect } from "react";
import {Loading} from "../../../shared/components/ui/Loading.jsx"
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

  // Default values shown
  
  return (
    <QrContainer className={"cursor-wait"}>
      <Loading/>
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
