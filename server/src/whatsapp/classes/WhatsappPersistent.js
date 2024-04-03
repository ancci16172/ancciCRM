import { WhatsappClient } from "./WhatsappClient.js";


export class WhatsappPersistent extends WhatsappClient{




    constructor({clientId}){
        super({clientId})

        
        this.on("loading_screen", (percentage) => {
            console.log("loading sending message");
            this.emit("loading", { msg: `Cargando... ${percentage}%`, percentage });
        });
      
        this.on("authenticated", () => {
            console.log("Autenticado al enviar mensajes");
            this.emit("loading", {
                msg: "Authenticado correctamente,cargando contactos y mensajes...",
                percentage: 100,
            });
        });


        this.on("ready",() => {
            console.log(`Linea ${clientId} persistente activa.`);
            this.emit("good_response", { msg: "Linea persistente activa." })
        })

    }

        


}


