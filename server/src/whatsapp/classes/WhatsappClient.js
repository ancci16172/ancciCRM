import whatsapp from "whatsapp-web.js";
import { deleteLineFolder } from "../model/whatsapp.model.js";
import { join } from "path";
import { mediaDirPath } from "../constants/dir.js";
import { addInActiveSessions, deleteFromActiveSessions } from "../lib/activeSessions.js";
const { Client, LocalAuth, MessageAck, MessageMedia } = whatsapp;

export class WhatsappClient extends Client {
  _clientId;

  constructor({ clientId }) {
    console.log("Generando cliente", clientId);
    super({
      
      authStrategy: new LocalAuth({ clientId }),  
      puppeteer: {

        executablePath: process.env.CHROME_EXECUTABLE,
        headless: true,
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
    });

    this.on("qr", () => {
      console.log("qr event");
    });
  }

  async initialize(){
    addInActiveSessions(this._clientId)
    await super.initialize() 
  }

  async destroy(){
    deleteFromActiveSessions(this._clientId)
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

  async sendMessage(chatId, message) {
    try {
      //Send regular message
      if (!message.ES_MULTIMEDIA)
        return await super.sendMessage(chatId, message.TEXT);

      //Send media
      const filePath = join(mediaDirPath, message.TEXT);
      const media = MessageMedia.fromFilePath(filePath);
      return await super.sendMessage(chatId, media);

    } catch (error) {

      console.log("error at sendMessage",error);
      
      return {ack : -2,id : {_serialized : null}}

    }
  }

  
}
