import whatsapp from "whatsapp-web.js";
import { deleteLineFolder } from "../model/whatsapp.model.js";
const { Client, LocalAuth,MessageAck } = whatsapp;


export class WhatsappClient extends Client {
  _clientId;
  constructor({ clientId }) {
    console.log("Generando cliente", clientId);
    super({
      authStrategy: new LocalAuth({ clientId }),
      puppeteer: {
        // args: [
        //   "--no-sandbox",
        //   "--disable-setuid-sandbox",
        //   "--unhandled-rejections=strict",
        //   "--disable-features=site-per-process",
        //   "--disable-setuid-sandbox",
        //   "--ignore-certificate-errors",
        // ],
      },
    });
    this._clientId = clientId;

    
  }

  async destroyLine() {
    try {
      await this.destroy();
      deleteLineFolder(this._clientId);
    } catch (error) {
      console.log("catch on destroyLine",error);
    }
  }
  
}
