import { Router } from "express";
import { iniciarSesion, registrarUsuario ,verifyToken} from "../controller/auth.controller.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";
const router = Router();

router.post("/registrar",registrarUsuario);

router.post("/iniciarSesion",iniciarSesion)
router.get("/verify", isLoggedIn,verifyToken);


export default router