import { WhatsappSender } from "../classes/WhatsappSender.js";
import { getMessagesText } from "../lib/messages.js";

export const sendMessages = (socket) => async ({clientId, contacts, ID_MESSAGE_GROUP},sendResponse) => {
  let client;
  try {
    console.log("Apunto de enviar mensajes",{clientId,contacts,ID_MESSAGE_GROUP});
    
    const messages = await getMessagesText(ID_MESSAGE_GROUP);
    console.log("messages",messages);
    client = new WhatsappSender({ clientId,contacts,messages });
    
    client.on("loading",msg => {
      socket.emit("sendMessages/loading",msg)
    })
    client.on("loaded",() => {
      socket.emit("sendMessages/loaded")
    })
    client.on("messages_tracked_ack",trackedMessages => {
      socket.emit("sendMessages/messages_tracked_ack",trackedMessages)
    })
    client.on("bad_response", (message) => {
      socket.emit("sendMessages/bad_response",message)
      sendResponse({error :true,msg : message.msg})
    });

    client.on("good_response", (res) => {
      console.log("good_response", res);
      socket.emit("sendMessages/good_response",res)
      sendResponse({error : false,...res})
    });
  
    socket.on("disconnect",async () => {
      console.log("Sockect desconectado al enviar mensajes, destruyendo cliente");
      await client.destroy();
    })

    await client.initialize()

  } catch (error) {
    await client?.destroy()
    console.log("error catch general",error);
    if(error.errno == 404){
      return socket.emit("sendMessages/bad_response",{msg : `La linea '${clientId}' no existe, o no se encuentra logeada.`})
    }
     socket.emit("sendMessages/bad_response",{msg : "Error insperado, no se pudieron enviar los mensajes."})
  }


}






// export const sendMessagesReference = async (req, res) => {
//     try {
//       const { clientId, contacts, ID_MESSAGE_GROUP } = req.body;
//       console.log("Recibe para enviar mensajes", req.body);

//       const messages = await getMessagesText(ID_MESSAGE_GROUP);
//       const avaiableSessions = getGeneratedLines();
  
  
//       if (!avaiableSessions.includes(clientId)) {
//         return res.status(404).json({ msg: "No se encontro la sesion." });
//       }
  
//       const client = new WhatsappSender({ clientId,contacts,messages });
  
//       client.on("loading_screen", (percentage) =>
//         console.log("Cargando...", percentage)
//       );
      
//       client.on("bad_response", (msg) => {
//         console.log("error en whatsappSender");
//         res.status(500).json(msg);
//       });
  
//       client.on("good_response", (msg) => {
//         console.log("good message", msg);
//         res.status(200).json(msg);
//       });
  
//       await client.initialize();
  
//     } catch (error) {
//       console.log("ERROR al enviar mensajes", error);
  
//       res.status(500).json({ msg: "Error inesperado." });
//     }
//   };

