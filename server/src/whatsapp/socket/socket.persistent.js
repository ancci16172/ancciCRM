import { WhatsappPersistent } from "../classes/WhatsappPersistent.js";
import {
  existsInActiveSessions,
  getFromActiveSessions,
} from "../lib/activeSessions.js";
import { getMessageGroupDb } from "../model/whatsapp.model.js";
import {checkMediaMessagesExists} from "../lib/media.js";

export const activatePersistentLine = async (req, res) => {
  const { clientId } = req.body;
  try {
    
    /*Debe checkear que exista la carpeta con el clientId */
    const persistentClient = new WhatsappPersistent({ clientId });
    await persistentClient.initialize();
    res.status(200).json({msg : `Linea persistente ${clientId} generada correctamente.`})

    } catch (error) {
    
    console.log("General catch in persistent line", error);
    res.status(500).json({msg : "Error inesperado intentango agregar una linea persistente"})
    
  }
};

export const activatePersistentLineBySocket = (socket) => async ({clientId}) => {
  try { 

    /*Debe checkear que exista la carpeta con el clientId */
    const persistentClient = new WhatsappPersistent({ clientId });
     
    persistentClient.on("loading", (payload) => {
      socket.emit("loading", payload);
    });
    
    persistentClient.on("good_response",(payload) => {
      socket.emit("good_response",payload)
    })

      

    persistentClient.initialize();
  } catch (error) {
    
    console.log("General catch in persistent line", error);

  }
};



export const sendMessageFromPersistentLine = async (req, res) => {


const { clientId,contact,ID_MESSAGE_GROUP } = req.body;

  try {
    const isAvailable = existsInActiveSessions(clientId);
    if (!isAvailable) throw{ status : 404, msg: `La sesion '${clientId}' no se encuentra activa` };

    const {messages} = await getMessageGroupDb(ID_MESSAGE_GROUP);
    if(!messages) throw {status : 404 , msg : "El grupo de mensaje no existe o no contiene mensajes."}

    const client = getFromActiveSessions(clientId);

    checkMediaMessagesExists(messages);
    

    console.log("Enviando mensaje");
    const response = await client.sendMessagesWithFormat(contact,messages);
    console.log("MensajeS enviados",response);

  
    res.status(200).json(response);

  } catch (error) {

    console.log("error intentando enviar mensajes desde linea persistente",error);
    res.status(error.status || 500).json(error.msg ? error.msg : {msg : `Error desconocido en lineas persistentes `});

  }
};


export const removePersistentLine = async (req,res) => {
  const {clientId} = req.params;

  try {
    const client = getFromActiveSessions(clientId)
    await client.destroy()
    
    res.status(200).json({msg : "Linea desactivada correctamente"})
  } catch (error) {
    console.log(error);
  }

}
