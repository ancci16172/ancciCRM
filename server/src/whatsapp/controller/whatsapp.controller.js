import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
import whatsapp from "whatsapp-web.js";
const { Client, LocalAuth } = whatsapp
import qrTerminal from "qrcode-terminal"
export const getLineasDisponibles = (req, res) => {

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    try {

        const sessionsFolderPath = path.join(__dirname, "..", "..", "..", ".wwebjs_auth")
        const avaiableSessions = fs.readdirSync(sessionsFolderPath)
        res.status(200).json(avaiableSessions)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al consultar las sesiones disponibles" })
    }
}


const logoutClient = async (client, data, res) => {
    console.log("Por desloguear sesion", data);
    await client.destroy()
    res.status(500).json({ msg: "La sesion no se encuentra logeada, se elimino el nombre de la lista." })
}

export const sendMassiveMessages = (req, res) => {
    const { clientId } = req.body
    console.log("Ingresa a mensajes masivos con", req.body);
    const client = new Client({ authStrategy: new LocalAuth({ clientId }) })
    console.log("Cliente generado");
    client.on('qr', async () => await logoutClient(client, null, res))
    client.on("auth_failure", async (data) => await logoutClient(client, data, res))
    client.on("disconnected", async (data) => await logoutClient(client, data, res))
    client.on("ready", async () => {
        console.log("simula envia muchos mensajes");
        await client.destroy()
        res.status(200).json({ msg: "Mensajes enviadores correctamente" })
    })
    client.initialize()
}


export const logInSession = (req, res) => {
    const { clientId } = req.body
    console.log("Ingresa a mensajes masivos con", req.body);
    const client = new Client({ authStrategy: new LocalAuth({ clientId }) })
    console.log("Cliente generado");
    
    client.on('qr', async (qr) => { qrTerminal.generate(qr, { small: true }) })

    client.on("auth_failure", async (data) => await logoutClient(client, data, res))
    client.on("disconnected", async (data) => await logoutClient(client, data, res))

    client.on("ready", async () => {
        console.log("Logra autenticarse correctamente");
        res.status(200).json({ msg: "Mensajes enviadores correctamente" })
        await client.destroy()
    })
    client.initialize()
}


