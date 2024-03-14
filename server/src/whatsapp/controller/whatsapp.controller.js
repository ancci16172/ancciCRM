import whatsapp from "whatsapp-web.js";

import {
  getGeneratedLines,
  getMessageGroupDb,
  updateMessagesGroupDb,
  getMessageGroupsDb,
  insertNewMessageGroupDb,
  deleteMessageGroupDb,deleteLineFolder
} from "../model/whatsapp.model.js";
import { WhatsappSender } from "../classes/WhatsappSender.js";

export const getAvailableLines = (req, res) => {
  try {
    const avaiableSessions = getGeneratedLines();
    res.status(200).json(avaiableSessions);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error al consultar las sesiones disponibles" });
  }
};
export const deleteLine = (req,res) => {
  const {clientId} = req.params;
  try {
    const response = deleteLineFolder(clientId);
    console.log({response});
    res.status(200).json({msg : "Linea eliminada correctamente."})
  } catch (error) {
    
    console.log(error);

    if(error.errno == -4085){
      return res.status(404).json({msg : `La linea con el id '${clientId}' no existe.`})
    }
    
    res.status(500).json({msg : "Error inesperado, no se pudo eliminar la linea."})
  }
}

export const getMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await getMessageGroupDb(groupId);

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error al consultar las sesiones disponibles" });
  }
};

export const updateMessagesGroup = async (req, res) => {
  const { messages, groupId } = req.body;

  try {
    await updateMessagesGroupDb(messages, groupId);
    res.status(200).json({ msg: "Los mensajes se actualizaron correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado, no se pudieron actualizar los mensajes.",
    });
  }
};

export const getAvailableMessageGroups = async (req, res) => {
  try {
    const messageGroups = await getMessageGroupsDb();
    res.status(200).json(messageGroups);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado, no se pudieron consultar los grupos disponibles",
    });
  }
};
export const insertNewMessageGroup = async (req, res) => {
  const { newGroupMessageName } = req.body;
  try {
    await insertNewMessageGroupDb(newGroupMessageName);
    res
      .status(200)
      .json({ msg: `Grupo '${newGroupMessageName}' insertado correctamente.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error, no se pudo cargar el nuevo grupo de telefonos",
    });
  }
};

export const deleteMessageGroup = async (req, res) => {
  const { ID_MESSAGE_GROUP } = req.params;

  try {
    const response = await deleteMessageGroupDb(ID_MESSAGE_GROUP);
    console.log("elimina grupo", response);
    res.status(200).json({ msg: "Grupo de mensaje eliminado." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error, no se pudo eliminar el grupo de mensajes ",
    });
  }
};

/*Traducir con SOCKETS */
export const sendMessages = async (req, res) => {
  try {
    const { clientId, contacts, ID_MESSAGE_GROUP } = req.body;
    console.log("Recibe para enviar mensajes", req.body);

    const messageGroup = await getMessageGroupDb(ID_MESSAGE_GROUP);
    const messages = messageGroup.messages.map((m) => m.TEXT);

    const avaiableSessions = getGeneratedLines();

    if (!avaiableSessions.includes(clientId)) {
      return res.status(404).json({ msg: "No se encontro la sesion." });
    }

    const client = new WhatsappSender({ clientId,contacts,messages });

    client.on("loading_screen", (percentage) =>
      console.log("Cargando...", percentage)
    );
    
    client.on("bad_response", (msg) => {
      console.log("error en whatsappSender");
      res.status(500).json(msg);
    });

    client.on("good_response", (msg) => {
      console.log("good message", msg);
      res.status(200).json(msg);
    });

    await client.initialize();

  } catch (error) {
    console.log("ERROR al enviar mensajes", error);

    res.status(500).json({ msg: "Error inesperado." });
  }
};
