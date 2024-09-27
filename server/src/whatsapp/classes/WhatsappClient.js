import whatsapp from "whatsapp-web.js";
import { deleteLineFolder } from "../model/whatsapp.model.js";
import { join } from "path";
import { mediaDirPath } from "../constants/dir.js";
import {
  addInActiveSessions,
  deleteFromActiveSessions,
} from "../lib/activeSessions.js";
import { formatMessages } from "../lib/formatMessages.js";
import config from "config";
const { Client, LocalAuth, MessageAck, MessageMedia } = whatsapp;

export class WhatsappClient extends Client {
  _clientId;
  validatedUsers = {};

  constructor({ clientId }) {

    console.log("Generando cliente", clientId);

    //Version vieja nueva cache

    super({ 
      // webVersion: "2.2412.54v2",
      authStrategy: new LocalAuth({ clientId }),

      webVersionCache : {
        type : "none"
      },
//       webVersionCache: {
//         type: 'remote',
//         remotePath: 'https://raw.githubusercontent.com/guigo613/alternative-wa-version/main/html/2.2412.54v2.html',
//       },
      restartOnAuthFail: true,
      puppeteer: { 
        executablePath: process.env.CHROME_EXECUTABLE,
        headless: config.get("PUPPETEER").headless,
        args: [
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
          "--disable-features=site-per-process",
          "--disable-setuid-sandbox",
          "--ignore-certificate-errors",
        ],
      },
    });


    

    this._clientId = clientId;

    this.on("ready", () => {
      console.log("ready event");

      this.pupBrowser.on("disconnected", async () => {
        console.log("------------Puppeteer browser disconnected------------");
        await this.destroy();
      });
    });




    this.on("qr", () => {
      console.log("qr event");
    });
    this.on("disconnected", () => {
      console.log("De desconecto la linea de whatsapp");
    });
    this.on("auth_failure", () => {
      console.log("auth_failure");
    });
    this.on("loading_screen", (percentage) => {
      console.log("Loading event", percentage);
    });
  }

  async initialize() {
    try{

      await super.initialize();
      addInActiveSessions(this._clientId, this);
    }catch(error){
      console.log("catch on initialize", error);
    }
  }

  async destroy() {
    console.log("eliminando de activesessions");
    deleteFromActiveSessions(this._clientId);
    console.log("ejecutando destroy");
    await super.destroy();
  }

  async destroyLine() {
    try {
      await this.destroy();

      deleteLineFolder(this._clientId);
    } catch (error) {
      console.log("catch on destroyLine", error);
    }
  }

  async sendMessagesWithFormat(contacts, messages) {
    const sendedMessagesData = [];

    for await (const contact of contacts) {
      const { phoneNumber,isGroup } = contact;
      const formatedPhoneNumber = phoneNumber + (isGroup ? "@g.us" : "@c.us");
      console.log({formatedPhoneNumber})
      //Si el whatsapp no es valido Retorna ACK = -4
      const isValidContact = await this.isRegisteredUser(formatedPhoneNumber);
      // const isValidContact = true
      if (!isValidContact){
        
        messages.forEach((message) => {
        sendedMessagesData.push({
          messageSendedId: "NOT_SENT",
          messageId: message.ID_MESSAGE,
          to: formatedPhoneNumber,
          from: this.info.wid.user,
          ack: -4,
          contact,
        });
      })
        continue;
      }

      //Envia los mensajes
      const formatedMessages = formatMessages(contact, messages);
      for (const message of formatedMessages) {
        const msgProperties = await this.sendMessage(
          formatedPhoneNumber,
          message
        );

        sendedMessagesData.push({
          messageSendedId: msgProperties.id._serialized,
          messageId: message.ID_MESSAGE,
          to: msgProperties._data.to.user,
          from: msgProperties._data.from.user,
          ack: msgProperties.ack,
          contact,
        });
      }
    }

    //Rastrea si los mensajes se enviaron correctamente
    let allMessagesSent = false;
    while (!allMessagesSent) {
      console.log("sendedMessagesData", sendedMessagesData);
      await new Promise((res) => setTimeout(res, 4000));
      console.log("validando");
      await this.updateAckFromMessages(sendedMessagesData);
      allMessagesSent = !sendedMessagesData.some((msg) => msg.ack == 0);
    }

    console.log("todo validado", sendedMessagesData);

    return sendedMessagesData;
  }

  async updateAckFromMessages(messagesData) {
    await Promise.all(
      messagesData.map(async (message) => {
        //Consulta el valor de ACK en los mensajes
        //Si la instancia esta cerrada y no se pudo conocer el nuevo valor de ACK
        //=> ack == -3, "valor desconocido"
        try {
          if (message.ack != 0 || message.isAbleToKnow == false) return; //Si ya esta definido el ACK no consulta nuevamente
          const messageData = await this.getMessageById(
            message.messageSendedId
          );
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

  async sendMessage(chatId, message) {
    try {
      await new Promise((res) =>
        setTimeout(res, Math.floor(Math.random() * (4000 - 2000 + 1) + 2000))
      );

      //Send regular messag
      if (message.IS_CONTACT) {
        const contacts = await this.getContactsById(message.TEXT.split(","));
        return await super.sendMessage(
          chatId,
          contacts.length > 1 ? contacts : contacts[0]
        );
      }

      //Send media
      if (message.ES_MULTIMEDIA) {
        const filePath = join(mediaDirPath, message.TEXT);
        const media = MessageMedia.fromFilePath(filePath);
        return await super.sendMessage(chatId, media);
      }

      //Send regular message
      return await super.sendMessage(chatId, message.TEXT);
    } catch (error) {
      console.log("error at sendMessage", error);

      return {
        ack: -2,
        id: { _serialized: null },
        _data: {
          to: { user: chatId },
          from: { user: this.info.wid.user },
        },
      };
    }
  }

  //Almacena en cache los contactos que ya valide anteriormente en la instancia
  async isRegisteredUser(contactPhone) {
    try {

      console.log(`validando telefono ${contactPhone}`);
      if(this.validatedUsers[contactPhone]) return this.validatedUsers[contactPhone]      
      const isRegisteredUser = await super.isRegisteredUser(contactPhone);
      this.validatedUsers[contactPhone] = isRegisteredUser;
      return isRegisteredUser;
    } catch (error) {
      console.log(
        `Error at getting isRegisteredUser for ${contactPhone} \n`,
        error
      );
      //Si no pudimos validar el whatsapp, informarlo
      this.validatedUsers[contactPhone] = true;
      return true;
    }
  }

  formatNumber(number) {
    return "549" + number + "@c.us";
  }

  async getContactsById(numbers) {
    return await Promise.all(
      numbers.map(async (rawPhone) => {
        const formattedPhone = this.formatNumber(rawPhone);
        return this.getContactById(formattedPhone);
      })
    );
  }
}
