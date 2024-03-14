import {
  deleteLineFolder,
  getGeneratedLines,
} from "../model/whatsapp.model.js";

import { WhatsappLogin } from "../classes/WhatsappLogin.js";

/*Controller */
export const insertLine = (socket) => async (data, sendResponse) => {
  const { clientId } = data;
  try {
    const avaiableSessions = getGeneratedLines();
    if (avaiableSessions.includes(`session-${clientId}`)) {
      return sendResponse({
        error: true,
        msg: "El nombre de la sesion ya se encuentra logeada",
      });
    }

    const client = new WhatsappLogin({ clientId });

    client.on("loading_screen", (percentage) => {
      socket.emit("loading_screen", percentage);
    });

    client.once("qr", () => {
      sendResponse({ error: false, msg: "Solicitando QR..." });
    });
    client.on("qr", (qr) => {
      socket.emit("qr", qr);
    });

    client.on("bad_response", (message) => {
      socket.emit("bad_response", message);
      sendResponse({ error: true, msg: message.msg });
    });

    client.on("good_response", (message) => {
      socket.emit("good_response", message);
    });
    client.on("authenticated", () => {
      console.log("emit authenticated");
      socket.emit("authenticated");
    });

    socket.on("disconnect", async () => {
      try {
        console.log("Socket desconectado,destruyendo cliente");
        await client.destroy();
        deleteLineFolder(clientId);
      } catch (error) {
        console.log(error);
        console.log("no se pudo destruir el cliente");
      }
    });

    await client.initialize();
  } catch (error) {
    console.log("Hubo un error al intentar generar una nueva linea", error);
    sendResponse({
      error: true,
      msg: "Hubo un error al intentar generar una nueva linea",
    });
    deleteLineFolder(clientId);
  }
};
