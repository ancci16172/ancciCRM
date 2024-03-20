import { deleteLineFolder } from "../model/whatsapp.model.js";
import { WhatsappClient } from "./WhatsappClient.js";

export class WhatsappLogin extends WhatsappClient {
  loggedIn = false;

  constructor({ clientId }) {
    super({ clientId });
    this.on("auth_failure",() => {
      console.log("auth failure on login");
    })
    this.on("authenticated",() =>{
      console.log("authenticated on login");
    })
    this.on("disconnected",() => {
      console.log("Disconected on login");
    })
    this.on("auth_failure", async () => {
      try {
          console.log("auth_failure");
          await this.destroyLine();
          this.emit("bad_response", { msg: "No se pudo autenticar el usuario." });
        } catch (error) {
          console.log("catch on auth failure",error);
        }
    });
    this.on("disconnected", async () => {
      try {
        console.log("disconnected");
        await this.destroyLine();
        this.emit("bad_response", { msg: "Usuario desconectado" });
      } catch (error) {
        console.log("catch on disconnected",error);
      }
    });

    this.on("ready", async () => {
      this.emit("good_response", { msg: "Linea almacenada correctamente." });
      this.loggedIn = true;
      await this.destroy()
    });
    
    this.on("change_state", (connectionState) => {
      console.log("connectionStateChanged", connectionState);
    });



  }


}
