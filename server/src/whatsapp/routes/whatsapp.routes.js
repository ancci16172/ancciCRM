import { Router } from "express";
import {
  getAvailableLines,
  getMessages,
  sendMessages,
  updateMessagesGroup,
  getAvailableMessageGroups,
  insertNewMessageGroup,
  deleteMessageGroup,
  deleteLine,
} from "../controller/whatsapp.controller.js";
import { insertLine } from "../socket/whatsapp.socket.js";
import io from "../../services/socket/socket.js";




const router = Router();



/*Lines*/
router.get("/getAvailableLines", getAvailableLines);
router.delete("/deleteLine/:clientId",deleteLine);

/*Messages Group */
router.get("/getMessages/:groupId", getMessages);
router.post("/updateMessagesGroup", updateMessagesGroup);
router.get("/getAvailableMessageGroups", getAvailableMessageGroups);
router.post("/insertNewMessageGroup", insertNewMessageGroup);
router.delete("/deleteMessageGroup/:ID_MESSAGE_GROUP", deleteMessageGroup);

/*WhatsappClient */
router.post("/sendMessages", sendMessages);

io.on("connection", (socket) => {
  socket.on("insertLine", insertLine(socket));
});

export default router;
