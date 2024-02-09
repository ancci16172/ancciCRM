
import { Router } from "express";
import whatsapp from "whatsapp-web.js"
const {Client,LocalAuth} = whatsapp
import qrCode from "qrcode-terminal"
import { getLineasDisponibles, sendMassiveMessages,logInSession } from "../controller/whatsapp.controller.js";
const router = Router();

router.get("/getLineasDisponibles",getLineasDisponibles)
router.post("/sendMassiveMessages",sendMassiveMessages)
router.post("/logInSession",logInSession)
// router.post("/generarLinea", (req, res) => {
//     console.log("ingresa al enrutador con",req.body);
//     const { clientId } = req.body
//     const newClient = new Client({ authStrategy: new LocalAuth({ clientId }) })

//     newClient.on("qr", (qr) => {
//         console.log("LoggedIn");
//         qrCode.generate(qr, { small: true });

//     })
//     newClient.on("authenticated",(session) => {
//         console.log("autenticado");
//         console.log(session);
//         res.status(200).send("Ingreso correctamente")
//     })
//     newClient.on("auth_failure", (reason) => {
//         console.log("connection failed for", clientId)
//         newClient.logout()
//     })
//     newClient.initialize()
//     // res.send("ok")
// })



export default router


