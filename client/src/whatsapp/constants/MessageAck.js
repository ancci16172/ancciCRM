export const MessageAckList = {
  [-4] : "SIN WHATSAPP",
  [-3] : "ENVIADO, ESTADO DESCONOCIDO",
  [-2] : "ERROR INESPERADO", //Error respecto a whatsapp
  [-1]: "ERROR",
  0: "PENDIENTE",
  1: "ENVIADO",
  2: "DESCONOCIDO",
  3: "LEIDO",
  4: "REPRODUCIDO",
};

export const  MessageAckMessages = {
  [-4]: "Sin whatsapp",
  [-3] : "Error, enviado, estado desconocido",
  [-2] : "Error, no enviado", //No se pudo enviar el mensaje
  [-1]: "Error al enviar",
  0: "Enviando...",
  [5]: "Bloqueado",
};