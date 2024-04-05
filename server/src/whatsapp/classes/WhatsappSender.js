import { formatMessages } from "../lib/formatMessages.js";
import { WhatsappClient } from "./WhatsappClient.js";
import { existsLineFolder } from "../lib/lines.js";

export class WhatsappSender extends WhatsappClient {
  messagesToTrack = [];
  messagesSend = false;
  isWhatsappValidMap = new Map();
  

  constructor({ clientId, contacts, messages ,shouldCheckWhatsapps = false}) {
    if (!existsLineFolder(clientId)) throw { errno: 404 };
    
    console.log("should check whatsapp?",shouldCheckWhatsapps);
    super({ clientId });
    this.shouldCheckWhatsapps = shouldCheckWhatsapps
    this.on("loading_screen", (percentage) => {
      this.emit("loading", { msg: "Cargando...", percentage });
    });

    this.on("authenticated", () => {
      console.log("Autenticado al enviar mensajes");
      this.emit("loading", {
        msg: "Authenticado correctamente,cargando contactos y mensajes...",
        percentage: 100,
      });
    });

    this.on("qr", async () => {
      await this.destroyLine();
      this.emit("bad_response", {
        msg: "La linea de whatsapp no se encuentra logueada, se eliminará de sistema.",
      });
    });

    this.on("auth_failure", async () => {
      console.log("fallo la autenticacion al evniar mensajes");
      await this.destroyLine();
      this.emit("bad_response", { msg: "No se pudo iniciar sesion." });
    });

    this.on("disconnected", async () => {
      console.log("Desconectado al enviar mensajes");
      await this.destroyLine();
      this.emit("bad_response", { msg: "Sesion desconectada." });
    });

    this.on("ready", async () => {
      console.log("Listo para enviar mensajes");
      this.emit("loaded");
      console.log("Consultando contactos bloqueados");
      // const blockedContacts = (await this.getBlockedContacts()).map(
      //   (c) => c.id._serialized
      // );
      const blockedContacts = [];

      console.log("Lista de whatsapp validos");

      for (const contact of contacts) {
        const { phoneNumber } = contact;
        const formatedMessages = formatMessages(contact, messages);
        const contactPhone = phoneNumber + "@c.us";

        this.messagesToTrack.push({ phoneNumber, messages: [] });
        const isContactBlocked = blockedContacts.includes(contactPhone);

        const isWhatsappValid = await this.isRegisteredUser(contactPhone);

        for (const message of formatedMessages) {
          // console.log("enviando mensaje a ", contactPhone);
          //CODIGO 5 para contactos bloqueados
          if (isContactBlocked) {
            this.messagesToTrack[this.messagesToTrack.length - 1].messages.push(
              { ack: 5 }
            );
            continue;
          }
          //CODIGO 6 para contactos sin whatsapp
          if (!isWhatsappValid) {
            this.messagesToTrack[this.messagesToTrack.length - 1].messages.push(
              { ack: -4 }
            );
            continue;
          }

          const msg = await this.sendMessage(contactPhone, message);

          this.messagesToTrack[this.messagesToTrack.length - 1].messages.push({
            messageSendedId: msg.id._serialized,
            ack: msg.ack,
          });
        }
      }

      this.emit("messages_tracked_ack", this.messagesToTrack);
      while (!this.hasAllMessagesSent()) {
        await new Promise((res) => setTimeout(() => res(), 5000));
        console.log("Actualizando si se enviaron los mensajes");
        await this.updateMessagesStatus();
        this.emit("messages_tracked_ack", this.messagesToTrack);
      }

      await this.destroy();
      //Resumen de los mensajes enviados
      const resume = this.generateResume();
      console.log("mensajes enviados \n", this.messagesToTrack);
      this.emit("good_response", {
        msg: "Mensajes enviados correctamente",
        resume,
      });
    });
  }

  async isRegisteredUser(contactPhone) {
    if (!this.shouldCheckWhatsapps) return true;

    const isValid = this.isWhatsappValidMap.get(contactPhone);
    if (isValid != undefined) return isValid;

      const isRegisteredUser = await super.isRegisteredUser(contactPhone);
      
      this.isWhatsappValidMap.set(contactPhone, isRegisteredUser);
      return isRegisteredUser;
  }

  /*OPTIMIZAR */
  async updateMessagesStatus() {
    const messages = this.messagesToTrack
      .map((contacts) => contacts.messages)
      .flat();

    await Promise.all(
      messages.map(async (message) => {
        //Consulta el valor de ACK en los mensajes
        //Si la instancia esta cerrada y no se pudo conocer el nuevo valor de ACK
        //=> ack == -3, "valor desconocido"
        try {
          if (message.ack != 0 || message.isAbleToKnow == false) return; //Si ya esta definido el ACK no consulta nuevamente
          console.log(message);
          const messageData = await this.getMessageById(message.messageSendedId);
          const ack = messageData.ack <= 0 ? messageData.ack : 1;
          message.ack = ack;
        } catch (error) {
          console.log("error at updateMessagesStatus", error);
          message.isAbleToKnow = false;
          message.ack = -3;
        }
      })
    );
  }

  hasAllMessagesSent() {
    const messagesTracked = this.getMessagesTracked();

    return !messagesTracked.some(
      (message) => message.ack == 0 && message.isAbleToKnow != false
    );
  }
  getMessagesTracked() {
    return this.messagesToTrack.map((contacts) => contacts.messages).flat();
  }

  generateResume() {
    const messages = this.getMessagesTracked();
    const resume = messages.reduce((acum, message) => {
      if (!acum[message.ack]) acum[message.ack] = 0;

      acum[message.ack] += 1;
      return acum;
    }, {});

    return { data: resume, total: messages.length };
  }
}
