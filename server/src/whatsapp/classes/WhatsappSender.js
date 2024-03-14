import { formatMessages } from "../lib/formatMessages.js";
import { WhatsappClient } from "./WhatsappClient.js";

export class WhatsappSender extends WhatsappClient {
  messagesToTrack = [];

  constructor({ clientId, contacts, messages }) {
    super({ clientId });

    this.on("authenticated", () => {
      console.log(`Sesion ${clientId} autenticada correctamente`);
    });

    this.on("qr", async () => {
      this.emit("bad_response", {
        msg: "La linea de whatsapp no se encuentra logueada, se eliminará de sistema.",
      });
      await this.destroy();
    });

    this.on("auth_failure", () => {
      this.emit("bad_response", { msg: "No se pudo iniciar sesion." });
    });
    this.on("disconnected", () => {
      this.emit("bad_response", { msg: "Sesion desconectada." });
    });

    this.on("ready", async () => {
      for (const contact of contacts) {
        const { phoneNumber } = contact;
        const formatedMessages = formatMessages(contact, messages);
        const contactPhone = phoneNumber + "@c.us";

        for (const message of formatedMessages) {
          const msg = await this.sendMessage(contactPhone, message);
          this.messagesToTrack.push({
            messageId: msg.id._serialized,
            ack: msg.ack,
          });
        }
      }
      console.log("Mensajes enviados, revisando estado final del mensaje..");

      console.log({ tracking: this.messagesToTrack });

      while (!this.hasAllMessagesSent()) {
        await new Promise((res) => setTimeout(() => res(), 5000));
        await this.updateMessagesStatus();
      }
      this.destroy();
      console.log({ tracking: this.messagesToTrack });

      this.emit("good_response", { msg: "Mensajes enviados correctamente" });
    });
  }

  async updateMessagesStatus() {
    const newMessageData = await Promise.all(
      this.messagesToTrack.map(async (message) => {
        const messageData = await this.getMessageById(message.messageId);
        return { messageId: messageData.id._serialized, ack: messageData.ack };
      })
    );

    this.messagesToTrack = newMessageData;
  }

  hasAllMessagesSent() {
    return !this.messagesToTrack.some((msg) => msg.ack == 0);
  }
}
