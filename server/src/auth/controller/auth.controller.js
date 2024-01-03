import { getUsuario, registrarUsuarioRequest } from "../model/auth.model.js"
import { generateWebToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants/auth.contants.js";
export const registrarUsuario = async (req, res) => {

    try {
        const usuarioGenerado = await registrarUsuarioRequest(req.body);
        console.log(usuarioGenerado);
        res.status(200).json(usuarioGenerado);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }

}

export const iniciarSesion = async (req, res) => {
    const { usuario, contrasenia } = req.body;

    try {
        const userFound = await getUsuario({ usuario });
        console.log(userFound);

        if (!userFound) return res.status(404).json({ error: true, msg: "No existe usuario con esas credenciales" })

        const isMatch = contrasenia == userFound.contrasenia;
        if (!isMatch) return res.status(404).json({ msg: "No autorizado, credenciales invalidas" });

        const tk = await generateWebToken({ ID: userFound.ID });
        res.cookie('token', tk, {
            secure: true,
            sameSite: "none"
        });
        res.status(200).json({
            username: userFound.usuario,
            ID: userFound.ID
        });

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

}


export const verifyToken = async (req, res) => {
    const { user } = res.locals;
    return res.status(200).json({
        id: user.ID,
        username: user.usuario
    });
}
