import { Router } from "express";
import { getPagos } from "../controller/mp.controller.js";
const router = Router();


router.post("/getPagos",getPagos);





export default router
