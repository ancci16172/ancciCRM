import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants/auth.contants.js";

export const generateWebToken = payload => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, tk) => {

            if (err) return reject(err);
            return resolve(tk);

        })

    })
    
}