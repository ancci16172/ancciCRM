import whatsapp from "whatsapp-web.js";
const { Client, LocalAuth } = whatsapp;


export class WhatsappClient extends Client {
  constructor({ clientId }) {
    console.log("Cliente generado", clientId);

    super({
      authStrategy: new LocalAuth({ clientId }),
      puppeteer: {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
          "--disable-features=site-per-process",
          "--disable-setuid-sandbox",
          "--ignore-certificate-errors",
        ],
      },
    });
  }

}
