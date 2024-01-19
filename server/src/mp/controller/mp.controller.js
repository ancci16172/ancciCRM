
import { editarCuentaDB, getCuentasDisponibles, insertarCuentaDB, searchPagosEnCuenta } from "../model/mp.model.js";
import { formatPayments } from "../lib/formatPayments.js";
import { searchPayments } from "../lib/searchPayments.js";

export const getPagos = async (req, res) => {

    try {
        const { CUENTA, START_DATE, END_DATE } = req.body;
        const mostrarTitulares = req.body.mostrarTitulares && JSON.parse(req.body.mostrarTitulares);
        //Transformar en middleware parseIntMiddleware
        const accounts = CUENTA == -1 ? await getCuentasDisponibles() : await getCuentasDisponibles([`ID_MP = ${CUENTA}`]);
        console.log("cuentas",accounts.length);
        if (!accounts.length)
            return res.status(404).json({ msg: "La cuenta buscada no existe." })

        const resultados = await searchPayments({START_DATE,END_DATE,accounts,mostrarTitulares })




        console.log("pagos encontrado ", resultados.length);
        res.status(200).json(resultados)

    } catch (error) {
        console.log("error:", error)
        res.status(500).json({ msg: "Error al consultar los pagos de la cuenta" })
    }


}


export const getCuentas = async (req, res) => {

    try {
        const cuentas = await getCuentasDisponibles();
        res.status(200).json(cuentas);

    } catch (error) {
        console.log("getCuentasError", error);
        res.status(404).json({ msg: "No se pudieron consultar las cuentas disponibles" });
    }
}

export const insertarCuenta = async (req, res) => {

    try {

        const resultado = await insertarCuentaDB(req.body);
        res.status(200).json({ msg: `Cuenta ${req.body.ALIAS} insertada correctamente` })
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "No se pudo insertar la nueva cuenta" });
    }

}

export const eliminarCuenta = async (req, res) => {
    const { ID_MP } = req.params
    try {

        const resultado = await editarCuentaDB({ ACTIVO: 0 }, { ID_MP });
        res.status(200).json({ msg: "Cuenta eliminada correctamente" })

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "No se pudo eliminar la cuenta" });
    }
}

export const editarCuenta = async (req, res) => {
    const { ALIAS, TOKEN, ID_MP } = req.body;

    try {
        const resultado = await editarCuentaDB({ ALIAS, TOKEN }, { ID_MP });
        res.status(200).json({ msg: "Cuenta editada correctamente" })

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "No se pudo editar la cuenta" });
    }
}