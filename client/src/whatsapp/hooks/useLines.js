import { useEffect, useState } from "react";
import socket from "../../services/socket/socket.js"

import { getAvailableLinesRequest,deleteLineRequest } from "../api/whatsapp.api";

export const useLines = () => {
    const [availableLines, setavailableLines] = useState([]);

    const [selectedLine,setSelectedLine] = useState("");



    const getAvailableLines = async () => {
        try {
            const lines = await getAvailableLinesRequest();
            console.log("available lines",lines);
            return lines.data
        } catch (error) {
            console.log(error);
        }
    }


    const deleteLine = async (clientId) => {
        try {
            const response = await deleteLineRequest(clientId);
            console.log("response on delete line",response);
            fetchData()
        } catch (error) {
            console.log("delete line error",error);
        }
    }



    async function fetchData() {
        const lines = await getAvailableLines()
        setavailableLines(lines)
    }

    useEffect(() => {
        fetchData()
    }, []);









    return {  availableLines,selectedLine,setSelectedLine,deleteLine,fetchAvaiableLines : fetchData }
}



