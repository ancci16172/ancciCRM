import { Router } from "express";
import {
  getAvailableMedia,
  addNewMedia,
  deleteMedia,
} from "../controller/whatsapp.media.js";
import upload from "../../services/multer/memoryMediaStorage.js";

const router = Router();

router.get("/getAvailableMedia", getAvailableMedia);

router.post("/addNewMedia", upload.single("media"), addNewMedia);

router.delete("/deleteMedia/:mediaName", deleteMedia);

export default router;
