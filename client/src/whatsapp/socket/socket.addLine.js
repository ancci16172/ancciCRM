import { useEffect, useState } from "react";

export const useWhatsappSocketAddLines = ({ socket, fetchAvaiableLines }) => {
  const qrInitValues = {
    data: "",
    isLoading: false,
    error: false,
    successful: false,
    message: "",
    qrProcessRunning: false,
  };
  const [qr, setQr] = useState(qrInitValues);
  const [newLineName, setNewLineName] = useState("");

  const reset = () => {
    setQr(qrInitValues);
    setNewLineName("");
  };
  useEffect(() => {
    console.log("mostrando qr", qr);
    if (qr.successful || qr.error) {
      setTimeout(() => reset(), 3000);
    }
  }, [qr]);

  const cancelQr = () => {
    reset();
    socket.emit("cancel");
  }

  /*Start */
  const insertLine = async ({ clientId }) => {
    try {
      reset();
      setQr({
        ...qr,
        isLoading: true,
        message: "Solicitando QR...",
        qrProcessRunning: true,
      });

      console.log("datos por enviar para nueva linea", { clientId });

      const response = await socket.emitWithAck("insertLine", { clientId });

      console.log({ RespuestaAlGenerarNuevaLinea: response });

      if (response.error) throw response.msg;

      setNewLineName(clientId);
    } catch (error) {
      console.log("ERROR EN insertLine", error);
      setNewLineName("");
      setQr({
        ...qr,
        error: true,
        isLoading: false,
        message: error,
        qrProcessRunning: false,
      });
    }
  };

  const activatePersistentLine = ({clientId}) => {
    try {
      reset();
      setQr({
        ...qr,
        isLoading: true,
        message: "Activando linea persistente...",
        qrProcessRunning: true,
      });
      socket.emit("activatePersistentLine",{clientId})
    } catch (error) { 
      console.log(error);
    }
  }

  /*Listeners*/   
  const onLoadingScreen = (percentage) => {
    console.log("CARGANDO WHATSAPP ", percentage, "%");
    setQr({ ...qr, message: "Cargando QR...", isLoading: true });
  };
  const onLoading = ({msg,percentage}) => {
    setQr({...qr,message : msg,percentage,isLoading : true})
  }
  const onQr = (qrSv) => {
    console.log("recibido desde el socket", qrSv);
    setQr({ ...qr, data: qrSv, isLoading: false });
  };
  const onAuthenticated = () => {
    setQr({
      ...qr,
      message: "Linea autenticada... cargando chats y contactos.",
      isLoading: true,
    });
  };

  const onBadResponse = (data) => {
    setQr({
      ...qr,
      message: data.msg,
      isLoading: false,
      error: true,
      successful: false,
      data: "",
      qrProcessRunning: false,
    });
    fetchAvaiableLines();
  };

  const onGoodResponse = (data) => {
    setQr({
      ...qr,
      message: data.msg,
      isLoading: false,
      error: false,
      successful: true,
      data: "",
      qrProcessRunning: false,
    });
    fetchAvaiableLines();
  };

  /*Routes */
  useEffect(() => {
    console.log("AGREGA EVENTOS EN EL SOCKET");
    socket.on("loading_screen", onLoadingScreen);
    socket.on("qr", onQr);
    socket.on("authenticated", onAuthenticated);
    socket.on("bad_response", onBadResponse);
    socket.on("good_response", onGoodResponse);
    socket.on("loading",onLoading)
    return () => {
      socket.off("loading_screen", onLoadingScreen);
      socket.off("qr", onQr);
      socket.off("authenticated", onAuthenticated);
      socket.off("bad_response", onBadResponse);
      socket.off("good_response", onGoodResponse);
      socket.off("loading",onLoading)
    };
  }, []);

  return { qr, newLineName, insertLine ,cancelQr,activatePersistentLine};
};
