import z from "zod"


export const mpAccount = z.object({
    ALIAS: z.string({ required_error: "Se debe enviar un alias valido." }),
    TOKEN: z.string({ required_error: "Se debe enviar el token de seguridad." }).regex(new RegExp("APP_USR-.*"),{message : "La clave de mercado pago no cumple con el formato correcto."})
})

