import { formatMessages } from "../lib/formatMessages.js";
import { WhatsappClient } from "./WhatsappClient.js";
import { existsLineFolder } from "../lib/lines.js";

export class WhatsappSender extends WhatsappClient {
  messagesToTrack = [];
  messagesSend = false;
  constructor({ clientId, contacts, messages }) {
    if (!existsLineFolder(clientId))
      throw { errno: 404, msg: `La linea '${clientId}' no existe.` };
    
    super({ clientId });
    
    this.on("loading_screen",(percentage) => {
      this.emit("loading",{msg : "Cargando...",percentage})
    })
    this.on("authenticated", () => {
      this.emit("loading",{msg : "Authenticado correctamente,cargando contactos y mensajes...",percentage : 100})
    })
    this.on("qr", async () => {
      await this.destroyLine();
      this.emit("bad_response", {
        msg: "La linea de whatsapp no se encuentra logueada, se eliminará de sistema.",
      });
    });

    this.on("auth_failure", async () => {
      await this.destroyLine();
      this.emit("bad_response", { msg: "No se pudo iniciar sesion." });
    });

    this.on("disconnected", async () => {
      await this.destroyLine();
      this.emit("bad_response", { msg: "Sesion desconectada." });
    });

    this.on("ready", async () => {
      this.emit("loaded")
      const blockedContacts =(await  this.getBlockedContacts()).map(c => c.id._serialized);


      for (const contact of contacts) {
        const { phoneNumber } = contact;
        const formatedMessages = formatMessages(contact, messages);
        const contactPhone = phoneNumber + "@c.us";

        this.messagesToTrack.push({ phoneNumber, messages: [] });
        const isContactBlocked = blockedContacts.includes(contactPhone);
        const isWhatsappValid = await this.isRegisteredUser(contactPhone);
        
        for (const message of formatedMessages) {
          //CODIGO 5 para contactos bloqueados
          if(isContactBlocked){
            this.messagesToTrack[this.messagesToTrack.length - 1].messages.push({ack: 5})
            continue;  
          }
          //CODIGO 6 para contactos sin whatsapp
          if(!isWhatsappValid){
            this.messagesToTrack[this.messagesToTrack.length - 1].messages.push({ack: 6})
            continue;
          }
          const msg = await this.sendMessage(contactPhone, message);
          
          this.messagesToTrack[this.messagesToTrack.length - 1].messages.push({
            messageId: msg.id._serialized,
            ack: msg.ack,
          });
          
        }
      }

      this.emit("messages_tracked_ack", this.messagesToTrack);
      while (!this.hasAllMessagesSent()) {
        await new Promise((res) => setTimeout(() => res(), 5000));
        await this.updateMessagesStatus();
        this.emit("messages_tracked_ack", this.messagesToTrack);
        // console.log(this.messagesToTrack.map(m => m.messages));
      }

      this.destroy();
      //Resumen de los mensajes enviados
      const resume = this.generateResume();
      this.emit("good_response", { msg: "Mensajes enviados correctamente",resume });
    });
  }

  /*OPTIMIZAR */
  async updateMessagesStatus() {
    const messages = this.messagesToTrack
      .map((contacts) => contacts.messages)
      .flat();


    await Promise.all(
      messages.map(async (message) => {
        if(message.ack != 0) return; //Si ya esta definido el ACK no consulta nuevamente
        const messageData = await this.getMessageById(message.messageId);
        const ack =  messageData.ack <= 0 ? messageData.ack : 1;  
        message.ack = ack ;
      })
    );
  }

  hasAllMessagesSent() {
    return !this.messagesToTrack.some((contact) =>
      contact.messages.some((messages) => messages.ack == 0)
    );
  }
  getMessagesTracked(){
    return  this.messagesToTrack.map((contacts) => contacts.messages).flat();
  }

  generateResume(){
    const messages = this.getMessagesTracked();
    const resume =  messages.reduce((acum,message) => {

      if(!acum[message.ack]) acum[message.ack]  = 0;

      acum[message.ack] += 1;
      return acum;
    },{})

    return {data : resume,total : messages.length}
  }
}
