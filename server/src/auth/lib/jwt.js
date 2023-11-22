import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants/auth.contants.js";

export const generateWebToken = payload => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1h" }, (err, token) => {

            if (err) return reject(err);
            return resolve(token);

        })

    })

}