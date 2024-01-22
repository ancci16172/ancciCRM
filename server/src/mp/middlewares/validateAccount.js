import { searchPagosEnCuenta } from "../model/mp.model.js";


export const validateAccount = async (req, res, next) => {
    const { TOKEN } = req.body;


    try {
        await searchPagosEnCuenta({ END_DATE: new Date(), START_DATE: new Date(), TOKEN });
        next();
    } catch (error) {
        if (error.status == 401)
            return res.status(401).json({ msg: "El token informado no es un token valido." });

        res.status(500).json({msg : "No se pudo comprobar la validez del token, intente mas tarde."})
    }



}


