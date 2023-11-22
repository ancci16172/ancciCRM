import { getUsuario, registrarUsuarioRequest } from "../model/auth.model.js"
import { generateWebToken } from "../lib/jwt.js";
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
        const userFound = await getUsuario({usuario});
        console.log(userFound);
        const isMatch = contrasenia == userFound.contrasenia;
        if (!isMatch) res.status(400).json({ msg: "No autorizado, credenciales invalidas" })
        const token = await generateWebToken({ ID: userFound.ID });
        res.cookie('token', token);
        res.status(200).json({
            usuario: userFound.usuario,
            ID: userFound.ID
        });

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

}

export const logout = (req, res) => {
    res.cookie('token', "", { expires: new Date(0) });
    res.sendStatus(200);
}


export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ msg: "No autorizado" }) 


    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ msg: "No autorizado" })
        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ msg: "No autorizado" })
        return res.json({   
            id: userFound._id,
            username : userFound.username,
            email : userFound.email
        })
    });
}