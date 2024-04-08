import { useEffect, useState } from "react";

import {
  getAvailableLinesRequest,
  deleteLineRequest,
  removePersistentLineRequest,
} from "../api/whatsapp.api";

export const useLines = ({ socket }) => {
  const [availableLines, setavailableLines] = useState([]);

  const getAvailableLines = async () => {
    try {
      const lines = await getAvailableLinesRequest();
      return lines.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLine = async (clientId) => {
    try {
      const response = await deleteLineRequest(clientId);
      fetchData();
    } catch (error) {
      console.log("delete line error", error);
    }
  };

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


  /*Socket */

  useEffect(() => {
    const onLineUpdated = (socketLine) => {
      console.log("socketLine", socketLine);
      console.log("Lines before update", availableLines);
      fetchData();
    };

    socket.on("lineStateChanged", onLineUpdated);
    return () => {
      socket.off("lineStateChanged", onLineUpdated);
    };
  }, []);

  return {
    availableLines,
    deleteLine,
    fetchAvaiableLines: fetchData,
    removePersistentLine,
  };
};
