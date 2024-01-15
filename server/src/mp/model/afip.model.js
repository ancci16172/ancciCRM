import axios from "axios"

const getContribuyenteURL = `https://afip.tangofactura.com/Rest/GetContribuyente?cuit=`;
export const getContribuyente = async ({ CUIT }) => {
    try {
        
        const contribuyente = await axios.get(`${getContribuyenteURL}${CUIT}`);
        // console.log(contribuyente);
        return contribuyente.data.Contribuyente;
        
    } catch (error) {
        console.log("error a consultar en tangoFactura",error);     
        throw new Error(error)   
    }


}