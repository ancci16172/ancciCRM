import { Router } from "express";
import { iniciarSesion, registrarUsuario } from "../controller/auth.controller.js";
const router = Router();

router.post("/registrar",registrarUsuario);

router.post("/iniciarSesion",iniciarSesion)


export default router