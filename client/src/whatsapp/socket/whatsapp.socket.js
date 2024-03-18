import { useEffect, useState } from "react";


export const useWhatsappSocket = ({ socket,fetchAvaiableLines }) => {
  const qrInitValues = { data: "", isLoading: false, error: false , successful : false,message : "" ,qrProcessRunning : false};
  const [qr, setQr] = useState(qrInitValues);
  const [newLineName, setNewLineName] = useState("");

  const reset = () => {
    setQr(qrInitValues);
    setNewLineName("")
  };
  useEffect(() => {
    console.log("mostrando qr",qr);
    if(qr.successful || qr.error){
      setTimeout(() => reset(),3000)    
    }

  },[qr])



  const insertLine = async ({ clientId }) => {
    try {
      reset()
      setQr({...qr,isLoading : true,message : "Solicitando QR...",qrProcessRunning : true})

      console.log("datos por enviar para nueva linea", { clientId });

      const response = await socket.emitWithAck("insertLine", { clientId });

      console.log({ RespuestaAlGenerarNuevaLinea: response });

      if (response.error) throw response.msg;

      setNewLineName(clientId);
    } catch (error) {
      /*reset?*/
      console.log("ERROR EN insertLine",error);
      setNewLineName("");
      setQr({ ...qr, error: true ,isLoading : false,message : error,qrProcessRunning : false});
      
      console.log({ error });
    } 
  };

  const setEvents = ()=> {
    //Cargando pagina de whatsapp
    socket.on("loading_screen", (percentage) => {
      console.log("CARGANDO WHATSAPP ", percentage, "%");
      setQr({...qr,message : "Cargando QR...",isLoading : true});
    });

    socket.on("qr", (qrSv) => {
      console.log("recibido desde el socket", qrSv);
      setQr({ ...qr, data: qrSv, isLoading: false });
    });

    //Reading qr...
    socket.on("authenticated",() => {
      console.log("Authenticated");
      setQr({...qr,message : "Linea autenticada... cargando chats y contactos.",isLoading : true})
    })

    socket.on("bad_response", (data) => {
      console.log("ERROR BAD RESPONSE", data);
      setQr({ ...qr, message : data.msg, isLoading : false,error: true, successful: false,data : "",qrProcessRunning : false });
      fetchAvaiableLines()
    });

    socket.on("good_response", (data) => {
      console.log("Good response", data);
      setQr({ ...qr,message : data.msg, isLoading : false,error: false, successful: true ,data : "",qrProcessRunning : false});
      fetchAvaiableLines()
    });
  }

  useEffect(() => {
    socket.connect();
    setEvents();
    return () => {
      // socket.removeAllEvents();
      // socket.disconnect();
    }

  },[])


  return { qr, newLineName, insertLine };
};
