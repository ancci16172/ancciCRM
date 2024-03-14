import { TOKEN_SECRET } from "../constants/auth.contants.js";
import { getUsuario } from "../model/auth.model.js";
import jwt from "jsonwebtoken"

//Verifica que el token enviado por cookie sea valido
export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.sendStatus(400);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);
        const userFound = await getUsuario({ ID: user.ID });
        if (!userFound) return res.sendStatus(401);


        
        res.locals.user = userFound;
        next();
    });
}


