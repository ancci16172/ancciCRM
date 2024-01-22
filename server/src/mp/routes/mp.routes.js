import { Router } from "express";
import { getPagos,getCuentas,insertarCuenta, eliminarCuenta,editarCuenta} from "../controller/mp.controller.js";
import { validateSchema } from "../../shared/middlewares/validateSchema.js";
import { mpAccount } from "../schemas/mpAccount.js";
import { validateAccount } from "../middlewares/validateAccount.js";

const router = Router();


router.post("/getPagos",getPagos);
router.get("/getCuentas",getCuentas);
router.post("/insertarCuenta",validateSchema(mpAccount), validateAccount,insertarCuenta);
router.delete("/eliminarCuenta/:ID_MP",eliminarCuenta);
router.put("/editarCuenta",validateSchema(mpAccount), validateAccount,editarCuenta)

export default router
