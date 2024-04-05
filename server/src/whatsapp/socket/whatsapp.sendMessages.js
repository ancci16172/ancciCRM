import { WhatsappSender } from "../classes/WhatsappSender.js";
import { getMessagesText } from "../lib/messages.js";
import {checkMediaMessagesExists} from "../lib/media.js"
import { WhatsappClient } from "../classes/WhatsappClient.js";


import { checkExistsInActiveSessions } from "../lib/activeSessions.js";

// export const sendMessages = (socket) => async ({clientId, contacts, ID_MESSAGE_GROUP},sendResponse) => {

//   const client = new WhatsappClient({clientId})
//   await client.initialize()
// }


 export const sendMessages = (socket) => async ({clientId, contacts, ID_MESSAGE_GROUP,shouldCheckWhatsapps},sendResponse) => {
  let client = {};
  try {
    console.log("Apunto de enviar mensajes",{clientId,contacts,ID_MESSAGE_GROUP});

    const [messages,messagesRaw] = await getMessagesText(ID_MESSAGE_GROUP);

    checkMediaMessagesExists(messagesRaw);
    checkExistsInActiveSessions(clientId);
    
    client = new WhatsappSender({ clientId,contacts,messages : messagesRaw,shouldCheckWhatsapps });

    const onSocketDisconected = async () => {
      console.log("Sockect desconectado al enviar mensajes, destruyendo cliente");
      await client.destroy();
    }


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
      console.log("bad response",message);
      socket.emit("sendMessages/bad_response",message)
      socket.off("disconnect",onSocketDisconected);
      sendResponse({error :true,msg : message.msg})
    });

    client.on("good_response", (res) => {
      console.log("good_response", res);
      socket.emit("sendMessages/good_response",res)
      socket.off("disconnect",onSocketDisconected);
      sendResponse({error : false,...res})
    });
  


    socket.on("disconnect",onSocketDisconected)

    
    await client.initialize()
    
  } catch (error) {
    console.log("error catch general",error);
    console.log("pup browser exists:",!!client.pupBrowser);
    if(client.pupBrowser)
      await client.destroy()
    
   
    if((error.type == "file" && error.errno == 404) || error.type == "unavailable")
      return socket.emit("sendMessages/bad_response",{msg : error.msg})

    if(error.errno == 404){
      return socket.emit("sendMessages/bad_response",{msg : `La linea '${clientId}' no existe, o no se encuentra logeada.`})
    }
    socket.emit("sendMessages/bad_response",{msg : "Error insperado, no se pudieron enviar los mensajes."})

  }

}





