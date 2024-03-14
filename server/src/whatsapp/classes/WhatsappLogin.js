import { deleteLineFolder } from "../model/whatsapp.model.js";
import { WhatsappClient } from "./WhatsappClient.js";

export class WhatsappLogin extends WhatsappClient {
  _clientId;

  constructor({ clientId }) {
    super({ clientId });
    this._clientId = clientId;

    this.on("auth_failure", async () => {
      try {
          console.log("auth_failure");
          await this.logoutClient();
          this.emit("bad_response", { msg: "No se pudo autenticar el usuario." });
        } catch (error) {
          console.log("catch on auth failure",Error);        
        }
    });
    this.on("disconnected", async () => {
      try {
        console.log("disconnected");
        await this.logoutClient();
        this.emit("bad_response", { msg: "Usuario desconectado" });
      } catch (error) {
        console.log("catch on disconnected",error);
      }
    });

    this.on("ready", async () => {
      this.emit("good_response", { msg: "Linea almacenada correctamente." });
      await this.destroy()
    });
    
    this.on("change_state", (connectionState) => {
      console.log("connectionState", connectionState);
    });



  }

  async logoutClient() {
    try {
      await this.destroy();
      deleteLineFolder(this._clientId);
    } catch (error) {
      console.log("catch on logoutClient",error);
    }
  }
}
