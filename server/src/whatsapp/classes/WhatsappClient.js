import whatsapp from "whatsapp-web.js";
import { deleteLineFolder } from "../model/whatsapp.model.js";
import { join } from "path";
import { mediaDirPath } from "../constants/dir.js";
const { Client, LocalAuth, MessageAck, MessageMedia } = whatsapp;

export class WhatsappClient extends Client {
  _clientId;
  constructor({ clientId }) {
    
    console.log("Generando cliente", clientId);
    super({
      authStrategy: new LocalAuth({ clientId }),
      puppeteer: {
        executablePath : process.env.CHROME_EXECUTABLE,
        headless: false,
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
    this.on("ready", async () => {
      console.log("consultando version ready");
      const version = await this.getWWebVersion();
      console.log("version", version);
    });
    this.on("qr", async () => {
      console.log("consultando version qr");
      const version = await this.getWWebVersion();
      console.log("version", version);
    });
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
    //Send regular message
    if (!message.ES_MULTIMEDIA)
      return await super.sendMessage(chatId, message.TEXT);

    //Send media
    const filePath = join(mediaDirPath, message.TEXT);
    const media = MessageMedia.fromFilePath(filePath);
    return await super.sendMessage(chatId, media);
  }
}
