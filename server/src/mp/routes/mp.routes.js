import { Router } from "express";
import { getPagos,getCuentas,insertarCuenta, eliminarCuenta,editarCuenta} from "../controller/mp.controller.js";

const router = Router();


router.post("/getPagos",getPagos);
router.get("/getCuentas",getCuentas);
router.post("/insertarCuenta",insertarCuenta);
router.delete("/eliminarCuenta/:ID_MP",eliminarCuenta);
router.put("/editarCuenta",editarCuenta)

export default router
