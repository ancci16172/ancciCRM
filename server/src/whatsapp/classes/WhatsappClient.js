import whatsapp from "whatsapp-web.js";
import { deleteLineFolder } from "../model/whatsapp.model.js";
import { join } from "path";
import { mediaDirPath } from "../constants/dir.js";
import { addInActiveSessions, deleteFromActiveSessions } from "../lib/activeSessions.js";
import { formatMessages } from "../lib/formatMessages.js";
import config from "config"
const { Client, LocalAuth, MessageAck, MessageMedia ,} = whatsapp;

export class WhatsappClient extends Client {
  
  _clientId;

  constructor({ clientId }) {
    console.log("Generando cliente", clientId);
    
    super({
      
      authStrategy: new LocalAuth({ clientId }),  
      puppeteer: {

        executablePath: process.env.CHROME_EXECUTABLE,
        headless: config.get("PUPPETEER").headless,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
          "--disable-features=site-per-process",
          "--disable-setuid-sandbox",
          "--ignore-certificate-errors",
        ],
      },
      webVersion: "2.2411.2",
    });

    this._clientId = clientId;

    this.on("ready", () => {
      console.log("ready event");

      
      this.pupBrowser.on("disconnected",async () => {
        console.log("------------Puppeteer browser disconnected------------");
        await this.destroy()
      })
      
    });

    this.on("qr", () => {
      console.log("qr event");
    });
    this.on("disconnected", () => {
      console.log("disconnected");
    })
    this.on("auth_failure",() => {
      console.log("auth_failure");
    })
    this.on("loading_screen", (percentage) => {
      console.log("Loading event",percentage);
    })

  } 

  async initialize(){
    await super.initialize() 
    addInActiveSessions(this._clientId,this)
  }

  async destroy(){
    console.log("eliminando de activesessions");
    deleteFromActiveSessions(this._clientId)
    console.log("ejecutando destroy");
    await super.destroy()
  }

  async destroyLine() {
    try {
      await this.destroy();

      deleteLineFolder(this._clientId);
    } catch (error) {
      console.log("catch on destroyLine", error);
    }
  }

  async sendMessagesWithFormat(contact,messages){

    const sendedMessagesData = [];
    const { phoneNumber } = contact;
    const formatedPhoneNumber = phoneNumber + "@c.us";

    
    //Si el whatsapp no es valido Retorna ACK = -4
    const isValidContact = await this.isRegisteredUser(formatedPhoneNumber)
    // const isValidContact = true
    if(!isValidContact) return messages.map(message => ({ 
      messageId : message.ID_MESSAGE,
      to : formatedPhoneNumber,
      from : this.info.wid.user,
      ack: -4,
    }))
    

    //Envia los mensajes
    const formatedMessages = formatMessages(contact,messages);    
    for (const message of formatedMessages) {
      const msgProperties = await this.sendMessage(formatedPhoneNumber, message);  

      sendedMessagesData.push({
        messageSendedId: msgProperties.id._serialized,
        messageId : message.ID_MESSAGE, 
        to : msgProperties._data.to.user,
        from : msgProperties._data.from.user,
        ack: msgProperties.ack,
      })
    }

    //Rastrea si los mensajes se enviaron correctamente
    let allMessagesSent = false
    while(!allMessagesSent){
      console.log("sendedMessagesData",sendedMessagesData);
      await new Promise((res) => setTimeout(res,4000));
      console.log("validando");
      await this.updateAckFromMessages(sendedMessagesData);
      allMessagesSent = !sendedMessagesData.some(msg => msg.ack == 0);
    }
    
    console.log("todo validado",sendedMessagesData);

    return sendedMessagesData

  }

  async updateAckFromMessages(messagesData){
    await Promise.all(
      messagesData.map(async (message) => {
        //Consulta el valor de ACK en los mensajes
        //Si la instancia esta cerrada y no se pudo conocer el nuevo valor de ACK
        //=> ack == -3, "valor desconocido"
        try {
          if (message.ack != 0 || message.isAbleToKnow == false) return; //Si ya esta definido el ACK no consulta nuevamente
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

  async sendMessage(chatId, message) {
    try {
      
      await new Promise(res => setTimeout(res,Math.floor(Math.random() * (4000 - 2000 + 1) + 2000)));

      //Send regular message
      if (!message.ES_MULTIMEDIA)
        return await super.sendMessage(chatId, message.TEXT);

      //Send media
      const filePath = join(mediaDirPath, message.TEXT);
      const media = MessageMedia.fromFilePath(filePath);
      return await super.sendMessage(chatId, media);

    } catch (error) {

      console.log("error at sendMessage",error);

      return {
        ack : -2,id : {_serialized : null} ,_data : {
        to : {user : chatId } ,
        from : {user : this.info.wid.user}
      }}

    }
  }
  

  async isRegisteredUser(contactPhone){

    try {
      console.log(`validando telefono ${contactPhone}`);
      console.time(`get number validation for ${contactPhone}`)
      const isRegisteredUser = await super.isRegisteredUser(contactPhone);
      console.timeEnd(`get number validation for ${contactPhone}`)
      return isRegisteredUser;
    } catch (error) {
      console.log(
        `Error at getting isRegisteredUser for ${contactPhone} \n`,
        error
      );
      //Si no pudimos validar el whatsapp, informarlo
      return true
    }

  }
  
}
