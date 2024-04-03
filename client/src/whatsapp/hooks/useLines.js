import { useEffect, useState } from "react";

import {
  getAvailableLinesRequest,
  deleteLineRequest,
  activatePersistentLineRequest,
  removePersistentLineRequest,
} from "../api/whatsapp.api";

export const useLines = ({ socket }) => {
  const [availableLines, setavailableLines] = useState([]);

  const getAvailableLines = async () => {
    try {
      const lines = await getAvailableLinesRequest();
      console.log("available lines", lines);
      return lines.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLine = async (clientId) => {
    try {
      const response = await deleteLineRequest(clientId);
      console.log("response on delete line", response);
      fetchData();
    } catch (error) {
      console.log("delete line error", error);
    }
  };

  // const activatePersistentLine = async ({ clientId }) => {
  //   try {
  //     const response = await activatePersistentLineRequest({ clientId });
  //     return response.data;
  //   } catch (error) {
  //     console.log("error agregando linea persistente", error);
  //   }
  // };

  const removePersistentLine = async ({ clientId }) => {
    try {
      const response = await removePersistentLineRequest(clientId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  async function fetchData() {
    const lines = await getAvailableLines();
    setavailableLines(lines);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Available lines updated", availableLines);
  }, [availableLines]);
  /*Socket */



  useEffect(() => {


    const onLineUpdated = (socketLine) => {
        console.log("socketLine",socketLine);
        console.log("Lines before update",availableLines);
        // const availableLinesFiltered = availableLines.filter(line => line != socketLine.clientId);
        // setavailableLines([...availableLinesFiltered,socketLine]);
        fetchData()
    }





    socket.on("lineStateChanged", onLineUpdated);
    return () => {
      socket.off("lineStateChanged", onLineUpdated);
    };
  }, []);

  return {
    availableLines,
    deleteLine,
    fetchAvaiableLines: fetchData,
    // activatePersistentLine,
    removePersistentLine,
  };
};
