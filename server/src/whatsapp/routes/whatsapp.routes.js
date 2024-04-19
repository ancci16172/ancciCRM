import { Router } from "express";
import {
  getAvailableLines,
  getMessages,

  updateMessagesGroup,
  getAvailableMessageGroups,
  insertNewMessageGroup,
  deleteMessageGroup,
  deleteLine,
} from "../controller/whatsapp.controller.js";
import { insertLine } from "../socket/whatsapp.loginNewLine.js";
import { sendMessages } from "../socket/whatsapp.sendMessages.js";
import io from "../../services/socket/socket.js";
import mediaRouter from "./media.routes.js"
import {  activatePersistentLineBySocket, removePersistentLine, sendMessageFromPersistentLine } from "../socket/socket.persistent.js";



const router = Router();



/*Lines*/
router.get("/getAvailableLines", getAvailableLines);
router.delete("/deleteLine/:clientId",deleteLine);
router.post("/persistentLine/send",sendMessageFromPersistentLine);
router.delete("/persistentLine/:clientId",removePersistentLine);


/*Messages Group */
router.get("/getMessages/:groupId", getMessages);


router.post("/updateMessagesGroup", updateMessagesGroup);


router.get("/getAvailableMessageGroups", getAvailableMessageGroups);
router.post("/insertNewMessageGroup", insertNewMessageGroup);
router.delete("/deleteMessageGroup/:ID_MESSAGE_GROUP", deleteMessageGroup);






/*Multimedia */
router.use(mediaRouter)



/*WhatsappClient */
io.on("connection", (socket) => {
  
  
  socket.on("insertLine", insertLine(socket));
  socket.on("sendMessages/start",sendMessages(socket));
  socket.on("activatePersistentLine",activatePersistentLineBySocket(socket))  


  socket.on("disconnect",() => {
    console.log("socket desconectado ",socket.id);
  })

});



export default router;
